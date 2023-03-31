import { PublicKey, ComputeBudgetProgram } from '@solana/web3.js';
import * as anchor from '@project-serum/anchor';
import { AnchorProvider } from '@project-serum/anchor';
import { OpenAmm, IDL as OpenAmmIDL } from './open_amm';
import { Farm, IDL as FarmIDL } from './farm';
import { Keypair, Transaction, SystemProgram } from '@solana/web3.js';

import {
  TokenInstructions,
  DexInstructions,
  Market,
  // Order,
} from '@project-serum/serum';

import {
  getAccount as getTokenAccount,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountInstruction,
} from '@solana/spl-token';

// TODO: Pull this from serum library. Market.d.ts file says export interface Order
interface Order {
  orderId: anchor.BN;
  openOrdersAddress: PublicKey;
  openOrdersSlot: number;
  price: number;
  priceLots: anchor.BN;
  size: number;
  feeTier: number;
  sizeLots: anchor.BN;
  side: 'buy' | 'sell';
  clientId?: anchor.BN;
}

// const AMM_PROGRAM_ID = new PublicKey('asdf');
// const FARM_PROGRAM_ID = new PublicKey('asdf');

const QUOTE_VAULT_SEED = 'pool-quote-vault';
const BASE_VAULT_SEED = 'pool-base-vault';
const OPEN_ORDERS_SEED = 'pool-open-orders';
const POOL_SEED = 'pool';
const PROTOCOL_SEED = 'protocol';
const STAKE_SEED = 'stake';

export const DEX_PID = new PublicKey(
  'srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX',
);

export const DEX_DEVNET_PID = new PublicKey(
  'EoTcMgcDRTJVZDMZWBoU6rhYHZfkNTVEAfz3uUJRcYGj',
);

async function getVaultOwnerAndNonce(
  market: PublicKey,
  dexProgramId = DEX_PID,
): Promise<[PublicKey, anchor.BN]> {
  const nonce = new anchor.BN(0);
  while (nonce.toNumber() < 255) {
    try {
      const vaultOwner = await PublicKey.createProgramAddress(
        [market.toBuffer(), nonce.toArrayLike(Buffer, 'le', 8)],
        dexProgramId,
      );
      return [vaultOwner, nonce];
    } catch (e) {
      nonce.iaddn(1);
    }
  }
  throw new Error('Unable to find nonce');
}

async function getMarket(provider: AnchorProvider, market: PublicKey) {
  const connection = provider.connection;
  return await Market.load(
    connection,
    market,
    { commitment: 'recent' },
    DEX_PID,
  );
}

async function createMarket(
  provider: AnchorProvider,
  baseMint: PublicKey,
  quoteMint: PublicKey,
  baseLotSize: anchor.BN,
  quoteLotSize: anchor.BN,
) {
  const connection = provider.connection;
  const payer = provider.wallet.publicKey;

  const market = new Keypair();
  const requestQueue = new Keypair();
  const eventQueue = new Keypair();
  const bids = new Keypair();
  const asks = new Keypair();
  const baseVault = new Keypair();
  const quoteVault = new Keypair();
  const quoteDustThreshold = new anchor.BN(100);
  const feeRateBps = 0;

  const [vaultOwner, vaultSignerNonce] = await getVaultOwnerAndNonce(
    market.publicKey,
    DEX_PID,
  );

  const tx1 = new Transaction();
  tx1.add(
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: baseVault.publicKey,
      lamports: await connection.getMinimumBalanceForRentExemption(165),
      space: 165,
      programId: TOKEN_PROGRAM_ID,
    }),
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: quoteVault.publicKey,
      lamports: await connection.getMinimumBalanceForRentExemption(165),
      space: 165,
      programId: TOKEN_PROGRAM_ID,
    }),
    TokenInstructions.initializeAccount({
      account: baseVault.publicKey,
      mint: baseMint,
      owner: vaultOwner,
    }),
    TokenInstructions.initializeAccount({
      account: quoteVault.publicKey,
      mint: quoteMint,
      owner: vaultOwner,
    }),
  );

  const tx2 = new Transaction();
  tx2.add(
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: market.publicKey,
      lamports: await connection.getMinimumBalanceForRentExemption(
        Market.getLayout(DEX_PID).span,
      ),
      space: Market.getLayout(DEX_PID).span,
      programId: DEX_PID,
    }),
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: requestQueue.publicKey,
      lamports: await connection.getMinimumBalanceForRentExemption(5120 + 12),
      space: 5120 + 12,
      programId: DEX_PID,
    }),
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: eventQueue.publicKey,
      lamports: await connection.getMinimumBalanceForRentExemption(262144 + 12),
      space: 262144 + 12,
      programId: DEX_PID,
    }),
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: bids.publicKey,
      lamports: await connection.getMinimumBalanceForRentExemption(65536 + 12),
      space: 65536 + 12,
      programId: DEX_PID,
    }),
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: asks.publicKey,
      lamports: await connection.getMinimumBalanceForRentExemption(65536 + 12),
      space: 65536 + 12,
      programId: DEX_PID,
    }),
    DexInstructions.initializeMarket({
      market: market.publicKey,
      requestQueue: requestQueue.publicKey,
      eventQueue: eventQueue.publicKey,
      bids: bids.publicKey,
      asks: asks.publicKey,
      baseVault: baseVault.publicKey,
      quoteVault: quoteVault.publicKey,
      baseMint,
      quoteMint,
      baseLotSize,
      quoteLotSize,
      feeRateBps,
      vaultSignerNonce,
      quoteDustThreshold,
      programId: DEX_PID,
    }),
  );

  await provider.sendAndConfirm(tx1, [baseVault, quoteVault]);
  await provider.sendAndConfirm(tx2, [
    market,
    requestQueue,
    eventQueue,
    bids,
    asks,
  ]);
}

async function getAllBids(market: Market, provider: anchor.Provider) {
  const loadedBids: Order[] = [];
  const bids = (await market.loadBids(provider.connection)).items();
  while (true) {
    const bid = bids.next();
    if (bid.done) {
      break;
    }
    loadedBids.push(bid.value);
  }
  return loadedBids;
}

async function getAllAsks(market: Market, provider: anchor.Provider) {
  const loadedAsks: Order[] = [];
  const asks = (await market.loadAsks(provider.connection)).items();
  while (true) {
    const ask = asks.next();
    if (ask.done) {
      break;
    }
    loadedAsks.push(ask.value);
  }
  return loadedAsks;
}

async function getAllOrders(market: Market, provider: anchor.Provider) {
  return Promise.all([
    getAllBids(market, provider),
    getAllAsks(market, provider),
  ]);
}

async function getOrdersOwnedByPool(
  provider: anchor.AnchorProvider,
  pool: PublicKey,
  AMM_PROGRAM_ID: PublicKey,
) {
  const program = new anchor.Program<OpenAmm>(
    OpenAmmIDL,
    AMM_PROGRAM_ID,
    provider,
  );

  const poolAccount = await program.account.openAmmPool.fetch(pool);
  const marketKey = poolAccount.market;
  const market = await getMarket(provider, marketKey);
  const openOrders = poolAccount.openOrders;

  const [bids, asks] = await getAllOrders(market, provider);
  const bidsOwnedByPool = bids.filter(bid =>
    bid.openOrdersAddress.equals(openOrders),
  );
  const asksOwnedByPool = asks.filter(ask =>
    ask.openOrdersAddress.equals(openOrders),
  );
  return [asksOwnedByPool, bidsOwnedByPool];
}

async function createPool(
  provider: anchor.AnchorProvider,
  marketKey: PublicKey,
  initialQuoteAmount: anchor.BN,
  initialBaseAmount: anchor.BN,
  poolType: 'xyk' | 'stable',
  AMM_PROGRAM_ID: PublicKey,
) {
  const program = new anchor.Program<OpenAmm>(
    OpenAmmIDL,
    AMM_PROGRAM_ID,
    provider,
  );

  const market = await getMarket(provider, marketKey);
  const pool = PublicKey.findProgramAddressSync(
    [market.publicKey.toBuffer(), new Uint8Array([0]), Buffer.from(POOL_SEED)],
    AMM_PROGRAM_ID,
  )[0];

  const openOrders = PublicKey.findProgramAddressSync(
    [pool.toBuffer(), Buffer.from(OPEN_ORDERS_SEED)],
    AMM_PROGRAM_ID,
  )[0];

  const lpMint = PublicKey.findProgramAddressSync(
    [pool.toBuffer(), Buffer.from('pool-lp-mint')],
    AMM_PROGRAM_ID,
  )[0];

  const signerLp = getAssociatedTokenAddressSync(
    lpMint,
    provider.wallet.publicKey,
  );

  const baseMint = market.baseMintAddress;
  const quoteMint = market.quoteMintAddress;
  const signerBase = getAssociatedTokenAddressSync(
    baseMint,
    provider.wallet.publicKey,
  );
  const signerQuote = getAssociatedTokenAddressSync(
    quoteMint,
    provider.wallet.publicKey,
  );

  const additionalComputeBudgetInstruction =
    ComputeBudgetProgram.setComputeUnitLimit({ units: 800000 });

  const marketVaultSigner = (await getVaultOwnerAndNonce(market.publicKey))[0];
  const idlPoolType = poolType === 'xyk' ? { xyk: {} } : { stable: {} };

  const createPoolMethod = program.methods
    .createPool(idlPoolType, initialBaseAmount, initialQuoteAmount)
    .accounts({
      baseMint,
      quoteMint,
      pool,
      signerBase,
      signerQuote,
      lpMint,
      signerLp,
      openOrders,
      dexProgram: DEX_PID,
      tokenProgram: TOKEN_PROGRAM_ID,
      marketAccounts: {
        market: market.publicKey,
        requestQueue: market.decoded.requestQueue,
        eventQueue: market.decoded.eventQueue,
        bids: market.decoded.bids,
        asks: market.decoded.asks,
        baseVault: market.decoded.baseVault,
        quoteVault: market.decoded.quoteVault,
        vaultSigner: marketVaultSigner,
        openOrders,
      },
    })
    .preInstructions([additionalComputeBudgetInstruction]);

  return pool;
}

async function stakeAmm(
  provider: anchor.AnchorProvider,
  pool: PublicKey,
  desiredBaseAmount: anchor.BN,
  desiredQuoteAmount: anchor.BN,
  minBaseAmount: anchor.BN,
  minQuoteAmount: anchor.BN,
  AMM_PROGRAM_ID: PublicKey,
) {
  const connection = provider.connection;
  const program = new anchor.Program<OpenAmm>(
    OpenAmmIDL,
    AMM_PROGRAM_ID,
    provider,
  );

  const poolAccount = await program.account.openAmmPool.fetch(pool);
  // const baseMint = poolAccount.base
  const baseMint = poolAccount.baseMint;
  const quoteMint = poolAccount.quoteMint;
  const signerBase = getAssociatedTokenAddressSync(
    baseMint,
    provider.wallet.publicKey,
  );
  const signerQuote = getAssociatedTokenAddressSync(
    quoteMint,
    provider.wallet.publicKey,
  );
  const lpMint = poolAccount.lpMint;
  const signerLp = getAssociatedTokenAddressSync(
    lpMint,
    provider.wallet.publicKey,
  );

  const market = await getMarket(provider, poolAccount.market);
  const additionalComputeBudgetInstruction =
    ComputeBudgetProgram.setComputeUnitLimit({ units: 800000 });

  const preInstructions: anchor.web3.TransactionInstruction[] = [
    additionalComputeBudgetInstruction,
  ];

  const signerLpAccount = await connection.getAccountInfo(signerLp);
  // TODO: Valid way to see?
  if (signerLpAccount == null) {
    const createSignerLpInstruction = createAssociatedTokenAccountInstruction(
      provider.wallet.publicKey,
      signerLp,
      provider.wallet.publicKey,
      lpMint,
    );
    preInstructions.push(createSignerLpInstruction);
  }

  const openOrders = PublicKey.findProgramAddressSync(
    [pool.toBuffer(), Buffer.from(OPEN_ORDERS_SEED)],
    AMM_PROGRAM_ID,
  )[0];

  const marketVaultSigner = (await getVaultOwnerAndNonce(market.publicKey))[0];
  return program.methods
    .deposit(
      desiredBaseAmount,
      desiredQuoteAmount,
      minBaseAmount,
      minQuoteAmount,
    )
    .accounts({
      pool,
      lpMint,
      signerLp,
      signerBase,
      signerQuote,
      dexProgram: DEX_PID,
      marketAccounts: {
        market: market.publicKey,
        requestQueue: market.decoded.requestQueue,
        eventQueue: market.decoded.eventQueue,
        bids: market.decoded.bids,
        asks: market.decoded.asks,
        baseVault: market.decoded.baseVault,
        quoteVault: market.decoded.quoteVault,
        vaultSigner: marketVaultSigner,
        openOrders,
      },
    })
    .preInstructions(preInstructions)
    .rpc();
}

async function unstakeAmm(
  provider: AnchorProvider,
  pool: PublicKey,
  amount: anchor.BN,
  AMM_PROGRAM_ID: PublicKey,
) {
  const connection = provider.connection;
  const program = new anchor.Program<OpenAmm>(
    OpenAmmIDL,
    AMM_PROGRAM_ID,
    provider,
  );

  const poolAccount = await program.account.openAmmPool.fetch(pool);
  // const baseMint = poolAccount.base
  const baseMint = poolAccount.baseMint;
  const quoteMint = poolAccount.quoteMint;
  const signerBase = getAssociatedTokenAddressSync(
    baseMint,
    provider.wallet.publicKey,
  );
  const signerQuote = getAssociatedTokenAddressSync(
    quoteMint,
    provider.wallet.publicKey,
  );
  const lpMint = poolAccount.lpMint;
  const signerLp = getAssociatedTokenAddressSync(
    lpMint,
    provider.wallet.publicKey,
  );

  const market = await getMarket(provider, poolAccount.market);
  const additionalComputeBudgetInstruction =
    ComputeBudgetProgram.setComputeUnitLimit({ units: 800000 });

  const preInstructions: anchor.web3.TransactionInstruction[] = [
    additionalComputeBudgetInstruction,
  ];

  const signerLpAccount = await connection.getAccountInfo(signerLp);
  // TODO: Valid way to see?
  if (signerLpAccount == null) {
    const createSignerLpInstruction = createAssociatedTokenAccountInstruction(
      provider.wallet.publicKey,
      signerLp,
      provider.wallet.publicKey,
      lpMint,
    );
    preInstructions.push(createSignerLpInstruction);
  }
  if (signerBase == null) {
    const createSignerBaseInstruction = createAssociatedTokenAccountInstruction(
      provider.wallet.publicKey,
      signerBase,
      provider.wallet.publicKey,
      baseMint,
    );
    preInstructions.push(createSignerBaseInstruction);
  }
  if (signerQuote == null) {
    const createSignerQuoteInstruction =
      createAssociatedTokenAccountInstruction(
        provider.wallet.publicKey,
        signerQuote,
        provider.wallet.publicKey,
        quoteMint,
      );
    preInstructions.push(createSignerQuoteInstruction);
  }

  const openOrders = PublicKey.findProgramAddressSync(
    [pool.toBuffer(), Buffer.from(OPEN_ORDERS_SEED)],
    AMM_PROGRAM_ID,
  )[0];

  const marketVaultSigner = (await getVaultOwnerAndNonce(market.publicKey))[0];
  return program.methods
    .withdraw(amount)
    .accounts({
      pool,
      lpMint,
      signerLp,
      signerBase,
      signerQuote,
      dexProgram: DEX_PID,
      marketAccounts: {
        market: market.publicKey,
        requestQueue: market.decoded.requestQueue,
        eventQueue: market.decoded.eventQueue,
        bids: market.decoded.bids,
        asks: market.decoded.asks,
        baseVault: market.decoded.baseVault,
        quoteVault: market.decoded.quoteVault,
        vaultSigner: marketVaultSigner,
        openOrders,
      },
    })
    .preInstructions(preInstructions)
    .rpc();
}

async function stakeFarm(
  provider: AnchorProvider,
  farm: PublicKey,
  amount: anchor.BN,
  FARM_PROGRAM_ID: PublicKey,
) {
  const program = new anchor.Program<Farm>(FarmIDL, FARM_PROGRAM_ID, provider);
  const wallet = provider.wallet.publicKey;
  const [stake] = PublicKey.findProgramAddressSync(
    [Buffer.from(STAKE_SEED), farm.toBuffer(), wallet.toBuffer()],
    FARM_PROGRAM_ID,
  );
  const stakeExists = await program.account.stake.fetchNullable(stake);
  const preInstructions: anchor.web3.TransactionInstruction[] = [];
  if (stakeExists == null) {
    const createStakeInstruction = await program.methods
      .createStake()
      .accounts({
        farm,
      })
      .instruction();
    preInstructions.push(createStakeInstruction);
  }

  const farmAccount = await program.account.farm.fetch(farm);
  const stakeMint = farmAccount.stakeMint;
  const signerToken = getAssociatedTokenAddressSync(stakeMint, wallet);
  return program.methods
    .stakeTokens(amount)
    .accounts({
      stake,
      farm,
      signerToken,
      stakeVault: farmAccount.stakeVault,
      clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    })
    .preInstructions(preInstructions)
    .rpc();
}

async function unstakeFarm(
  provider: AnchorProvider,
  farm: PublicKey,
  amount: anchor.BN,
  FARM_PROGRAM_ID: PublicKey,
) {
  const program = new anchor.Program<Farm>(FarmIDL, FARM_PROGRAM_ID, provider);
  const wallet = provider.wallet.publicKey;
  const [stake] = PublicKey.findProgramAddressSync(
    [Buffer.from(STAKE_SEED), farm.toBuffer(), wallet.toBuffer()],
    FARM_PROGRAM_ID,
  );

  const farmAccount = await program.account.farm.fetch(farm);
  const stakeMint = farmAccount.stakeMint;
  const signerToken = getAssociatedTokenAddressSync(stakeMint, wallet);
  const signerTokenExists = await provider.connection.getAccountInfo(
    signerToken,
  );
  const preInstructions: anchor.web3.TransactionInstruction[] = [];
  if (signerTokenExists == null) {
    const createSignerTokenInstruction =
      createAssociatedTokenAccountInstruction(
        provider.wallet.publicKey,
        signerToken,
        provider.wallet.publicKey,
        stakeMint,
      );
    preInstructions.push(createSignerTokenInstruction);
  }

  return program.methods
    .unstakeTokens(amount)
    .accounts({
      stake,
      farm,
      signerToken,
      stakeVault: farmAccount.stakeVault,
      clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    })
    .preInstructions(preInstructions)
    .rpc();
}

// This assumes protocol has already been created
async function createFarm(
  provider: AnchorProvider,
  stakeMint: PublicKey,
  FARM_PROGRAM_ID: PublicKey,
) {
  const program = new anchor.Program<Farm>(FarmIDL, FARM_PROGRAM_ID, provider);

  const protocol = PublicKey.findProgramAddressSync(
    [Buffer.from(PROTOCOL_SEED)],
    FARM_PROGRAM_ID,
  );

  const createFarm = await program.methods
    .createFarm()
    .accounts({
      stakeMint,
      clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
      protocol,
    })
    .rpcAndKeys();

  return createFarm.pubkeys.farm;
}

async function addCrop(
  provider: AnchorProvider,
  farm: PublicKey,
  amount: anchor.BN,
  rewardMint: PublicKey,
  rewardsPerDay: anchor.BN,
  FARM_PROGRAM_ID: PublicKey,
) {
  const program = new anchor.Program<Farm>(FarmIDL, FARM_PROGRAM_ID, provider);

  const protocol = PublicKey.findProgramAddressSync(
    [Buffer.from(PROTOCOL_SEED)],
    FARM_PROGRAM_ID,
  );

  const farmAccount = await program.account.farm.fetch(farm);
  let cropIndex = 0;
  // also equal to 8
  while (cropIndex < farmAccount.cropCreatedAt.length) {
    const createdAt = farmAccount.cropCreatedAt[cropIndex];
    if (createdAt === 0) {
      break;
    }
    ++cropIndex;
  }
  if (cropIndex === farmAccount.cropCreatedAt.length) {
    throw new Error('No more crops available');
  }
  const signerReward = getAssociatedTokenAddressSync(
    rewardMint,
    provider.wallet.publicKey,
  );

  const createCropVault = await program.methods
    .createCropVault()
    .accounts({
      farm,
      protocol,
      mint: rewardMint,
    })
    .rpcAndKeys();

  const cropVault = createCropVault.pubkeys.cropVault;

  program.methods.addCrop(cropIndex, amount, rewardsPerDay).accounts({
    farm,
    signerReward,
    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    cropVault,
  });
}

async function clearCrops(
  provider: AnchorProvider,
  farm: PublicKey,

  FARM_PROGRAM_ID: PublicKey,
) {
  const program = new anchor.Program<Farm>(FarmIDL, FARM_PROGRAM_ID, provider);
  const farmAccount = await program.account.farm.fetch(farm);
  const tx = new anchor.web3.Transaction();
  const totalStakers = farmAccount.stakers;

  const protocol = PublicKey.findProgramAddressSync(
    [Buffer.from(PROTOCOL_SEED)],
    FARM_PROGRAM_ID,
  );
  // TODO: May be unnecessary
  const additionalComputeBudgetInstruction =
    ComputeBudgetProgram.setComputeUnitLimit({ units: 400000 });

  tx.add(additionalComputeBudgetInstruction);

  for (let i = 0; i < farmAccount.cropStakersFinished.length; ++i) {
    // TODO: Check right type for cropCreatedAt
    const ca = farmAccount.cropCreatedAt[i];

    if (
      farmAccount.cropCreatedAt[i].neq(new anchor.BN(0)) &&
      farmAccount.cropStakersFinished[i].eq(totalStakers)
    ) {
      const cropVault = farmAccount.cropVault[i];
      const cropVaultAccount = await getTokenAccount(
        program.provider.connection,
        cropVault,
      );
      const mint = cropVaultAccount.mint;
      const signerReward = getAssociatedTokenAddressSync(
        mint,
        provider.wallet.publicKey,
      );
      const signerRewardExists = await provider.connection.getAccountInfo(
        signerReward,
      );
      if (signerReward == null) {
        const createSignerRewardInstruction =
          createAssociatedTokenAccountInstruction(
            provider.wallet.publicKey,
            signerReward,
            provider.wallet.publicKey,
            mint,
          );
        tx.add(createSignerRewardInstruction);
      }
      const instruction = await program.methods
        .removeCrop(i)
        .accounts({
          farm,
          cropVault,
          clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
          signerReward,
          protocol,
        })
        .instruction();
      tx.add(instruction);
    }
  }

  return provider.sendAndConfirm(tx);
}

async function harvestCrops(
  provider: AnchorProvider,
  farm: PublicKey,
  stake: PublicKey,
  FARM_PROGRAM_ID: PublicKey,
) {
  const program = new anchor.Program<Farm>(FarmIDL, FARM_PROGRAM_ID, provider);

  const protocol = PublicKey.findProgramAddressSync(
    [Buffer.from(PROTOCOL_SEED)],
    FARM_PROGRAM_ID,
  );

  const farmAccount = await program.account.farm.fetch(farm);
  const stakeAccount = await program.account.stake.fetch(stake);
  const tx = new anchor.web3.Transaction();

  for (let i = 0; i < farmAccount.cropStakersFinished.length; ++i) {
    if (farmAccount.cropCreatedAt[i] !== 0) {
      const cropVault = farmAccount.cropVault[i];
      const cropVaultAccount = await getTokenAccount(
        program.provider.connection,
        cropVault,
      );
      const mint = cropVaultAccount.mint;
      const signerReward = getAssociatedTokenAddressSync(
        mint,
        provider.wallet.publicKey,
      );
      const signerRewardExists = await provider.connection.getAccountInfo(
        signerReward,
      );
      if (signerReward == null) {
        const createSignerRewardInstruction =
          createAssociatedTokenAccountInstruction(
            provider.wallet.publicKey,
            signerReward,
            provider.wallet.publicKey,
            mint,
          );
        tx.add(createSignerRewardInstruction);
      }
      const instruction = await program.methods
        .gatherRewards(i)
        .accounts({
          farm,
          cropVault,
          clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
          signerReward,
          protocol,
        })
        .instruction();
      tx.add(instruction);
    }
  }
  return provider.sendAndConfirm(tx);
}

module.exports = {
  DEX_PID,
  // AMM_PROGRAM_ID,
  // FARM_PROGRAM_ID,
  getMarket,
  createMarket,
  createPool,
  stakeAmm,
  unstakeAmm,
  stakeFarm,
  unstakeFarm,
  createFarm,
  addCrop,
  clearCrops,
  harvestCrops,
  OpenAmmIDL,
  FarmIDL,
};

export type { OpenAmm };
export type { Farm };
