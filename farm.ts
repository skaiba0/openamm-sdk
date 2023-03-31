export type Farm = {
  version: '0.1.0';
  name: 'farm';
  instructions: [
    {
      name: 'addCrop';
      accounts: [
        {
          name: 'farm';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'cropVault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'signerReward';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'clock';
          isMut: false;
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
      ];
      args: [
        {
          name: 'cropIndex';
          type: 'u8';
        },
        {
          name: 'rewardAmount';
          type: 'u64';
        },
        {
          name: 'rewardsPerSecond';
          type: 'u64';
        },
      ];
    },
    {
      name: 'createCropVault';
      accounts: [
        {
          name: 'farm';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'cropVault';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'farm-crop-vault';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Farm';
                path: 'farm';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Mint';
                path: 'mint';
              },
            ];
          };
        },
        {
          name: 'mint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'protocol';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
    {
      name: 'createFarm';
      accounts: [
        {
          name: 'farm';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'farm';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'signer';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Mint';
                path: 'stake_mint';
              },
            ];
          };
        },
        {
          name: 'stakeMint';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeVault';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'farm-stake-vault';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'signer';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Mint';
                path: 'stake_mint';
              },
            ];
          };
        },
        {
          name: 'clock';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'protocol';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
    {
      name: 'createProtocol';
      accounts: [
        {
          name: 'protocol';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'protocol';
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
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
    {
      name: 'createStake';
      accounts: [
        {
          name: 'stake';
          isMut: true;
          isSigner: false;
          pda: {
            seeds: [
              {
                kind: 'const';
                type: 'string';
                value: 'stake';
              },
              {
                kind: 'account';
                type: 'publicKey';
                account: 'Farm';
                path: 'farm';
              },
              {
                kind: 'account';
                type: 'publicKey';
                path: 'signer';
              },
            ];
          };
        },
        {
          name: 'farm';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'clock';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'rent';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [];
    },
    {
      name: 'gatherRewards';
      accounts: [
        {
          name: 'farm';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'cropVault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stake';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'signerReward';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'clock';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'signer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'protocol';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'cropIndex';
          type: 'u8';
        },
      ];
    },
    {
      name: 'removeCrop';
      accounts: [
        {
          name: 'farm';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'cropVault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'signerReward';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'clock';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'protocol';
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
      ];
      args: [
        {
          name: 'cropIndex';
          type: 'u8';
        },
      ];
    },
    {
      name: 'stakeTokens';
      accounts: [
        {
          name: 'farm';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeVault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stake';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'signerToken';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'clock';
          isMut: false;
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
      ];
      args: [
        {
          name: 'amount';
          type: 'u64';
        },
      ];
    },
    {
      name: 'unstakeTokens';
      accounts: [
        {
          name: 'farm';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakeVault';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stake';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'signerToken';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'clock';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'protocol';
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
      ];
      args: [
        {
          name: 'amount';
          type: 'u64';
        },
      ];
    },
  ];
  accounts: [
    {
      name: 'farm';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'owner';
            type: 'publicKey';
          },
          {
            name: 'createdAt';
            type: 'u64';
          },
          {
            name: 'stakeVault';
            type: 'publicKey';
          },
          {
            name: 'stakeMint';
            type: 'publicKey';
          },
          {
            name: 'lastUpdatedAt';
            type: 'u64';
          },
          {
            name: 'totalStakedAmount';
            type: 'u64';
          },
          {
            name: 'stakers';
            type: 'u64';
          },
          {
            name: 'cropVault';
            type: {
              array: ['publicKey', 8];
            };
          },
          {
            name: 'cropRewardsPerSecond';
            type: {
              array: ['u64', 8];
            };
          },
          {
            name: 'cropRewardsPerToken';
            type: {
              array: ['u128', 8];
            };
          },
          {
            name: 'cropEndDate';
            type: {
              array: ['u64', 8];
            };
          },
          {
            name: 'cropCreatedAt';
            type: {
              array: ['u64', 8];
            };
          },
          {
            name: 'cropStakersFinished';
            type: {
              array: ['u64', 8];
            };
          },
        ];
      };
    },
    {
      name: 'protocol';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'bumpSeed';
            type: 'u8';
          },
        ];
      };
    },
    {
      name: 'stake';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'owner';
            type: 'publicKey';
          },
          {
            name: 'createdAt';
            type: 'u64';
          },
          {
            name: 'amountStaked';
            type: 'u64';
          },
          {
            name: 'lastUpdatedAt';
            type: 'u64';
          },
          {
            name: 'farm';
            type: 'publicKey';
          },
          {
            name: 'rewardDebt';
            type: {
              array: ['u128', 8];
            };
          },
          {
            name: 'lastGatheredAt';
            type: {
              array: ['u64', 8];
            };
          },
          {
            name: 'amountOwed';
            type: {
              array: ['u64', 8];
            };
          },
        ];
      };
    },
  ];
};

export const IDL: Farm = {
  version: '0.1.0',
  name: 'farm',
  instructions: [
    {
      name: 'addCrop',
      accounts: [
        {
          name: 'farm',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'cropVault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signerReward',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'clock',
          isMut: false,
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
      ],
      args: [
        {
          name: 'cropIndex',
          type: 'u8',
        },
        {
          name: 'rewardAmount',
          type: 'u64',
        },
        {
          name: 'rewardsPerSecond',
          type: 'u64',
        },
      ],
    },
    {
      name: 'createCropVault',
      accounts: [
        {
          name: 'farm',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'cropVault',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'farm-crop-vault',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Farm',
                path: 'farm',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Mint',
                path: 'mint',
              },
            ],
          },
        },
        {
          name: 'mint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'protocol',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'createFarm',
      accounts: [
        {
          name: 'farm',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'farm',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'signer',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Mint',
                path: 'stake_mint',
              },
            ],
          },
        },
        {
          name: 'stakeMint',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeVault',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'farm-stake-vault',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'signer',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Mint',
                path: 'stake_mint',
              },
            ],
          },
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'protocol',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'createProtocol',
      accounts: [
        {
          name: 'protocol',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'protocol',
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
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'createStake',
      accounts: [
        {
          name: 'stake',
          isMut: true,
          isSigner: false,
          pda: {
            seeds: [
              {
                kind: 'const',
                type: 'string',
                value: 'stake',
              },
              {
                kind: 'account',
                type: 'publicKey',
                account: 'Farm',
                path: 'farm',
              },
              {
                kind: 'account',
                type: 'publicKey',
                path: 'signer',
              },
            ],
          },
        },
        {
          name: 'farm',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'rent',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: 'gatherRewards',
      accounts: [
        {
          name: 'farm',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'cropVault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stake',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signerReward',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'signer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'protocol',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'cropIndex',
          type: 'u8',
        },
      ],
    },
    {
      name: 'removeCrop',
      accounts: [
        {
          name: 'farm',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'cropVault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signerReward',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'protocol',
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
      ],
      args: [
        {
          name: 'cropIndex',
          type: 'u8',
        },
      ],
    },
    {
      name: 'stakeTokens',
      accounts: [
        {
          name: 'farm',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeVault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stake',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signerToken',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'clock',
          isMut: false,
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
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'unstakeTokens',
      accounts: [
        {
          name: 'farm',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakeVault',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stake',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'signerToken',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'clock',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'protocol',
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
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'farm',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'owner',
            type: 'publicKey',
          },
          {
            name: 'createdAt',
            type: 'u64',
          },
          {
            name: 'stakeVault',
            type: 'publicKey',
          },
          {
            name: 'stakeMint',
            type: 'publicKey',
          },
          {
            name: 'lastUpdatedAt',
            type: 'u64',
          },
          {
            name: 'totalStakedAmount',
            type: 'u64',
          },
          {
            name: 'stakers',
            type: 'u64',
          },
          {
            name: 'cropVault',
            type: {
              array: ['publicKey', 8],
            },
          },
          {
            name: 'cropRewardsPerSecond',
            type: {
              array: ['u64', 8],
            },
          },
          {
            name: 'cropRewardsPerToken',
            type: {
              array: ['u128', 8],
            },
          },
          {
            name: 'cropEndDate',
            type: {
              array: ['u64', 8],
            },
          },
          {
            name: 'cropCreatedAt',
            type: {
              array: ['u64', 8],
            },
          },
          {
            name: 'cropStakersFinished',
            type: {
              array: ['u64', 8],
            },
          },
        ],
      },
    },
    {
      name: 'protocol',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bumpSeed',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'stake',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'owner',
            type: 'publicKey',
          },
          {
            name: 'createdAt',
            type: 'u64',
          },
          {
            name: 'amountStaked',
            type: 'u64',
          },
          {
            name: 'lastUpdatedAt',
            type: 'u64',
          },
          {
            name: 'farm',
            type: 'publicKey',
          },
          {
            name: 'rewardDebt',
            type: {
              array: ['u128', 8],
            },
          },
          {
            name: 'lastGatheredAt',
            type: {
              array: ['u64', 8],
            },
          },
          {
            name: 'amountOwed',
            type: {
              array: ['u64', 8],
            },
          },
        ],
      },
    },
  ],
};
