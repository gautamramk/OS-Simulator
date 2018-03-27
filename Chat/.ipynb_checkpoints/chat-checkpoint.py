import asyncio
import websockets


ws_to_client = dict()


def handler(ws, path):
    ra = ws.remote_address
    name = ws.recv()
    ws_to_client[ws] = name

    listen_task = asyncio.ensure_future(ws.recv())
    while True:
        done, pending = asyncio.wait([listen_task],return_when=asyncio.FIRST_COMPLETED)
        if listen_task in done:
            message = listen_task.result()
            if message is not None:
                sender = ws_to_client[ws]
                tosend = sender+": "+message
                for key in ws_to_client:
                    print(key)
                    await key.send(tosend)

                    
start_server = websockets.serve(handler, 'localhost', 8889)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_for_forever()
