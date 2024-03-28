import { useState, useEffect } from 'react';

const Dropdown = () => {
    const [stockHistory, setStockHistory] = useState([]);

    useEffect(() => {
        const fetchStockHistory = async () => {
            try {
                const params = new URLSearchParams({
                    large_cap: true,
                    mid_cap: true,
                    small_cap: true,
                    buying_power: 10000
                });

                const response = await fetch(`/stocks_suggestions/?${params.toString()}`, {
                    method: 'GET',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch stock history');
                }

                const data = await response.json();

                // do we have a history field in db??
                setStockHistory(data.history);
            } catch (error) {
                console.error('Error fetching stock history:', error);
            }
        };

        fetchStockHistory();
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
                <div className="collapse-title text-xl font-medium">
                    Transaction History
                </div>
                <div className="collapse-content">
                    <ul>
                        {stockHistory.map((transaction, index) => (
                            <li key={index}>
                                {/* Render transaction details here */}
                                {transaction.date}: {transaction.symbol} - {transaction.price}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;

// const Dropdown = () => {
//     return (
//         <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
//             <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
//                 <div className="collapse-title text-xl font-medium">
//                 Transaction History
//                 </div>
//                 <div className="collapse-content">
//                 <p>tabIndex={0} attribute is necessary to make the div focusable</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dropdown;
