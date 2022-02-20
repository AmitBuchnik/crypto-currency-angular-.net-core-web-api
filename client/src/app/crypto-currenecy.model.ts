export class CryptoCurrencyModel {

    name: string;

    symbol: string;

    metrics: Metrics;
}

export class Metrics {

    market_data: MarketData;

    marketcap: MarketCap;
}

export class MarketData {

    price_usd: number;
}

export class MarketCap {

    current_marketcap_usd: number;
}