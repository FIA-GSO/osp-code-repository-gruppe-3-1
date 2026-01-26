from app import create_app
import pymysql
import os
from dotenv import load_dotenv;

load_dotenv()

app = create_app()

if __name__ == "__main__":
    print(f"{os.getenv('DB_USER')}",
        f"{os.getenv('DB_PASSWORD')}",
        f"{os.getenv('DB_NAME')}")

    app.run(debug=True)
