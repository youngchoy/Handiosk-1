import socketio

sio = socketio.AsyncServer(async_mode='tornado')
app = tornado.web.Application(
    [
        (r"/socket.io/", socketio.get_tornado_handler(sio)),
    ],
    # ... other application options
)

@sio.event
def connect(sid, environ):
    print(sio, 'connected')

@sio.event
def disconnect(sid):
    print(sio, 'disconnected')

app.listen(5000)
tornado.ioloop.IOLoop.current().start()
