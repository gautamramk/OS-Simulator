var input = document.getElementById("angle");
var btn = document.getElementById("btnGo");
var needle = document.getElementById("needle");

// Set up click event handler
btn.addEventListener("click", start_animation);






// Storage for the previous angle
var lastAngle = "";

function start_animation(){ 
  // Update the total angle needed
  lastAngle = +lastAngle + +input.value;
  
  // For testing:
  console.clear()
  console.log("Current total angle: " + lastAngle);

  // Move the needle:
  needle.style.transform = "rotate(" + lastAngle + "deg)";
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