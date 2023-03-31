export type OpenAmm = {
  version: '0.1.0';
  name: 'open_amm';
  instructions: [
    {
      name: 'createPool';
      accounts: [
        {
          name: 'quoteVault';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                path: 'pool';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'pool-quote-vault';
              },
            ];
          };
        },
        {
          name: 'baseVault';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                path: 'pool';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'pool-base-vault';
              },
            ];
          };
        },
        {
          name: 'signerBase';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'signerQuote';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lpMint';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                path: 'pool';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'pool-lp-mint';
              },
            ];
          };
        },
        {
          name: 'signerLp';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'marketAccounts';
          accounts: [
            {
              name: 'market';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'openOrders';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'requestQueue';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'eventQueue';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'bids';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'asks';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'baseVault';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'quoteVault';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'vaultSigner';
              isMut: false;
              isSigner: false;
            },
          ];
        },
        {
          name: 'quoteMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'baseMint';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'pool';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: {
                  defined: "AccountInfo<'info>";
                };
                account: 'MarketAccounts';
                path: 'market_accounts.market';
              },
              {
                kind: 'arg';
                type: 'u8';
                path: 'pool_type';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'pool';
              },
            ];
          };
        },
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'openOrders';
          isMut: true;
          isSigner: false;
          docs: ['CHECK'];
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                path: 'pool';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'pool-open-orders';
              },
            ];
          };
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'associatedTokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dexProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'poolType';
          type: {
            defined: 'PoolType';
          };
        },
        {
          name: 'initialBaseAmount';
          type: 'u64';
        },
        {
          name: 'initialQuoteAmount';
          type: 'u64';
        },
      ];
    },
    {
      name: 'deposit';
      accounts: [
        {
          name: 'pool';
          isMut: true;
          isSigner: false;
          relations: ['base_vault', 'quote_vault', 'lp_mint'];
        },
        {
          name: 'marketAccounts';
          accounts: [
            {
              name: 'market';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'openOrders';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'requestQueue';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'eventQueue';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'bids';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'asks';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'baseVault';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'quoteVault';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'vaultSigner';
              isMut: false;
              isSigner: false;
            },
          ];
        },
        {
          name: 'baseVault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'quoteVault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lpMint';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                path: 'pool';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'pool-lp-mint';
              },
            ];
          };
        },
        {
          name: 'signerBase';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'signerQuote';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'signerLp';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dexProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'desiredBaseAmount';
          type: 'u64';
        },
        {
          name: 'desiredQuoteAmount';
          type: 'u64';
        },
        {
          name: 'minBaseAmount';
          type: 'u64';
        },
        {
          name: 'minQuoteAmount';
          type: 'u64';
        },
      ];
    },
    {
      name: 'withdraw';
      accounts: [
        {
          name: 'pool';
          isMut: true;
          isSigner: false;
          relations: ['base_vault', 'quote_vault', 'lp_mint'];
        },
        {
          name: 'marketAccounts';
          accounts: [
            {
              name: 'market';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'openOrders';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'requestQueue';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'eventQueue';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'bids';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'asks';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'baseVault';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'quoteVault';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'vaultSigner';
              isMut: false;
              isSigner: false;
            },
          ];
        },
        {
          name: 'baseVault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'quoteVault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'lpMint';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'account';
                type: 'publicKey';
                path: 'pool';
              },
              {
                kind: 'const';
                type: 'string';
                value: 'pool-lp-mint';
              },
            ];
          };
        },
        {
          name: 'signerBase';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'signerQuote';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'signerLp';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dexProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'lpAmt';
          type: 'u64';
        },
      ];
    },
    {
      name: 'refreshOrders';
      accounts: [
        {
          name: 'pool';
          isMut: true;
          isSigner: false;
          relations: ['base_vault', 'quote_vault'];
        },
        {
          name: 'marketAccounts';
          accounts: [
            {
              name: 'market';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'openOrders';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'requestQueue';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'eventQueue';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'bids';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'asks';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'baseVault';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'quoteVault';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'vaultSigner';
              isMut: false;
              isSigner: false;
            },
          ];
        },
        {
          name: 'baseVault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'quoteVault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'signerBase';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'signerQuote';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dexProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
    {
      name: 'restartMarketMaking';
      accounts: [
        {
          name: 'pool';
          isMut: true;
          isSigner: false;
          relations: ['base_vault', 'quote_vault'];
        },
        {
          name: 'marketAccounts';
          accounts: [
            {
              name: 'market';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'openOrders';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'requestQueue';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'eventQueue';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'bids';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'asks';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'baseVault';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'quoteVault';
              isMut: true;
              isSigner: false;
            },
            {
              name: 'vaultSigner';
              isMut: false;
              isSigner: false;
            },
          ];
        },
        {
          name: 'baseVault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'quoteVault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'dexProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
  ];
  accounts: [
    {
      name: 'openAmmPool';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'baseAmount';
            type: 'u64';
          },
          {
            name: 'quoteAmount';
            type: 'u64';
          },
          {
            name: 'cumulativeQuoteVolume';
            type: 'u64';
          },
          {
            name: 'cumulativeBaseVolume';
            type: 'u64';
          },
          {
            name: 'refundBaseAmount';
            type: 'u64';
          },
          {
            name: 'refundQuoteAmount';
            type: 'u64';
          },
          {
            name: 'baseMint';
            type: 'publicKey';
          },
          {
            name: 'quoteMint';
            type: 'publicKey';
          },
          {
            name: 'market';
            type: 'publicKey';
          },
          {
            name: 'openOrders';
            type: 'publicKey';
          },
          {
            name: 'baseVault';
            type: 'publicKey';
          },
          {
            name: 'quoteVault';
            type: 'publicKey';
          },
          {
            name: 'lpMint';
            type: 'publicKey';
          },
          {
            name: 'clientOrderId';
            type: 'u64';
          },
          {
            name: 'poolType';
            type: {
              defined: 'PoolType';
            };
          },
          {
            name: 'baseDecimals';
            type: 'u8';
          },
          {
            name: 'quoteDecimals';
            type: 'u8';
          },
          {
            name: 'bump';
            type: 'u8';
          },
          {
            name: 'placedAsks';
            type: {
              array: [
                {
                  defined: 'PlacedOrder';
                },
                10,
              ];
            };
          },
          {
            name: 'placedBids';
            type: {
              array: [
                {
                  defined: 'PlacedOrder';
                },
                10,
              ];
            };
          },
          {
            name: 'mmActive';
            type: 'bool';
          },
        ];
      };
    },
  ];
  types: [
    {
      name: 'PlacedOrder';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'limitPrice';
            type: 'u64';
          },
          {
            name: 'baseQty';
            type: 'u64';
          },
          {
            name: 'maxNativeQuoteQtyIncludingFees';
            type: 'u64';
          },
          {
            name: 'clientOrderId';
            type: 'u64';
          },
        ];
      };
    },
    {
      name: 'PoolType';
      type: {
        kind: 'enum';
        variants: [
          {
            name: 'XYK';
          },
          {
            name: 'STABLE';
          },
        ];
      };
    },
  ];
  events: [
    {
      name: 'DepositEvent';
      fields: [
        {
          name: 'poolType';
          type: {
            defined: 'PoolType';
          };
          index: false;
        },
        {
          name: 'startBase';
          type: 'u64';
          index: false;
        },
        {
          name: 'startQuote';
          type: 'u64';
          index: false;
        },
        {
          name: 'startLp';
          type: 'u64';
          index: false;
        },
        {
          name: 'endBase';
          type: 'u64';
          index: false;
        },
        {
          name: 'endQuote';
          type: 'u64';
          index: false;
        },
        {
          name: 'endLp';
          type: 'u64';
          index: false;
        },
      ];
    },
    {
      name: 'WithdrawEvent';
      fields: [
        {
          name: 'poolType';
          type: {
            defined: 'PoolType';
          };
          index: false;
        },
        {
          name: 'startBase';
          type: 'u64';
          index: false;
        },
        {
          name: 'startQuote';
          type: 'u64';
          index: false;
        },
        {
          name: 'startLp';
          type: 'u64';
          index: false;
        },
        {
          name: 'endBase';
          type: 'u64';
          index: false;
        },
        {
          name: 'endQuote';
          type: 'u64';
          index: false;
        },
        {
          name: 'endLp';
          type: 'u64';
          index: false;
        },
      ];
    },
  ];
  errors: [
    {
      code: 6000;
      name: 'InvalidPair';
      msg: 'OpenAmmErrorCode::InvalidPair - Pair is invalid';
    },
    {
      code: 6001;
      name: 'WrongOpenOrdersAccount';
      msg: 'OpenAmmErrorCode::WrongOpenOrdersAccount - Wrong open orders account for pool';
    },
    {
      code: 6002;
      name: 'WrongMarketAccount';
      msg: 'OpenAmmErrorCode::WrongMarket - Wrong market account for pool';
    },
    {
      code: 6003;
      name: 'MarketBaseMintMismatch';
      msg: 'OpenAmmErrorCode::MarketBaseMintMismatch - Market base mint does not match token A';
    },
    {
      code: 6004;
      name: 'MarketQuoteMintMismatch';
      msg: 'OpenAmmErrorCode::MarketQuoteMintMismatch - Market quote mint does not match token B';
    },
    {
      code: 6005;
      name: 'SlippageBaseExceeded';
      msg: 'OpenAmmErrorCode::SlippageBaseExceeded - Slippage for base exceeded';
    },
    {
      code: 6006;
      name: 'SlippageQuoteExceeded';
      msg: 'OpenAmmErrorCode::SlippageQuoteExceeded - Slippage for quote exceeded';
    },
    {
      code: 6007;
      name: 'MarketMakingAlreadyActive';
      msg: 'OpenAmmErrorCode::MarketMakingAlreadyActive - Market making is already active';
    },
    {
      code: 6008;
      name: 'OpenOrdersTokensLocked';
      msg: 'OpenAmmErrorCode::OpenOrdersTokensLocked - Open orders tokens are locked';
    },
  ];
};

export const IDL: OpenAmm = {
  version: '0.1.0',
  name: 'open_amm',
  instructions: [
    {
      name: 'createPool',
      accounts: [
        {
          name: 'quoteVault',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                path: 'pool',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'pool-quote-vault',
              },
            ],
          },
        },
        {
          name: 'baseVault',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                path: 'pool',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'pool-base-vault',
              },
            ],
          },
        },
        {
          name: 'signerBase',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signerQuote',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lpMint',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                path: 'pool',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'pool-lp-mint',
              },
            ],
          },
        },
        {
          name: 'signerLp',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'marketAccounts',
          accounts: [
            {
              name: 'market',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'openOrders',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'requestQueue',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'eventQueue',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'bids',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'asks',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'baseVault',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'quoteVault',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'vaultSigner',
              isMut: false,
              isSigner: false,
            },
          ],
        },
        {
          name: 'quoteMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'baseMint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'pool',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: {
                  defined: "AccountInfo<'info>",
                },
                account: 'MarketAccounts',
                path: 'market_accounts.market',
              },
              {
                kind: 'arg',
                type: 'u8',
                path: 'pool_type',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'pool',
              },
            ],
          },
        },
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'openOrders',
          isMut: true,
          isSigner: false,
          docs: ['CHECK'],
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                path: 'pool',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'pool-open-orders',
              },
            ],
          },
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dexProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'poolType',
          type: {
            defined: 'PoolType',
          },
        },
        {
          name: 'initialBaseAmount',
          type: 'u64',
        },
        {
          name: 'initialQuoteAmount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'deposit',
      accounts: [
        {
          name: 'pool',
          isMut: true,
          isSigner: false,
          relations: ['base_vault', 'quote_vault', 'lp_mint'],
        },
        {
          name: 'marketAccounts',
          accounts: [
            {
              name: 'market',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'openOrders',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'requestQueue',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'eventQueue',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'bids',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'asks',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'baseVault',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'quoteVault',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'vaultSigner',
              isMut: false,
              isSigner: false,
            },
          ],
        },
        {
          name: 'baseVault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'quoteVault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lpMint',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                path: 'pool',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'pool-lp-mint',
              },
            ],
          },
        },
        {
          name: 'signerBase',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signerQuote',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signerLp',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dexProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'desiredBaseAmount',
          type: 'u64',
        },
        {
          name: 'desiredQuoteAmount',
          type: 'u64',
        },
        {
          name: 'minBaseAmount',
          type: 'u64',
        },
        {
          name: 'minQuoteAmount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'withdraw',
      accounts: [
        {
          name: 'pool',
          isMut: true,
          isSigner: false,
          relations: ['base_vault', 'quote_vault', 'lp_mint'],
        },
        {
          name: 'marketAccounts',
          accounts: [
            {
              name: 'market',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'openOrders',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'requestQueue',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'eventQueue',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'bids',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'asks',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'baseVault',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'quoteVault',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'vaultSigner',
              isMut: false,
              isSigner: false,
            },
          ],
        },
        {
          name: 'baseVault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'quoteVault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'lpMint',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'account',
                type: 'publicKey',
                path: 'pool',
              },
              {
                kind: 'const',
                type: 'string',
                value: 'pool-lp-mint',
              },
            ],
          },
        },
        {
          name: 'signerBase',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signerQuote',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signerLp',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dexProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'lpAmt',
          type: 'u64',
        },
      ],
    },
    {
      name: 'refreshOrders',
      accounts: [
        {
          name: 'pool',
          isMut: true,
          isSigner: false,
          relations: ['base_vault', 'quote_vault'],
        },
        {
          name: 'marketAccounts',
          accounts: [
            {
              name: 'market',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'openOrders',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'requestQueue',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'eventQueue',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'bids',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'asks',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'baseVault',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'quoteVault',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'vaultSigner',
              isMut: false,
              isSigner: false,
            },
          ],
        },
        {
          name: 'baseVault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'quoteVault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signerBase',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signerQuote',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dexProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'restartMarketMaking',
      accounts: [
        {
          name: 'pool',
          isMut: true,
          isSigner: false,
          relations: ['base_vault', 'quote_vault'],
        },
        {
          name: 'marketAccounts',
          accounts: [
            {
              name: 'market',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'openOrders',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'requestQueue',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'eventQueue',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'bids',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'asks',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'baseVault',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'quoteVault',
              isMut: true,
              isSigner: false,
            },
            {
              name: 'vaultSigner',
              isMut: false,
              isSigner: false,
            },
          ],
        },
        {
          name: 'baseVault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'quoteVault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'dexProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: 'openAmmPool',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'baseAmount',
            type: 'u64',
          },
          {
            name: 'quoteAmount',
            type: 'u64',
          },
          {
            name: 'cumulativeQuoteVolume',
            type: 'u64',
          },
          {
            name: 'cumulativeBaseVolume',
            type: 'u64',
          },
          {
            name: 'refundBaseAmount',
            type: 'u64',
          },
          {
            name: 'refundQuoteAmount',
            type: 'u64',
          },
          {
            name: 'baseMint',
            type: 'publicKey',
          },
          {
            name: 'quoteMint',
            type: 'publicKey',
          },
          {
            name: 'market',
            type: 'publicKey',
          },
          {
            name: 'openOrders',
            type: 'publicKey',
          },
          {
            name: 'baseVault',
            type: 'publicKey',
          },
          {
            name: 'quoteVault',
            type: 'publicKey',
          },
          {
            name: 'lpMint',
            type: 'publicKey',
          },
          {
            name: 'clientOrderId',
            type: 'u64',
          },
          {
            name: 'poolType',
            type: {
              defined: 'PoolType',
            },
          },
          {
            name: 'baseDecimals',
            type: 'u8',
          },
          {
            name: 'quoteDecimals',
            type: 'u8',
          },
          {
            name: 'bump',
            type: 'u8',
          },
          {
            name: 'placedAsks',
            type: {
              array: [
                {
                  defined: 'PlacedOrder',
                },
                10,
              ],
            },
          },
          {
            name: 'placedBids',
            type: {
              array: [
                {
                  defined: 'PlacedOrder',
                },
                10,
              ],
            },
          },
          {
            name: 'mmActive',
            type: 'bool',
          },
        ],
      },
    },
  ],
  types: [
    {
      name: 'PlacedOrder',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'limitPrice',
            type: 'u64',
          },
          {
            name: 'baseQty',
            type: 'u64',
          },
          {
            name: 'maxNativeQuoteQtyIncludingFees',
            type: 'u64',
          },
          {
            name: 'clientOrderId',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'PoolType',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'XYK',
          },
          {
            name: 'STABLE',
          },
        ],
      },
    },
  ],
  events: [
    {
      name: 'DepositEvent',
      fields: [
        {
          name: 'poolType',
          type: {
            defined: 'PoolType',
          },
          index: false,
        },
        {
          name: 'startBase',
          type: 'u64',
          index: false,
        },
        {
          name: 'startQuote',
          type: 'u64',
          index: false,
        },
        {
          name: 'startLp',
          type: 'u64',
          index: false,
        },
        {
          name: 'endBase',
          type: 'u64',
          index: false,
        },
        {
          name: 'endQuote',
          type: 'u64',
          index: false,
        },
        {
          name: 'endLp',
          type: 'u64',
          index: false,
        },
      ],
    },
    {
      name: 'WithdrawEvent',
      fields: [
        {
          name: 'poolType',
          type: {
            defined: 'PoolType',
          },
          index: false,
        },
        {
          name: 'startBase',
          type: 'u64',
          index: false,
        },
        {
          name: 'startQuote',
          type: 'u64',
          index: false,
        },
        {
          name: 'startLp',
          type: 'u64',
          index: false,
        },
        {
          name: 'endBase',
          type: 'u64',
          index: false,
        },
        {
          name: 'endQuote',
          type: 'u64',
          index: false,
        },
        {
          name: 'endLp',
          type: 'u64',
          index: false,
        },
      ],
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'InvalidPair',
      msg: 'OpenAmmErrorCode::InvalidPair - Pair is invalid',
    },
    {
      code: 6001,
      name: 'WrongOpenOrdersAccount',
      msg: 'OpenAmmErrorCode::WrongOpenOrdersAccount - Wrong open orders account for pool',
    },
    {
      code: 6002,
      name: 'WrongMarketAccount',
      msg: 'OpenAmmErrorCode::WrongMarket - Wrong market account for pool',
    },
    {
      code: 6003,
      name: 'MarketBaseMintMismatch',
      msg: 'OpenAmmErrorCode::MarketBaseMintMismatch - Market base mint does not match token A',
    },
    {
      code: 6004,
      name: 'MarketQuoteMintMismatch',
      msg: 'OpenAmmErrorCode::MarketQuoteMintMismatch - Market quote mint does not match token B',
    },
    {
      code: 6005,
      name: 'SlippageBaseExceeded',
      msg: 'OpenAmmErrorCode::SlippageBaseExceeded - Slippage for base exceeded',
    },
    {
      code: 6006,
      name: 'SlippageQuoteExceeded',
      msg: 'OpenAmmErrorCode::SlippageQuoteExceeded - Slippage for quote exceeded',
    },
    {
      code: 6007,
      name: 'MarketMakingAlreadyActive',
      msg: 'OpenAmmErrorCode::MarketMakingAlreadyActive - Market making is already active',
    },
    {
      code: 6008,
      name: 'OpenOrdersTokensLocked',
      msg: 'OpenAmmErrorCode::OpenOrdersTokensLocked - Open orders tokens are locked',
    },
  ],
};
