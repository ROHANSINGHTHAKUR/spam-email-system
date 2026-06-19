from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password: str


class EmailCreate(BaseModel):
    user_id: int
    subject: str
    body: str