const data = [
  {
    key: 1,
    ticker: 'AAPL',
    stockName: 'Apple Inc.',
    stocksOwned: 100,
    growPercentage: 5,
  },
  {
    key: 2,
    ticker: 'GOOGL',
    stockName: 'Alphabet Inc.',
    stocksOwned: 50,
    growPercentage: 10,
  },
  {
    key: 3,
    ticker: 'MSFT',
    stockName: 'Microsoft Corporation',
    stocksOwned: 75,
    growPercentage: -2,
  },
  {
    key: 4,
    ticker: 'AMZN',
    stockName: 'Amazon.com Inc.',
    stocksOwned: 30,
    growPercentage: 15,
  },
  {
    key: 5,
    ticker: 'TSLA',
    stockName: 'Tesla Inc.',
    stocksOwned: 20,
    growPercentage: 8,
  },
];

const StockStatsTable = () => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
            <div
                style={{
                overflowX: 'auto',
                marginTop: '10px',
                }}
            >
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                    <th style={{ padding: '8px' }}>Ticker</th>
                    <th style={{ padding: '8px' }}>Stock Name</th>
                    <th style={{ padding: '8px' }}>Stocks Owned</th>
                    <th style={{ padding: '8px' }}>Growth %</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                    <tr key={item.key}>
                        <td style={{ padding: '8px' }}>{item.ticker}</td>
                        <td style={{ padding: '8px' }}>{item.stockName}</td>
                        <td style={{ padding: '8px' }}>{item.stocksOwned}</td>
                        <td style={{ padding: '8px' }}>{item.growPercentage}%</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockStatsTable;
