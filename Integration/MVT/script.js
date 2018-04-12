
function process(size, start, end) {
    count++;
    this.id=count;    
    this.size=size;
    this.start=start;
    this.end=end;
}

var memory=[];
var memsize=0;

var p=[]
var count=0;

addPartition();
p.push(new process(30,-1,-1));
p.push(new process(40,-1,-1));
p.push(new process(10,-1,-1));
p.push(new process(10,-1,-1));
p.push(new process(40,-1,-1));




$(document).ready(function(){
    
    $("#example-table").tabulator({
        height:205, // set height of table (in CSS or here), this enables the Virtual DOM and improves render speed dramatically (can be any valid css height value)
        layout:"fitColumns", //fit columns to width of table (optional)
        columns:[ //Define Table Columns
            {title:"Process ID", field:"id", width:130},
            {title:"Relative", field:"size", formatter:"progress"},
            {title:"Size", field:"size"},                                    
            {title:"Start", field:"start", align:"left"},            
            {title:"End", field:"end"},
        ],
        rowClick:function(e, row){ //trigger an alert message when the row is clicked
            alert("Row " + row.getData().id + " Clicked!");
        },
    });
    //load sample data into the table
    $("#example-table").tabulator("setData", p);
 });


function addPartition()
{
    //memsize = document.getElementById("partition").value;
    memsize = 100;
    
    console.log(memsize)
    if(isNaN(memsize)){
        alert("Invalid Input!","danger");
        console.log("Invalid Input");
        return;
    }
    memsize=parseInt(memsize);
    document.getElementById('partition').value='';

    console.log("Memory Space "+memsize+" created");
    alert("Memory Space: "+memsize+" Set!","success");
    for(i=0;i<memsize;i++)
        {
            memory.push(0);
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
    document.getElementById('process').value='';
    p.push(new process(size,-1,-1));
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

function swapalert(id, size)
    {
        document.getElementById("swap-alert").innerText="Swapped Process "+id+" Size: "+size;
        document.getElementById('swap-alert').style.display= "block";
        setInterval(function(){document.getElementById('swap-alert').style.display="none",document.getElementById('swap-alert').innerHTML= '';  },2000);
        
    }
function alert(string,type)
    {
        console.log("alert alert-"+type);
        document.getElementById('alertpa').className = "alert alert-"+type;
        document.getElementById('alertpa').innerHTML= string;     
        document.getElementById('alertpa').style.display= "block";
        setInterval(function(){document.getElementById('alertpa').style.display="none",document.getElementById('alertpa').innerHTML= '';  },3000);
           
    }

function holefind(size)
    {
        var i;
        var flag=0;
        var hole=0;     
        for(i=0;i<memsize;i++)
            {   
                if(memory[i]!=0)
                    continue;
                console.log(memory[i]);
                var start=i;
                while(memory[i]==0 && i<memsize)
                    {
                        hole++;
                        i++;
                        if (hole>=size)
                            return start;
                    }

            }
        return -1;
    }


    function holefind_best(size)
    {
        var i;
        var flag=0;
        var best=-1;
        var hole=0;     
        for(i=0;i<memsize;i++)
            {   
                if(memory[i]!=0)
                    continue;
                console.log(memory[i]);
                var start=i;
                while(memory[i]==0 )
                    {
                        hole++;
                        i++;
                        console.log("i:"+i);
                        if(i>memsize)
                            break;
                    }
                    console.log("Start"+start);
                    if (hole>=size)
                        {
                            if(best==-1)
                                {
                                    best=start;
                                    return best;
                                }
                            else
                                {
                                    if(best>hole)
                                        {
                                            best=start;
                                            console.log("Best"+ best);
                                            return best;
                                        }
                                }
                        }

            }
        return -1;
    }


    function holefind_worst(size)
    {
        var i;
        var flag=0;
        var best=-1;
        var hole=0;     
        for(i=0;i<memsize;i++)
            {   
                if(memory[i]!=0)
                    continue;
                console.log(memory[i]);
                var start=i;
                while(memory[i]==0 )
                    {
                        hole++;
                        i++;
                        console.log("i:"+i);
                        if(i>memsize)
                            break;
                    }
                    console.log("Start"+start);
                    if (hole>=size)
                        {
                            if(best==-1)
                                {
                                    best=start;
                                    return best;
                                }
                            else
                                {
                                    if(best<hole)
                                        {
                                            best=start;
                                            console.log("Worst"+ best);
                                            return best;
                                        }
                                }
                        }

            }
        return -1;
    }
function memfill(start, end, pid)
    {
        for(i=start; i<end;i++)
            {
                memory[i]=pid;
            }
    }
function flush()
    {
        for (i in p)
            {
                p[i].start=-1;
                p[i].end=-1;
            }
        
        for (x in memory)
            memory[x]=0;
    }
function allocate()
{
    flush();
    console.log("Allocation");
    var i;
    outerloop:
    for(i=0;i<p.length;i++)
        {
            console.log(i);
            if( p[i].start!=-1)
                continue;
            console.log("Process: "+i+" Size: "+p[i].size);
            var choice=document.getElementById('choice').value;
            if(choice=="First")
            var start=holefind(p[i].size);

            else if (choice=="Best")
            var start=holefind_best(p[i].size);
            else if (choice=="Worst")
            var start=holefind_worst(p[i].size);
            
            if(start!=-1)
                {
                    p[i].start=start;
                    p[i].end=start+p[i].size;
                    memfill(p[i].start,p[i].end,i+1);
                }

            else {
                console.log("Process: "+i+" Size: "+p[i].size+" could not be allocated");
                allocalert(p[i].size);
            }
            console.log(i);
            
        }

    $("#example-table").tabulator("setData", p);

}

function memfree(start, end)
    {
        var i;
        for(i=start;i<end;i++)
            {
                memory[i]=0;
            }
    }
function swap()
    {
        var id=document.getElementById("swapprocess").value;
        console.log("swap "+id);
        id=parseInt(id)-1;
        swapalert(id,p[id].size);
        memfree(p[id].start, p[id].end);
        p.splice(id, 1);
        $("#example-table").tabulator("setData", p);
    }


