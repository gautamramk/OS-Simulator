var input = document.getElementById("start");
var btn = document.getElementById("btnGo");
var needle = document.getElementById("needle");

// Set up click event handler
btn.addEventListener("click", start_animation_manual);

var needle_on;





// Storage for the previous angle
var lastAngle = "";

function start_animation_manual(){ 
  // Update the total angle needed
  console.log("last angle " +lastAngle);
  lastAngle = +lastAngle+ +input.value;
  
  // For testing:
  console.log("Current total angle: " + lastAngle);
  document.getElementById("disp").innerHTML=lastAngle;
  document.getElementById("disp").style.display="block"; 

  // Move the needle:
  needle.style.transform = "rotate(" + lastAngle + "deg)";
}


function start_animation(angle){ 
  // Update the total angle needed
  console.log("last angle" +lastAngle);
  lastAngle = +lastAngle+ +angle;
  
  // For testing:
  console.log("Current total angle: " + lastAngle); 
  document.getElementById("disp").innerHTML=lastAngle;
  document.getElementById("disp").style.display="block";   
  // Move the needle:
  needle.style.transform = "rotate(" + lastAngle + "deg)";


}

function display(newstring)
    {
        var schedule=document.getElementById("schedule");
        schedule.style.display="block";
        var string=document.getElementById("schedule").innerText;
        string=string+newstring+"\n";
        document.getElementById("schedule").innerText=string;
    }
function rotate(seek){ 
  // Update the total angle needed
  lastAngle = +lastAngle + seek;
  
  // For testing:
  console.clear()
  console.log("Current total angle: " + lastAngle);

  // Move the needle:
  needle.style.transform = "rotate(" + lastAngle + "deg)";
}



var cyllinder=[];

cyllinder.push(80);
cyllinder.push(30);

cyllinder.push(90);
cyllinder.push(10);

//cyllinder.push(160);
//cyllinder.push(280);

//cyllinder.push(60);




function addCyllinder()
    {
        var number=document.getElementById("cyllinder").value;
        console.log(number+ "added");
        var string=document.getElementById("list").innerText;
        string=string+"Cyllinder: "+number+"\n";
        document.getElementById("list").innerText=string;
        document.getElementById('list').style.display= "block";        
        cyllinder.push(number);
        document.getElementById("cyllinder").value='';
        alert("CYLLINDER "+number+" added","success");
    }


function alert(string,type)
    {
        console.log("alert alert-"+type);
        document.getElementById('alertpa').className = "alert alert-"+type;
        document.getElementById('alertpa').innerHTML= string;     
        document.getElementById('alertpa').style.display= "block";
        setInterval(function(){document.getElementById('alertpa').style.display="none",document.getElementById('alertpa').innerHTML= '';  },2000);
    }

    var queue;


    function time_trigger()
        {
            queue=cyllinder;
            var choice=document.getElementById('choice').value;
            if (choice="FCFS")
           needle_on=setInterval(function(){seek();  },2000);
           if (choice="SSTF")
           needle_on=setInterval(function(){sstf();  },2000);
           if (choice="SCAN")
           needle_on=setInterval(function(){scan();  },2000);
           if (choice="CSCAN")
           needle_on=setInterval(function(){cscan();  },2000);
           if (choice="LOOK")
           needle_on=setInterval(function(){look();  },2000);
           if (choice="CLOOK")
           needle_on=setInterval(function(){clook();  },2000);
            
        }
    function seek() 
    {
        if (queue.length==0)
            {
                console.log("No Cyllinder Request");
                clearTimeout(needle_on);
                return;
            }
        var cyl=queue.shift();
        console.log(cyl);
        var angle=cyl-lastAngle;
        var string="Rotated "+ angle+" deg to cyllinder: "+cyl;
        console.log("Rotated "+ angle+" deg to cyllinder: "+cyl);
        display(string);                
        start_animation(angle);
        

    }

    function sstf()
        {
            if (queue.length==0)
            {
                console.log("No Cyllinder Request");
                clearTimeout(needle_on);
                return;
            }

            var cyl=closest(lastAngle, cyllinder);
            console.log(cyl);
            var angle=cyl-lastAngle;
            cyllinder.splice(cyllinder.indexOf(cyl), 1);
            var string="Rotated "+ angle+" deg to cyllinder: "+cyl;
            console.log("Rotated "+ angle+" deg to cyllinder: "+cyl);
            display(string);               
            start_animation(angle);

        }

        function closest (num, arr) {
            var curr = arr[0];
            var diff = Math.abs (num - curr);
            for (var val = 0; val < arr.length; val++) {
                var newdiff = Math.abs (num - arr[val]);
                if (newdiff < diff) {
                    diff = newdiff;
                    curr = arr[val];
                }
            }
            return curr;
        }

var dir=-1;
var index=-1;


function cscan()
{
    if (queue.length==0)
    {
        console.log("No Cyllinder Request");
        clearTimeout(needle_on);
        return;
    }

    if(dir==-1)
        {
            cyllinder.sort(function(a, b){return a - b});
            console.log(cyllinder);
            var cyl=closest(lastAngle, cyllinder);
            console.log(cyl);
            var angle=cyl-lastAngle;
            if(angle>0) {
                dir=1;
                cyllinder.push(360);
            }
            else{                            
            dir=0;
            cyllinder.unshift(0);
            } 


            console.log(cyllinder);
            index=cyllinder.indexOf(cyl);
            cyllinder.splice(index, 1);
            var string="Rotated "+ angle+" deg to cyllinder: "+cyl;
            console.log("Rotated "+ angle+" deg to cyllinder: "+cyl);
            display(string);    
            start_animation(angle);                        
                          
        }
    
    if(dir==1)
        {
            if(lastAngle==360)
            {
                var cyl=cyllinder[0];                
                lastAngle=0;
                angle=cyl-lastAngle;
                console.log("Check"+angle);
                index=cyllinder.indexOf(cyl);
                cyllinder.splice(index, 1);                        
                var string="Rotated "+ angle+" deg to cyllinder: "+cyl;
                console.log("Rotated "+ angle+" deg to cyllinder: "+cyl);
                display(string);                 
                start_animation(angle);

            }
            else{

                    var cyl=cyllinder[index];
                    console.log(cyl);
                    var angle=cyl-lastAngle;

                    if(angle>0) dir=1;
                    index=cyllinder.indexOf(cyl);
                    cyllinder.splice(index, 1);                        
                    var string="Rotated "+ angle+" deg to cyllinder: "+cyl;
                    console.log("Rotated "+ angle+" deg to cyllinder: "+cyl);
                    display(string);                 
                    start_animation(angle);

            }
                    
        }
    
        if(dir==0)
        {
            if(lastAngle==0)
            {
                var cyl=cyllinder[cyllinder.length];                
                lastAngle=0;
                angle=cyl-lastAngle;
                console.log("Check"+angle);
                index=cyllinder.indexOf(cyl);
                cyllinder.splice(index, 1);                        
                var string="Rotated "+ angle+" deg to cyllinder: "+cyl;
                console.log("Rotated "+ angle+" deg to cyllinder: "+cyl);
                display(string);                 
                start_animation(angle);

            }
            else{

                    var cyl=cyllinder[index];
                    console.log(cyl);
                    var angle=cyl-lastAngle;

                    if(angle>0) dir=1;
                    index=cyllinder.indexOf(cyl);
                    cyllinder.splice(index, 1);                        
                    var string="Rotated "+ angle+" deg to cyllinder: "+cyl;
                    console.log("Rotated "+ angle+" deg to cyllinder: "+cyl);
                    display(string);                 
                    start_animation(angle);
            }

        }
    
    



}


function cscan()
{
    if (queue.length==0)
    {
        console.log("No Cyllinder Request");
        clearTimeout(needle_on);
        return;
    }

    if(dir==-1)
        {
            cyllinder.sort(function(a, b){return a - b});
            console.log(cyllinder);
            var cyl=closest(lastAngle, cyllinder);
            console.log(cyl);
            var angle=cyl-lastAngle;
            if(angle>0) {
                dir=1;
                cyllinder.push(360);
            }
            else{                            
            dir=0;
            cyllinder.unshift(0);
            } 


            console.log(cyllinder);
            index=cyllinder.indexOf(cyl);
            cyllinder.splice(index, 1);
            var string="Rotated "+ angle+" deg to cyllinder: "+cyl;
            console.log("Rotated "+ angle+" deg to cyllinder: "+cyl);
            display(string);    
            start_animation(angle);                        
                          
        }
    
    if(dir==1)
        {
            if(lastAngle==360)
            {
                var cyl=cyllinder[0];                
                lastAngle=0;
                angle=cyl-lastAngle;
                console.log("Check"+angle);
                index=cyllinder.indexOf(cyl);
                cyllinder.splice(index, 1);                        
                var string="Rotated "+ angle+" deg to cyllinder: "+cyl;
                console.log("Rotated "+ angle+" deg to cyllinder: "+cyl);
                display(string);                 
                start_animation(angle);

            }
            else{

                    var cyl=cyllinder[index];
                    console.log(cyl);
                    var angle=cyl-lastAngle;

                    if(angle>0) dir=1;
                    index=cyllinder.indexOf(cyl);
                    cyllinder.splice(index, 1);                        
                    var string="Rotated "+ angle+" deg to cyllinder: "+cyl;
                    console.log("Rotated "+ angle+" deg to cyllinder: "+cyl);
                    display(string);                 
                    start_animation(angle);

            }
                    
        }
    
        if(dir==0)
        {
            if(lastAngle==0)
            {
                var cyl=cyllinder[cyllinder.length];                
                lastAngle=0;
                angle=cyl-lastAngle;
                console.log("Check"+angle);
                index=cyllinder.indexOf(cyl);
                cyllinder.splice(index, 1);                        
                var string="Rotated "+ angle+" deg to cyllinder: "+cyl;
                console.log("Rotated "+ angle+" deg to cyllinder: "+cyl);
                display(string);                 
                start_animation(angle);

            }
            else{

                    var cyl=cyllinder[index];
                    console.log(cyl);
                    var angle=cyl-lastAngle;

                    if(angle>0) dir=1;
                    index=cyllinder.indexOf(cyl);
                    cyllinder.splice(index, 1);                        
                    var string="Rotated "+ angle+" deg to cyllinder: "+cyl;
                    console.log("Rotated "+ angle+" deg to cyllinder: "+cyl);
                    display(string);                 
                    start_animation(angle);
            }

        }
    
    



}


        function scan()
            {
                if (queue.length==0)
                {
                    console.log("No Cyllinder Request");
                    clearTimeout(needle_on);
                    return;
                }

                if(dir==-1)
                    {
                        cyllinder.sort(function(a, b){return a - b});
                        console.log(cyllinder);
                        var cyl=closest(lastAngle, cyllinder);
                        console.log(cyl);
                        var angle=cyl-lastAngle;
                        if(angle>0) {
                            dir=1;
                        }
                        else{                            
                        dir=0;
                        } 


                        console.log(cyllinder);
                        index=cyllinder.indexOf(cyl);
                        cyllinder.splice(index, 1);
                        var string="Rotated "+ angle+" deg to cyllinder: "+cyl;
                        console.log("Rotated "+ angle+" deg to cyllinder: "+cyl);
                        display(string);      
                        start_animation(angle);                        
                                      
                    }
                
                if(dir==1)
                    {
                                var cyl=cyllinder[index];
                                console.log(cyl);
                                var angle=cyl-lastAngle;
                                if(angle>0) dir=1;
                                index=cyllinder.indexOf(cyl);
                                cyllinder.splice(index, 1);                        
                                var string="Rotated "+ angle+" deg to cyllinder: "+cyl;
                                console.log("Rotated "+ angle+" deg to cyllinder: "+cyl);
                                display(string);                
                                if(cyl==360) dir=0;
                                start_animation(angle);

                    }
                
                    if(dir==0)
                    {
                                var cyl=cyllinder[index-1];
                                console.log(cyl);
                                var angle=cyl-lastAngle;
                                if(angle>0) dir=1;
                                index=cyllinder.indexOf(cyl);
                                cyllinder.splice(index, 1);                        
                                var string="Rotated "+ angle+" deg to cyllinder: "+cyl;
                                console.log("Rotated "+ angle+" deg to cyllinder: "+cyl);
                                display(string);                           
                                if(cyl==0) dir=1;
                                start_animation(angle);

                    }
                
                



            }



            function look()
            {
                if (queue.length==0)
                {
                    console.log("No Cyllinder Request");
                    clearTimeout(needle_on);
                    return;
                }

                if(dir==-1)
                    {
                        cyllinder.sort(function(a, b){return a - b});
                        console.log(cyllinder);
                        var cyl=closest(lastAngle, cyllinder);
                        console.log(cyl);
                        var angle=cyl-lastAngle;
                        start_animation(angle);                        
                        if(angle>0) {
                            dir=1;
                        }
                        else{                            
                        dir=0;
                        } 

                        index=cyllinder.indexOf(cyl);
                        cyllinder.splice(index, 1);
                        var string="Rotated "+ angle+" deg to cyllinder: "+cyl;
                        console.log("Rotated "+ angle+" deg to cyllinder: "+cyl);
                        display(string);             
                    }
                
                if(dir==1)
                    {
                                var cyl=cyllinder[index];
                                console.log(cyl);
                                var angle=cyl-lastAngle;
                                if(angle>0) dir=1;
                                index=cyllinder.indexOf(cyl);
                                cyllinder.splice(index, 1);                        
                                var string="Rotated "+ angle+" deg to cyllinder: "+cyl;
                                console.log("Rotated "+ angle+" deg to cyllinder: "+cyl);
                                display(string);                         
                                if(cyl==360) dir=0;
                                start_animation(angle);

                    }
                
                    if(dir==0)
                    {
                                var cyl=cyllinder[index-1];
                                console.log(cyl);
                                var angle=cyl-lastAngle;
                                if(angle>0) dir=1;
                                index=cyllinder.indexOf(cyl);
                                cyllinder.splice(index, 1);                        
                                var string="Rotated "+ angle+" deg to cyllinder: "+cyl;
                                console.log("Rotated "+ angle+" deg to cyllinder: "+cyl);
                                display(string);                      
                                if(cyl==0) dir=1;
                                start_animation(angle);

                    }
                
                



            }
            

    /*
function seek()
    {
        var angle;
        for (i=0;i<cyllinder.length;)
            {
                console.log(cyllinder[i]);
                angle=cyllinder[i]-lastAngle;
                console.log("Rotated "+ angle+" deg to cyllinder: "+cyllinder[i]);                
                start_animation(angle);
               
            }
    }
        */