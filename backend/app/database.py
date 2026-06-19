import mysql.connector

def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",   # XAMPP default
        database="spam_email_db"   # ✅ FIXED
    )