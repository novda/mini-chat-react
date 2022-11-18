from sqlalchemy.orm import Session

from . import models, schemas


def get_messages(db: Session, skip: int = 0, limit: int = 200):
    return db.query(models.Message).offset(skip).limit(limit).all()


def create_message(db: Session, message: schemas.MessageCreate):
    db_item = models.Message(**message.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
