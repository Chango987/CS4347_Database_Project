import psycopg2
import os
import dotenv
import sched, time

dotenv.load_dotenv()

try:
    conn = psycopg2.connect(
        host=os.getenv("DATABASE_HOST"),
        database=os.getenv("DATABASE_NAME"),
        user=os.getenv("DATABASE_USER"),
        password=os.getenv("DATABASE_PASSWORD"),
        port=os.getenv("DATABASE_PORT")
    )

    cur = conn.cursor()

    print('PostgreSQL database version:')
    cur.execute('SELECT version()')

    # display the PostgreSQL database server version
    db_version = cur.fetchone()
    print(db_version)
    print("CONNECTION TO DB ESTABLISHED")
    cur.close()

except (Exception, psycopg2.DatabaseError) as error:
    print(error)
    if conn is not None:
        conn.close()
        print('Database connection closed.')
    
    exit()

def bot(scheduler):
    scheduler.enter(60, 1, bot, (scheduler,))
    try:
        print("NEXT UPDATE ITERATION")
        # Open connection
        cur = conn.cursor()
        
        # Main api fetching and update logic here

        # Close connection
        cur.close()
    except(Exception, psycopg2.DatabaseError) as error:
        print("STOCK PRICE UPDATE FAILURE")
        print(error)
        if conn is not None:
            conn.close()
            print('Database connection closed.')
        
        exit()

my_scheduler = sched.scheduler(time.time, time.sleep)
my_scheduler.enter(60, 1, bot, (my_scheduler,))
my_scheduler.run()