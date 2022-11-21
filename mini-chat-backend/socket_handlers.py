from main import app


@app.sio.on('connect')
async def handle_join(socket):
    await app.sio.emit('lobby', f'User joined ${socket.id}')


@app.sio.on('message')
async def handle_connect(sid, *args, **kwargs):
    print('message')