from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True)
    password = Column(String(255))
    created_at = Column(TIMESTAMP, server_default=func.now())


class Email(Base):
    __tablename__ = "emails"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    subject = Column(String(255))
    body = Column(Text)
    prediction = Column(String(20))
    confidence = Column(Float)
    created_at = Column(TIMESTAMP, server_default=func.now())