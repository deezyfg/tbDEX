import { mockProviderDids } from '../mocks/mocks'

export interface PfiAllowlistConfig {
  pfiUri: string,
  pfiName: string
}

// TODO 1: Choose the PFIs you want as part of your listings

export const pfiAllowlist: PfiAllowlistConfig[] = [
  {
    pfiUri: mockProviderDids.aquafinance_capital.uri,
    pfiName: mockProviderDids.aquafinance_capital.name,
  },
  {
    pfiUri: mockProviderDids.titanium_trust.uri,
    pfiName: mockProviderDids.titanium_trust.name,
  },
  {
    pfiUri: 'did:dht:kdqnzqsoedntcfmcgrxshr7ek93ep1eznfxn1wnkreyy9reewa9o',
    pfiName: 'tbDEX USDC PFI'
  }
]