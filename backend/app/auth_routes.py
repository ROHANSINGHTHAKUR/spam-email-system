from fastapi import APIRouter, HTTPException
from app.auth import hash_password, verify_password, create_token
from app.database import get_connection

router = APIRouter()

@router.post("/register")
def register(user: dict):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM users WHERE email=%s", (user["email"],))
    if cursor.fetchone():
        raise HTTPException(status_code=400, detail="User already exists")

    hashed = hash_password(user["password"])

    cursor.execute(
        "INSERT INTO users (email, password) VALUES (%s, %s)",
        (user["email"], hashed),
    )
    conn.commit()

    return {"message": "User registered successfully"}


@router.post("/login")
def login(user: dict):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT * FROM users WHERE email=%s", (user["email"],))
    db_user = cursor.fetchone()

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(user["password"], db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_token({"user": user["email"]})

    return {"access_token": token, "token_type": "bearer"}