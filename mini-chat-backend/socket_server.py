import collections
import json
import socketio
import sqlite3


def create_connection():
    conn = None
    try:
        conn = sqlite3.connect('sql_app.db')
    except e as e:
        print(e)

    return conn

# def delete_all_tasks(conn):
#     """
#     Delete all rows in the tasks table
#     :param conn: Connection to the SQLite database
#     :return:
#     """
#     sql = 'DELETE FROM messages'
#     cur = conn.cursor()
#     cur.execute(sql)
#     conn.commit()

# delete_all_tasks(create_connection())


def insertVaribleIntoTable(userFrom, text, sqliteConnection):
    try:
        cursor = sqliteConnection.cursor()

        sqlite_insert_with_param = """INSERT INTO messages
                          (userFrom, text) 
                          VALUES (?, ?);"""

        data_tuple = (userFrom, text)
        cursor.execute(sqlite_insert_with_param, data_tuple)
        sqliteConnection.commit()
        cursor.close()

    except sqlite3.Error as error:
        print("Failed to insert Python variable into sqlite table", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()


def select_all_messages(conn):
    cur = conn.cursor()
    cur.execute("SELECT * FROM messages")

    rows = cur.fetchall()
    message_list = []

    for row in rows:
        d = collections.OrderedDict()
        d["userFrom"] = row[1]
        d["text"] = row[2]
        message_list.append(d)

    json_messages = json.dumps(message_list)
        
    return json_messages
    

def get_messages():
    con = create_connection()
    return select_all_messages(con)


class SocketManager:
    def __init__(self):
        self.server = socketio.AsyncServer(
            cors_allowed_origins=[],
            async_mode="asgi",
        )
        self.app = socketio.ASGIApp(self.server)

    @property
    def on(self):
        return self.server.on

    @property
    def send(self):
        return self.server.send

    def mount_to(self, path: str, app: socketio.ASGIApp):
        app.mount(path, self.app)


def handle_connect(socket, environd):
    print(f"connect ${socket}")



async def handle_new_message(sid, data):
    con = create_connection()
    insertVaribleIntoTable(data['userFrom'], data['text'], sqliteConnection=con)
    await socket_manager.send(data=get_messages())

async def cleaned():
    await socket_manager.send(data=get_messages())


socket_manager = SocketManager()
socket_manager.on("connect", handler=handle_connect)
socket_manager.on("new_message", handler=handle_new_message)
