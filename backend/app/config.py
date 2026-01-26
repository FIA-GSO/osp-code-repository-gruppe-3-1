import os

class Config:
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://user:pass@localhost/dbname"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
