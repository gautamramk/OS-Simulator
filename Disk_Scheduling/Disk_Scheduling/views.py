from django.shortcuts import render
import math
# Create your views here.

def fcfs(seq):
    return seq

def sstf(seq):
    ret = list()
    start = seq[0]
    seqlen = len(seq)
    ret.append(seq.pop(0))

    for i in range(seqlen-1):
        closest = 0
        for j in range(len(seq)):
            if abs(start - seq[j]) < abs(start - seq[closest]):
                closest = j
        start = seq.pop(closest)
        ret.append(start)

    return ret

def elevator(seq):
    maxind = 500

    ret = list()
    start = seq[0]
    if maxind not in seq:
        seq.append(maxind)
    if 0 not in seq:
        seq.append(0)

    #ret.append(seq.pop())
    for i in range(start,maxind):
        if i in seq:
            ret.append(seq.pop(seq.index(i)))

    for i in range(maxind, -1, -1):
        if i in seq:
            ret.append(seq.pop(seq.index(i)))

    return ret

def cscan(seq):
    maxind = 500

    ret = list()
    ret.append(list())
    ret.append(list())
    start = seq[0]
    #ret.append(start.pop())
    seq.sort()
    ret[0] = seq[seq.index(start):]
    ret[1] = seq[:seq.index(start)]
    if(maxind not in ret[0]):
        ret[0].append(maxind)
    if(0 not in ret[1]):
        ret[1].insert(0,0)

    return ret

def look(seq):
    maxind = 500

    ret = list()
    start = seq[0]
    # ret.append(seq.pop())
    for i in range(start, maxind):
        if i in seq:
            ret.append(seq.pop(seq.index(i)))

    for i in range(maxind, -1, -1):
        if i in seq:
            ret.append(seq.pop(seq.index(i)))

    return ret


print(look([50,64,32,100,5,128,106,45]))


