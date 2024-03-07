import './StockGen.css';
import { YourStockItem, OtherStockItem } from '../components/StockGen/YourStockItem';
import { useState } from 'react';
import axios from 'axios';
import { backendURL, getAuthHeader } from '../utils';

const StockGen = () => {
    const [otherStocks, setOtherStocks] = useState([]);
    const [userStocks, setUserStocks] = useState([]);
    const auth = getAuthHeader();

    const getOtherStocks = async () => {
        try {
            const resp = await axios.get(`${backendURL}/stocks/`);
            setOtherStocks(resp.data);
        } catch (err) {
            console.error(err);
        }
    };

    const getUserStocks = async () => {
        try {
            const resp = await axios.get(`${backendURL}/user_stocks/`, auth);
            setUserStocks(resp.data);
        } catch (err) {
            console.error(err);
        }
    };

    useState(() => {
        getOtherStocks();
        getUserStocks();
    }, []);

    return (
        <div className="stockgen-body">
            <div className="class-name">
                <h3>Other stocks</h3>
                <h3>Your stocks</h3>
                <h3>Your portfolio</h3>
            </div>

            <div className="stockgen-container">
                <div>
                    {otherStocks.map((item, idx) => {
                        return (
                            <OtherStockItem item={item} key={idx} />
                        );
                    })}
                </div>
                <div>
                    {userStocks.map((item, idx) => {
                        return (
                            <YourStockItem item={item} key={idx} />
                        );
                    })}
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default StockGen;