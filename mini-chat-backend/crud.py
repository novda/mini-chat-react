from sqlalchemy.orm import Session

from models import Message
from schemas import MessageCreate


def get_messages(db: Session, skip: int = 0, limit: int = 200):
    return db.query(Message).offset(skip).limit(limit).all()


def create_message(db: Session, message: MessageCreate):
    db_message = Message(**message.dict())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message
