import websockets
import asyncio

protectedtxt = "This is a piece of text."
rc = 0
ra_to_client = dict()
mutex = asyncio.Semaphore(value=1)
datalock = asyncio.Semaphore(value=1)
i = 0
class client:

    def __init__(self, i, websocket):
        self.number = i
        self.status = 0 #0 for connected, 1 for reader, 2 for writer
        self.websocket = websocket
        self.alive = True


async def readop():
    global rc
    global protectedtxt
    global datalock
    global mutex
    await mutex.acquire()
    rc += 1
    if(rc == 1):
        await datalock.acquire()
    mutex.release()


    print("Reading message.")
    ret = protectedtxt
    await asyncio.sleep(5)
    print("Read done: "+ret)
    await mutex.acquire()
    rc -= 1
    if(rc == 0):
        datalock.release()
    mutex.release()

    return ret

async def writeop(message):
    global protectedtxt
    global datalock
    await datalock.acquire()
    print("Writing message")
    await asyncio.sleep(5)
    protectedtxt = message

    print("Wrote: "+protectedtxt)
    datalock.release()



async def incoming(websocket, message):
    pass

async def handleproduce(client):
    pass

async def handler(websocket, path):
    global i
    ra = websocket.remote_address
    i += 1

    c = client(i, websocket)
    ra_to_client[ra] = c
    #producer_task = asyncio.ensure_future(handleproduce())
    consumer_task = asyncio.ensure_future(websocket.recv())
    while c.alive:
        done,pending = await asyncio.wait(
            [consumer_task],
            return_when=asyncio.FIRST_COMPLETED
        )

        #if producer_task in done:
         #   pass

        if consumer_task in done:
            message = consumer_task.result()
            if message is None:
                c.alive = False
            elif message == "read":
                txt = await readop()
                print(txt)
                await websocket.send(txt)
                consumer_task = asyncio.ensure_future(websocket.recv())
            else:
                #print(message)
                if len(message)>6 and message[:6] == "write:":
                    await writeop(message[6:])
                    await websocket.send("Message written")
                    consumer_task = asyncio.ensure_future(websocket.recv())

start_server = websockets.serve(handler, 'localhost', 8890)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()


