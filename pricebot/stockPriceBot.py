import psycopg2
import os
import dotenv
import sched, time
import logging
import yfinance as yf

dotenv.load_dotenv()

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
try:
    conn = psycopg2.connect(
        host=os.getenv("DATABASE_HOST"),
        database=os.getenv("DATABASE_NAME"),
        user=os.getenv("DATABASE_USER"),
        password=os.getenv("DATABASE_PASSWORD"),
        port=os.getenv("DATABASE_PORT")
    )

    cur = conn.cursor()

    logging.info('PostgreSQL database version:')
    cur.execute('SELECT version()')

    # display the PostgreSQL database server version
    db_version = cur.fetchone()
    logging.info(db_version)
    logging.info("CONNECTION TO DB ESTABLISHED")
    cur.close()

except (Exception, psycopg2.DatabaseError) as error:
    logging.error(error)
    if conn is not None:
        conn.close()
        logging.info('Database connection closed.')
    
    exit()

def bot(scheduler):
    scheduler.enter(60, 1, bot, (scheduler,))
    try:
        logging.info("NEXT UPDATE ITERATION")
        # Open connection
        cur = conn.cursor()
        
        # Main api fetching and update logic here
        cur.execute("SELECT ticker FROM stocks_stock")
        tickerList = cur.fetchall()
        tickerList = [ticker[0]for ticker in tickerList]
        
        update_query = """
        UPDATE stocks_stock
        SET price = %s, week_growth = %s, five_year_growth = %s
        WHERE ticker = %s
        """
        
        data = []
        
        print(yf.Ticker('AAPL').basic_info["yearChange"])
        
        #for ticker in tickerList:
            #yfStock = yf.Ticker(ticker)
            #fiveYearPercent = ("{:.2f}".format(yfStock.info['fiveYearAverageReturn']) * 100)
            #yearDatePercent = ("{:.2f}".format(yfStock.info['ytdReturn']))
            #currentStockPrice = ("{:.2f}".format(yfStock.basic_info['lastPrice']))
            #data.append((currentStockPrice, 1, 2, ticker))
            

        # Execute the batch update
        cur.executemany(update_query, data)
        
        conn.commit()

        print("Done updating stocks")
        
        # Close connection
        cur.close()
    except(Exception, psycopg2.DatabaseError) as error:
        logging.error("STOCK PRICE UPDATE FAILURE")
        logging.error(error)
        if conn is not None:
            conn.close()
            logging.info('Database connection closed.')
        
        exit()

my_scheduler = sched.scheduler(time.time, time.sleep)
my_scheduler.enter(1, 1, bot, (my_scheduler,))
my_scheduler.run()