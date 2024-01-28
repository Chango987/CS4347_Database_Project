import psycopg2
import os
import dotenv

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

    cur.execute('SELECT * FROM users_user')
    result = cur.fetchall()
    print(result)

    # close the communication with the PostgreSQL
    cur.close()

except (Exception, psycopg2.DatabaseError) as error:
        print(error)
finally:
    if conn is not None:
        conn.close()
        print('Database connection closed.')

