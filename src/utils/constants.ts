export const STATUS_COIN = {
  created: 0,
  sold: 1,
  deleted: -1,
};

export const STATUS_OPTIONS =[
  {
    label: 'Created',
    value: STATUS_COIN.created
  },
  {
    label: 'Sold',
    value: STATUS_COIN.sold
  }
]

export const MARKET_TYPE = {
  binance: 'BINANCE',
  bingx: 'BINGX',
  huobi: 'HTX',
  bitstamp: 'BITSTAMP',
  coinbase: 'COINBASE'
}

export const MARKET_OPTIONS = [
  { id: 1, value: MARKET_TYPE.coinbase, label: 'Coinbase' },
  { id: 2, value: MARKET_TYPE.binance, label: 'Binance' },
  { id: 3, value: MARKET_TYPE.bingx, label: 'BingX' },
  { id: 4, value: MARKET_TYPE.huobi, label: 'Huobi' }
]