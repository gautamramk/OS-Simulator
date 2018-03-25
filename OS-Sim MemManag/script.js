
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
    $("#example-table").tabulator("setData", p);
    stack();
    
}



function newBlock(id,size){
console.log('Adding block');
colour=randomColor({hue: 'blue', count: 1});
console.log(colour);
stylestring = "background:"+colour+"; height: "+size+"px";
var newNode = document.createElement('div');
//newNode.textContent = id;

var att = document.createAttribute("class");       // Create a "class" attribute
att.value = "mem-block";
newNode.setAttributeNode(att);   

var att = document.createAttribute("style");        // creating style attrubute
att.value= stylestring
newNode.setAttributeNode(att);

console.log(newNode.getAttribute("style"));
document.getElementById('memstack').appendChild(newNode);

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
    stack();
    manualstack();   

}

function swap()
    {
        var id=document.getElementById("swapprocess").value;
        console.log("swap "+id);
        id=parseInt(id);
        swapalert(id,process[id].size)        
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
        stack();
        manualstack();
    }


    function chartify()
        {
            var d=[];
            for (x in p)
                {
                    if(p[x].process==-1)
                        {                    
                        d.push({type:"stackedColumn", legendText: "FreeSpace" ,showInLegend: "true", dataPoints: [{ y: p[x].size, label: "Space"}]})
                        continue;   
                        }
                    var fragment;
                    if (p[x].fragment==-1)
                        fragment=0;
                    else
                        fragment=p[x].fragment;
                    var string="Process "+p[x].process;
                    var frag="Fragment "+x;
                    d.push({type:"stackedColumn", legendText: string ,showInLegend: "true", dataPoints: [{ y: p[x].size-fragment, label: string}]})
                    d.push({type:"stackedColumn", legendText: frag ,showInLegend: "true", dataPoints: [{ y: fragment, label: "Fragment"}]})                
                    
                }
            
                return d;
        }


    function stack () {
        var chart = new CanvasJS.Chart("chartContainer",
        {
            title:{
                text: ""
            },
            axisY:{
                title:"Memory Size",
            },
            data: chartify()
        });
        chart.render();
    }

    function manualstack()  {
        for (x in p)
            {
                console.log(p);
                frag=p[x].fragment;
                if(frag==-1) frag=0;
                newBlock(p[x].process,p[x].size-frag);
                if(frag!=0)
                    newBlock("Fragment",frag);
            }
    }
