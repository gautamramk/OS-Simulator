
function parition(size, process, fragment) {
    count++;
    this.id=count;    
    this.size=size;
    this.process=process;
    this.fragment=fragment;
}

var p=[]
var process=[];
var count=0;

p.push(new parition(30,-1,-1));
p.push(new parition(20,-1,-1));
p.push(new parition(40,-1,-1));
p.push(new parition(60,-1,-1));

process.push({size: 30});
process.push({size: 10});
process.push({size: 40});
process.push({size: 50});


$(document).ready(function(){
    
    $("#example-table").tabulator({
        height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        layout:"fitColumns", //fit columns to width of table (optional)
        columns:[ //Define Table Columns
            {title:"Partition ID", field:"id", width:150},           
            {title:"Partition Size", field:"size", align:"left"},            
            {title:"Allocated Process ID", field:"process"},
            {title:"Internal Fragementation", field:"fragment", formatter:"progress"},
        ],
        rowClick:function(e, row){ //trigger an alert message when the row is clicked
            alert("Row " + row.getData().id + " Clicked!!!!");
        },
    });

    //load sample data into the table
    $("#example-table").tabulator("setData", p);

 });










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
            if( process[i]==-1)
                continue;
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

    $("#example-table").tabulator("setData", p);
        

}

function swap()
    {
        var id=$("#swapprocess").innerText;
        id=parseInt(id);
        for(x in p)
            {
                if (p[x].process==id)
                    {
                        console.log(x);
                        process[id]=-1;
                        p[x].process=-1;
                        p[x].fragment=-1;

                    }

            }
        $("#example-table").tabulator("setData", p);
        
    }


