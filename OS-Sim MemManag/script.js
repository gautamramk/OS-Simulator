
function parition(size, process, fragment) {
    this.size=size;
    this.process=process;
    this.fragment=fragment;
}

var p=[]
var process=[];

p.push(new parition(30,-1,-1));
p.push(new parition(20,-1,-1));
p.push(new parition(40,-1,-1));
p.push(new parition(60,-1,-1));

process.push({size: 30});
process.push({size: 10});
process.push({size: 40});
process.push({size: 50});


function flush()
{
    for (i=0;i<p.length;i++)
        {
            p[i].process=-1;
            p[i].fragment=-1;
        }
}

function addPartition()
{
    var size = document.getElementById("partition").value;
    console.log(size);
    p.push(new parition(size,-1,-1));
    console.log("New Partition size "+size+" created");
}

function addProcess()
{
    var x = document.getElementById("process").value;
    console.log(x);
    process.push({
        size: x,
    })
    console.log("New Process size "+x+" created");
}

function allocate()
{
    flush();
    console.log("Sorting Partitions");
    p.sort(function(a, b){return a.size - b.size});

    for (i=0; i<p.length; i++)
        {
            console.log(p[i].size);
        }

    for(i=0;i<process.length;i++)
        {
            console.log("Process: "+i+" Size: "+process[i].size);
            for(j=0;j<p.length;j++)
                {
                    if (p[j].process != -1)
                        continue;
                    if (process[i].size <= p[j].size)
                        {
                            console.log("Allocated to Partition: "+j+" Size: "+p[j].size );
                            p[j].process=i;
                            p[j].fragment=p[j].size-process[i].size;
                            break;
                        }
                    }
            console.log("Process: "+i+" Size: "+process[i].size+" could not be allocated");
        }
}

