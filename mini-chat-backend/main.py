from typing import List
import os
import sys

from fastapi import Depends, FastAPI
from fastapi.responses import RedirectResponse
from fastapi.logger import logger
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from crud import get_messages, create_message, crud_delete_message, crud_delete_all_messages
from models import Base
from schemas import Message, MessageCreate
from database import SessionLocal, engine
from pydantic import BaseSettings
from socket_server import socket_manager

class Settings(BaseSettings):
    # ... The rest of our FastAPI settings

    BASE_URL = "http://localhost:8000"
    USE_NGROK = os.environ.get("USE_NGROK", "False") == "True"
settings = Settings()

def init_webhooks(base_url):
    # Update inbound traffic via APIs to use the public-facing ngrok URL
    pass

Base.metadata.create_all(bind=engine)

app = FastAPI()

if settings.USE_NGROK:
    # pyngrok should only ever be installed or initialized in a dev environment when this flag is set
    from pyngrok import ngrok

    # Get the dev server port (defaults to 8000 for Uvicorn, can be overridden with `--port`
    # when starting the server
    port = sys.argv[sys.argv.index("--port") + 1] if "--port" in sys.argv else 8000

    # Open a ngrok tunnel to the dev server
    public_url = ngrok.connect(port).public_url
    logger.info("ngrok tunnel \"{}\" -> \"http://127.0.0.1:{}\"".format(public_url, port))

    # Update any base URLs or webhooks to use the public ngrok URL
    settings.BASE_URL = public_url
    init_webhooks(public_url)

print(public_url)

socket_manager.mount_to("/ws", app)

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
    "https://s71hn7.deta.dev",
    "https://mini-chat-app-11.herokuapp.com",
    "http://a6b2-188-186-140-107.ngrok.io"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
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


