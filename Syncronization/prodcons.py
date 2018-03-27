import websockets
import asyncio


i = 0
ra_to_client = dict()

emptycount = asyncio.Semaphore(6)
fullcount = asyncio.Semaphore(0)
mutex = asyncio.Semaphore(1)

class q:
    def __init__(self, size):
        self.max_size = size
        self.queue = list()
        self.start = -1
        self.end = -1

    def enqueue(self,ele):
        if (self.end+1)%self.size != self.start:
            self.end += 1
            self.queue[self.end] = ele
    def dequeue(self):
        if self.start != -1:
            ret = self.queue[self.start]
            start = (self.start + 1)%self.size
            if self.start == self.end:
                self.start = -1
                self.end = -1
            return ret

queue = q(6)

class client:

    def __init__(self, i, websocket):
        self.number = i
        self.status = 0 #0 for connected, 1 for reader, 2 for writer
        self.websocket = websocket
        self.alive = True


async def produce():
    await emptycount.acquire()
    await mutex.acquire()
    queue.enqueue(1)
    mutex.release()
    fullcount.release()

async def consume():
    await fullcount.acquire()
    await mutex.acquire()
    queue.dequeue()
    mutex.release()
    emptycount.release()





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


start_server = websockets.serve(handler, 'localhost', 8888)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()


