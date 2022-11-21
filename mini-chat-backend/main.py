from typing import List

from fastapi import Depends, FastAPI
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from crud import get_messages, create_message, crud_delete_message, crud_delete_all_messages
from models import Base
from schemas import Message, MessageCreate
from database import SessionLocal, engine
from socket_server import socket_manager

Base.metadata.create_all(bind=engine)

app = FastAPI()

socket_manager.mount_to("/ws", app)

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
    "https://s71hn7.deta.dev",  # задеплоил в апп облако, но пока не успел настроить интеграцию с сокетакми
    "http://s71hn7.deta.dev"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/message/", response_model=Message)
def create_message_post(
        message: MessageCreate, db: Session = Depends(get_db)
):
    return create_message(db=db, message=message)


@app.get("/messages/", response_model=List[Message])
def read_messages(skip: int = 0, limit: int = 300, db: Session = Depends(get_db)):
    items = get_messages(db, skip=skip, limit=limit)
    return items


@app.delete("/messages/")
def delete_messages(db: Session = Depends(get_db), message_id: int = None):
    return crud_delete_message(db=db, id=message_id)


@app.delete("/all_messages/")
def delete_all_messages(db: Session = Depends(get_db)):
    return crud_delete_all_messages(db=db)

@app.get("/")
async def redirect_typer():
    return RedirectResponse("/docs")