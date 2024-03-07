import './StockItem.css';
import PropTypes from 'prop-types';

const YourStockItem = (props) => {
    const stock = props.item.stocks;
    const share = props.item.shares;
    const red = (stock.week_growth < 0);
    return (
        <div className='stock-item-container'>
            <div>
                <h3>{stock.ticker}</h3>
                <p>{stock.name}</p>
            </div>
            <div>
                <h4 className={`${red ? 'red-indic' : 'green-indic'}`}>${stock.price}</h4>
                <p>{share} shares</p>
            </div>
        </div>
    );
};

const OtherStockItem = (props) => {
    const item = props.item;
    const red = (item.week_growth < 0);
    return (
        <div className='stock-item-container other-stocks'>
            <div>
                <h3>{item.ticker}</h3>
                <p>{item.name}</p>
            </div>
            <div>
                <h4 className={`${red ? 'red-indic' : 'green-indic'}`}>${item.price}</h4>
                <div className='stock-growth-container'>
                    <p>W: {item.week_growth}</p>
                    <p>5Y: {item.five_year_growth}</p>
                </div>
            </div>
        </div>
    );
};

YourStockItem.propTypes = {
    item: PropTypes.object
};

OtherStockItem.propTypes = {
    item: PropTypes.object
};

export { YourStockItem, OtherStockItem };