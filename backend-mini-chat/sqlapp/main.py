from typing import List

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/message/", response_model=schemas.Message)
def create_message(
    message: schemas.MessageCreate, db: Session = Depends(get_db)
):
    return crud.create_message(db=db, message=message)


@app.get("/messages/", response_model=List[schemas.Message])
def read_messages(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_messages(db, skip=skip, limit=limit)
    return items
