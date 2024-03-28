import { useState, useEffect } from 'react';
import { backendURL, getAuthHeader } from '../utils';
import axios from 'axios';

const Dropdown = () => {
    const [stockHistory, setStockHistory] = useState([]);

    useEffect(() => {
        const fetchStockHistory = async () => {
            try {
                const response = await axios.get(`${backendURL}/stocks_suggestions/`, {
                    headers: getAuthHeader()
                });

                if (response.status !== 200) {
                    throw new Error('Failed to fetch stock history');
                }

                const data = response.data;

                // do we have a history field in db??
                setStockHistory(data.history);

                console.log('Stock history fetched successfully:', data.history);
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
