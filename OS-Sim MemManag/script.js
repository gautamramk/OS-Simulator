
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
    if(isNaN(size)){
        alert("Invalid Input!","danger");
        console.log("Invalid Input");
        return;
    }
    size=parseInt(size);
    document.getElementById('partition').value='';
    p.push(new parition(size,-1,-1));
    console.log("New Partition size "+size+" created");
    alert("Partition of size "+size+" Added!","success");     
    
}

function display()
    {
        for(x in parition)
            {
                c
            }
    }

function addProcess()
{
    var size = document.getElementById("process").value;
    if(isNaN(size)){
        alert("Invalid Input!","danger");
        console.log("Invalid Input");
        return;
    }
    size=parseInt(size);    
    document.getElementById('partition').value='';
    process.push({size: size,})
    console.log("New Process size "+size+" created");
    alert("Process of size "+size+" Added!","success");

}

function allocalert(size)
    {
        var string=document.getElementById("alloc-alert").innerText;        
        document.getElementById('alloc-alert').style.display= "block";
        document.getElementById("alloc-alert").innerText=string+"Cannot allocate process of size: "+size+"\n";
        setInterval(function(){document.getElementById('alloc-alert').style.display="none",document.getElementById('alloc-alert').innerHTML= '';  },2000);
        
    }
function alert(string,type)
    {
        console.log("alert alert-"+type);
        document.getElementById('alertpa').className = "alert alert-"+type;
        document.getElementById('alertpa').innerHTML= string;     
        document.getElementById('alertpa').style.display= "block";
        setInterval(function(){document.getElementById('alertpa').style.display="none",document.getElementById('alertpa').innerHTML= '';  },3000);
           
    }


function allocate()
{
    flush();
    console.log("Sorting Partitions");
    p.sort(function(a, b){return a.size - b.size});

    outerloop:
    for(i=0;i<process.length;i++)
        {
            console.log("Process: "+i+" Size: "+process[i].size);
            for(j=0;j<p.length;j++)
                {
                    console.log("Checking partition of size "+ p[j].size)
                    if (p[j].process != -1)
                        continue;
                    if (process[i].size <= p[j].size)
                        {
                            console.log("Allocated to Partition: "+j+" Size: "+p[j].size );
                            p[j].process=i;
                            p[j].fragment=p[j].size-process[i].size;
                            continue outerloop;
                        }
                }
            
            console.log("Process: "+i+" Size: "+process[i].size+" could not be allocated");     
            allocalert(process[i].size)
        }

        myTable();
        
}


//    for(x in p)
  //  table.row.add(p[x] );
    //table.draw();


function myTable(){
    var table = $('#allocation-table').DataTable({
        data:p,
        columns: [
            { title:"Size", data: null, render: 'size' },            
            { title:"Process Allocated", data: null, render: 'process' },
            { title:"Internal Fragmentation", data: null, render: 'fragment' }
        ]
    })

};

