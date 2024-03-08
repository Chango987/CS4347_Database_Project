import './StockGen.css';
import { YourStockItem, OtherStockItem } from '../components/StockGen/YourStockItem';
import { useState } from 'react';
import axios from 'axios';
import { backendURL, getAuthHeader } from '../utils';
import { toast } from 'react-toastify';

const StockGen = () => {
    const [otherStocks, setOtherStocks] = useState([]);
    const [userStocks, setUserStocks] = useState([]);
    const [userPort, setUserPort] = useState(null);
    const [buyPower, setBuyPower] = useState('');
    const [cash, setCash] = useState(null);
    const [showSug, setShowSug] = useState(false);
    const [suggestion, setSuggestion] = useState([]);
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

    const getUserPort = async () => {
        try {
            const resp = await axios.get(`${backendURL}/user_portfolio/`, auth);
            setUserPort(resp.data);
        } catch (err) {
            console.error(err);
        }
    };

    const getCash = async () => {
        try {
            const resp = await axios.get(`${backendURL}/user_cash_balance/`, auth);
            setCash(resp.data);
        } catch (err) {
            console.error(err);
        }
    };

    const getSuggestion = async (e) => {
        e.preventDefault();

        if (!buyPower || parseFloat(buyPower) <= 0) {
            toast.error('please enter buy power greater than 0');
            return;
        }

        try {
            const resp = await axios.post(`${backendURL}/stocks_suggestions/`, {
                cap_size_portfolio: JSON.stringify({
                    large_cap: userPort.large_cap_percentage,
                    medium_cap: userPort.medium_cap_percentage,
                    small_cap: userPort.small_cap_percentage,
                }),
                buying_power: parseFloat(buyPower),
            }, auth);

            setSuggestion(resp.data);
            setShowSug(true);
        } catch (err) {
            console.error(err);
        }
    };

    useState(() => {
        getOtherStocks();
        getUserStocks();
        getUserPort();
        getCash();
    }, []);

    return (
        <div className="stockgen-body">
            {showSug &&
                <div
                    className='sug-modal'
                    onClick={() => setShowSug(false)}
                >
                    <div onClick={(e) => {e.stopPropagation();}}>
                        <div className='sug-side-container'>
                            <div className='sug-item sug-item-header'>
                                <h4>Stock</h4>
                                <h4>Price per share</h4>
                                <h4>Shares</h4>
                            </div>
                            {suggestion.map((item, idx) => {
                                return (
                                    <div key={`sug-${idx}`} className='sug-item'>
                                        <p><strong>{item.ticker}</strong></p>
                                        <p>${item.price}</p>
                                        <p>{item.buy}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            }

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
                <div className='user-port-area'>
                    <div className='port-cash-section'>
                        {userPort &&
                            <div className='portfolio-side'>
                                <div className='portfolio-field'>
                                    <p>Small</p>
                                    <p>{userPort.small_cap_percentage}%</p>
                                </div>
                                <div className='portfolio-field'>
                                    <p>Medium</p>
                                    <p>{userPort.medium_cap_percentage}%</p>
                                </div>
                                <div className='portfolio-field'>
                                    <p>Large</p>
                                    <p>{userPort.large_cap_percentage}%</p>
                                </div>
                            </div>
                        }
                        <div className='cash-side'>
                            <p>Available cash</p>
                            <h3>${cash && cash.current_cash_balance}</h3>
                        </div>
                    </div>
                    <input
                        className="inputField"
                        type="numeric"
                        placeholder="Buying power"
                        name="buying-power"
                        value={buyPower}
                        onChange={(e) => {
                            setBuyPower(e.target.value);
                        }}
                        required
                    />
                    <button onClick={getSuggestion}>
                        Generate suggestion
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StockGen;