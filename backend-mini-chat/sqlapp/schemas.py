from typing import Union

from pydantic import BaseModel


class MessageBase(BaseModel):
    userFrom: str
    text: Union[str, None] = None


class MessageCreate(MessageBase):
    pass


class Message(MessageBase):
    id: int

    class Config:
        orm_mode = True

