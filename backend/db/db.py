import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import os


try:
    load_dotenv()
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password= os.getenv("DB_PASSWORD"),
        database="anmeldetoolmarketplace",
        port=3305
    )

    if conn.is_connected():
        print("Verbindung zu MySQL erfolgreich")

except Error as e:
    print("Fehler bei der Verbindung:", e)