
	var logical = [0,0,0,0,0,0,0,0,0,0];
	var framet = [0,0,0,0,0];
	var lastused = [-1,-1,-1,-1,-1];
	var pagetable = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
	function inputVirtual(){
		var vtable = document.getElementById("vtable");
		var numrows = vtable.rows.length;

		for(var i = 1;i<numrows;i++){
			logical[i-1] = parseInt(vtable.rows[i].cells[1].getElementsByTagName("input")[0].value);
		}
	}
	function checkTable(page){
		return pagetable[page];
	}
	function fifoget(){
		for(var i=0;i<framet.length;i++){
			lastused[i]++;
			if(lastused[i] == 0){
				return i;
			}

		}
		var maxind = 0;
		for(var i=0;i<framet.length;i++){
			if(lastused[i]>lastused[maxind]){
				maxind=i;
			}
		}
		return maxind;
	}
	function modPageTable(repFrame){
		for(var i=0;i<pagetable.length;i++){
			if(pagetable[i] == repFrame){
				pagetable[i] = -1;
			}
		}
	}
	function fifo(){
		var seq = document.getElementById("sequence").value.split(" ")
		for(i=0;i<seq.length;i++){
			var val = parseInt(seq[i]);
			var pos = checkTable(val);
			if(pos>-1){
				alert("Page hit. In frame " + pos);
			}else{

				var newframe = fifoget();
				alert("Page Fault. Eliminate "+newframe);
				modPageTable(newframe)
				pagetable[val] = newframe;
				lastused[newframe] = 0;
				framet[newframe] = logical[val];
			}
		}

		for(var i=0;i<framet.length;i++){
			document.getElementById("r").rows[i+1].cells[1].innerHTML = "";
		}
		for(var i=0;i<pagetable.length;i++){
			document.getElementById("f").rows[i+1].cells[1].innerHTML = pagetable[i];
			if(pagetable[i]>-1){
				document.getElementById("r").rows[pagetable[i]+1].cells[1].innerHTML = logical[i];
			}
		}
	}
