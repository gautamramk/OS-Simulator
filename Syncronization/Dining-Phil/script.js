
var fork=[0,0,0,0,0];
var philosopher=[0,0,0,0,0];
lineCount=0;

eaters=[];

function next(c)
{
    if(c<4)
        return c+1;
    else
        return 0;
}

function prev(c)
{
    if(c>0)
        return c-1;
    else
        return 4;
}

function setHunger(p)
    {
        philosopher[p]=1;
        document.getElementById(p.toString()).setAttribute("class","hungry");
        document.getElementById(p.toString()).innerHTML="Hungry";                            
        dine();
    }

function dine(){


        for(i=0;i<philosopher.length;i++)
            {
                if(philosopher[i]!=1)
                    continue;

                if (take_forks(i))
                {
                    console.log(i+" is eating");
                    document.getElementById(i.toString()).setAttribute("class","eating");
                    document.getElementById(i.toString()).innerHTML="Eating";                    
                    eaters.push(i);;
                    philosopher[i]=2;
                    setTimeout(function(){release_forks()}, 5000);
                }
            }
}


function release_forks()
    {
        
        p=eaters.shift();
        fork[p]=0;
        fork[next(p)]=0;
        console.log(p+" released forks");
        philosopher[p]=0;
        document.getElementById(p.toString()).setAttribute("class","sleep"); 
        document.getElementById(p.toString()).innerHTML="Thinking";                    
               
        
        dine();

    }



function take_forks(p)
    {
        if (fork[p]==0 && fork[(next(p))]==0)
            {
                fork[p]=1;
                fork[next(p)]=1;
                console.log(p+" has both forks");
                return 1;
            }

            console.log(p+" can't take forks");        
            return 0;

    }

$(function(){
   $('.sleep').click(function(){
    if($(this).attr('class') !="sleep")
        return;
    console.log($(this).attr('class'));
       id= $(this).attr('id');
       setHunger(id);
   });
});



