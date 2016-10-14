/*
Conway's Game of Life (w D3.js)
http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
cgol.js

Creative Commons License Markup
<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
<img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" /></a><br />
<span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Text" property="dct:title" rel="dct:type">Conway's Game of Life implemented with D3.js</span> by 
<a xmlns:cc="http://creativecommons.org/ns#" href="http://mycrazydream.net/conway/" property="cc:attributionName" rel="cc:attributionURL">Brent Ransom</a> 
is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.<br />
Based on a work at <a xmlns:dct="http://purl.org/dc/terms/" href="http://www.conwaylife.com/" rel="dct:source">http://www.conwaylife.com/</a><a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/80x15.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Text" property="dct:title" rel="dct:type">Conway's Game of Life implemented with D3.js</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="http://mycrazydream.net/conway/" property="cc:attributionName" rel="cc:attributionURL">Brent Ransom</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.<br />Based on a work at <a xmlns:dct="http://purl.org/dc/terms/" href="http://www.conwaylife.com/" rel="dct:source">http://www.conwaylife.com/</a>.<br />
Permissions beyond the scope of this license may be available at <a xmlns:cc="http://creativecommons.org/ns#" href="https://d3js.org/" rel="cc:morePermissions">https://d3js.org/</a>.

Conway's Game of Life
Axiom 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
Axiom 2. Any live cell with two or three live neighbours lives on to the next generation.
Axiom 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
Axiom 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

TODO For all of the rules to function as intended, the game-board must be infinite. You will notice
that as some of the animations approach the edge of the gameboard some of the Conway's axiom's break down. That is because
I am only building 2D arrays as big as the board. I will have to find a happy medium between performance
(infinity isn't really an option) and display on the board. Perhaps XSCALE, YSCALE + 100?

Thinking about it reminds me of the problem of our observable universe which we see as so vast
is probably tiny in comparison to how far spacetime has expanded since the big-bang. This simple little
game is mind-blowing when you think about the implications. I recommend http://www.conwaylife.com/ if 
you want to see just how far people have run with these four simple axioms (like reproducing the digits of pi,
a working human cell, prime numbers, huge spaceships, etc)
*/

$(function() {

	function Life(args){
		var args 	= args || {},
			$ 		= args.$,
			that 	= this,
			C 		= {};
		
		/* Using D3 to handle the graphics on the client-side. Works particularly well for a 2D board
		since it is used for charts and the like. SVG

		int 	xscale 	Width of our box
		int 	yscale 	Height of our box
		string	div 	ID of the div container
		*/
		this.drawBoxes = function(xscale, yscale, div) {
	        var lblue 		= "stroke:#4e5d6c; fill: #5bc0de",
				black 		= "stroke:#4e5d6c; fill: #000000",
			    blue 		= "stroke:#4e5d6c; fill: #0000FF",
			    green 		= "stroke:#4e5d6c; fill: #5cb85c",
			    red 		= "stroke:#4e5d6c; fill: #FF0000",
				white 		= "stroke:#4e5d6c; fill: #FFFFFF",
				// total number of cells
				n			= xscale*yscale,
				// size of cell in pixels
				length 		= 10,
				// lines between the cells, for that grid look
		        whitespace 	= 2,
				width		= 10,
				height		= 10;
				
			C.ALIVECOLOR 	= green;
			C.DEADCOLOR		= white;

			/*partial boxes not applicable (yet) to CGOL
	        if ((n % 10) != 0) {
	          //ch += 10;
	        }*/
	        var rects = d3.select("#" + div).
	         append("svg:svg").
	         attr("width", xscale*length+xscale*2).
	         attr("height", yscale*length+yscale*2);
			
			var rIncrement = 0;
	        for (var y = 0; y < yscale; y++) {
	            for (var x = 0; x < xscale; x++) {
					//if we want to color the rows I was using this
					//caseTest = ((y+'').substr(0,(y+'').length-1))*1,
						
					rIncrement++;
	                rects.append("svg:rect").
	                  attr("x", x*length).
	                  attr("y", y*length).
	                  attr("height", height).
	                  attr("width", width).
	                  attr("style", C.DEADCOLOR).
					  attr("class", "rect r"+rIncrement+" x"+x+" y"+y);
					
					
					
	                n--;
	                if (n === 0) {
						// Update our 2D array value holder and the DOM
						$('#life .rect').click(function(e){
							var $el = $(this),
								x	= $el.attr("x")*1/10,
								y	= $el.attr("y")*1/10;
							if($el.val()*1===1){
								$el.attr("style", C.DEADCOLOR).val(0);
								that.cell(x, y, 0);
							} else {
								$el.attr("style", C.ALIVECOLOR).val(1);
								that.cell(x, y, 1);
							}
						});
						return;
	                }
	            }
	        }
	    }
		
		/* Nice conversion of python range fn
		Unfortunately it will only work in JS1.7
		
		int low		Bottom value of range
		int high 	Top value of range

		
		this.range = function(low, high) {  
		    return {
		        __iterator__: function() {
		            return {  
		                next: function() {
		                    if (low > high)
		                        throw StopIteration;  
		                    return low++;
		                }
		            }
		        }
		    }
		}
		*/
		
		/*
		More boring implementation :-b that works in a wider range of browsers
		int start Beginning of range
		int stop  (opt) End of range
		int step  (opt) Amount to step through range
		return array
		*/
		this.range = function(start, stop, step) {
		    if (typeof stop == 'undefined') {
		        // one param defined
		        stop = start;
		        start = 0;
		    }

		    if (typeof step == 'undefined') {
		        step = 1;
		    }

		    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
		        return [];
		    }

		    var result = [];
		    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
		        result.push(i);
		    }

		    return result;
		}
		
		/*
		int 	x	x coordinate on grid
		int 	y 	y coordinate on grid
		bool	return
		*/
		this.cellExists = function(x,y){
			var cellExists = false
			if(typeof(C.BOARD[x])!=="undefined" && typeof(C.BOARD[x][y])!=="undefined"){cellExists = true;}
			
			return cellExists;
		}
		
		/* Getter/setter
		
		int x Key of first list (row #)
		int y Key of second list (col #)
		int v Value to set the cell on the board
		*/
		this.cell = function(x,y,v,temp){
			if(typeof(v)==="number"){
				if(temp===true){
					C.TEMPBOARD[x][y] = v;
				} else {
					C.BOARD[x][y] = v;
				}
			} else {
				if(temp===true){
					return C.TEMPBOARD[x][y];
				} else {
					return C.BOARD[x][y];
				}
			}
		}
		
		/*
		Any live cell with fewer than two live neighbors dies, as if caused by under-population.
		
		list neighbors Is a list of values 0 or 1 of the eight surrounding neighbor cells
		*/
		this.axiomOne = function(liveNeighbors){
			return (liveNeighbors < 2) 
				? true 
				: false;
		}
		
		/*
		Any live cell with two or three live neighbors lives on to the next generation.

		list neighbors Is a list of values 0 or 1 of the eight surrounding neighbor cells
		*/
		this.axiomTwo = function(liveNeighbors){
			return (liveNeighbors === 2 || liveNeighbors === 3) 
				? true 
				: false;
		}
		
		/*
		Any live cell with more than three live neighbors dies, as if by overcrowding.

		list neighbors Is a list of values 0 or 1 of the eight surrounding neighbor cells
		*/
		this.axiomThree = function(liveNeighbors){
			return (liveNeighbors >= 3) 
				? true 
				: false;
		}
			
		/*
		Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.

		list neighbors Is a list of values 0 or 1 of the eight surrounding neighbor cells
		*/
		this.axiomFour = function(liveNeighbors){
			return (liveNeighbors === 3) 
				? true 
				: false;
		}
			
		/*
		Given a cell on the board, test its next generation according to the four axioms of Conway's Game of Life

		list 	neighbors 	Is a list of values 0 or 1 of the eight surrounding neighbor cells
		int 	cell 		Value of the cell we are testing, changes the axiom rule logic
		int		return 
		*/
		this.conwayAxioms = function(neighbors, cell){
			var nextGenCell = 0,
				liveNeighbors=0;
				
			for (var i in neighbors){
				if(neighbors[i]!==1 && neighbors[i]!==0){
					throw("Error in neighbors list, only values of 1 or 0 are allowed. Bad value: "+neighbors[i]);
				}
				liveNeighbors += neighbors[i];
			}
			
			if (cell===0){//dead cell
				if (that.axiomFour(liveNeighbors)){
					nextGenCell = 1;
				}
			} else if(cell===1){//live cell
				if (that.axiomOne(liveNeighbors)){
					nextGenCell = 0;
				} else if(that.axiomTwo(liveNeighbors)){
					nextGenCell = 1;
				} else if(that.axiomThree(liveNeighbors)){
					nextGenCell = 0;
				}
			}

			return nextGenCell;
		}
		
		/*
		Get the values of all the cells surrounding the cell in question. 
		The crux of the game, as it were.
		int x 			x coordinate
		int y			y coordinate
		int neighbor	0-7 the 8 neighbors arround the cell
		
		Our eight neighbors, with the CELL in the center
		|0|1|2|
		|7|C|3|
		|6|5|4|
		*/
		this.getNeighborValue = function(x,y,neighbor){
			var nValue 	= 0,
				nX		= 0,
				nY		= 0;

			neighbor*=1;
			switch(neighbor){
				case 0:
					nX = x-1;
					nY = y-1;
				break;
				case 1:
					nX = x;
					nY = y-1;
				break;
				case 2:
					nX = x+1;
					nY = y-1;
				break;
				case 3:
					nX = x+1;
					nY = y;
				break;
				case 4:
					nX = x+1;
					nY = y+1;
				break;
				case 5:
					nX = x;
					nY = y+1;
				break;
				case 6:
					nX = x-1;
					nY = y+1;
				break;
				case 7:
					nX = x-1;
					nY = y;
				break;
				default:
					throw("Error, cell cannot have more than 8 neighbors. Neighbor value choked on: "+neighbor);
			}
			
			nValue = (that.cellExists(nX, nY)) ? C.BOARD[nX][nY] : 0;
			
			return nValue;
		}
		
		/*
		Grab the neighbors of the cell defined by i,j and pass them on so that the cell can be tested according 
		to their values
		
		int x Key of first list (row #)
		int y Key of second list (col #)
		int r Individual cell marker used in dom class (never ended up using this...)
		*/
		this.testNeighbors = function(x,y,r){
			var cell = 0;
			if(C.XSCALE>=x && C.YSCALE>=y){
				cell = C.BOARD[x][y];
			}
			
			/*
			Our eight neighbors, with the CELL in the center
			|0|1|2|
			|7|C|3|
			|6|5|4|
			*/
			var neighbors = [0,0,0,0,0,0,0,0];
			for (var i in neighbors){
				neighbors[i] = that.getNeighborValue(x,y,i);
			}

			//Run through Conway algorithm
			var nextGenCell = that.conwayAxioms(neighbors,cell);
			
			//set new value
			that.cell(x,y,nextGenCell,true);
		}
		
		/*
		Translate our 2D array to graphics for the kids at home
		
		bool reset Reset the board, zero everything out and kill everything
		*/
		this.updateBoardDisplay = function(reset){
			for (var x in that.range(0, C.XSCALE)){
				for (var y in that.range(0, C.YSCALE)){
					if(reset===true){
						C.BOARD[x][y] = 0;
					} else {
						var v = C.BOARD[x][y];
						if(v===1){
							$(".x"+x+".y"+y).attr("style", C.ALIVECOLOR).val(1);
						} else {
							$(".x"+x+".y"+y).attr("style", C.DEADCOLOR).val(0);
						}
					}
				}
			}
			if(reset===true){
				that.endLife(reset);
				$("rect.rect").attr("style", C.DEADCOLOR).val(0);
			}
		}
		
		/*
		Run the board through all its tests/axioms for the generation
		
		BR - I changed my nesting style here simply because it was breaking the
		syntax highlighter on my blog and this fixed it, go figure
		*/
		this.testBoard = function()
		{
			var xRange 			= C.XSCALE,
				yRange 			= C.YSCALE,
				cellIncrement 	= 0,
				aliveCells		= 0;

			for (var x=0; x < xRange; x++)
			{
				for (var y=0; y < yRange; y++)
				{
					aliveCells += C.BOARD[x][y];
					that.testNeighbors(x, y, cellIncrement);
					cellIncrement++;
				}
			}
			if(aliveCells===0) that.endLife()
		}

		this.passAGeneration = function(){
			/*
			Recursive fn to run the evolution of each generation
			*/
			if($("#stopGag").val()!=="stop"){
				that.generation++;
				$("#generation").text(that.generation);
				that.testBoard();
				for (var i in that.range(0, C.XSCALE)){
					for (var j in that.range(0, C.YSCALE)){
						C.BOARD[i][j] = C.TEMPBOARD[i][j];
					}
				}
				that.clearTempBoard();
				that.updateBoardDisplay();
			}
		}

		this.beginLife = function(){
			console.log("Life has started");
			$("#stopGag").val("start");
			C.gameTimer = window.setInterval(that.passAGeneration,500);
		}
		
		this.endLife = function(reset){
			window.clearInterval(C.gameTimer);
			$("#stopGag").val("stop");
			if(reset===true){ $("#generation").text("0"); that.generation = 0; }
			console.log("Life has ended");
		}
		
		/*
		We need a temp board or else the logic overlaps and
		screws up the whole game
		*/
		this.generateBoards = function(){
			for (var i in that.range(0, C.XSCALE)){
				if(!C.BOARD[i]) C.BOARD[i] = [];
				if(!C.TEMPBOARD[i]) C.TEMPBOARD[i] = [];
				for (var j in that.range(0, C.YSCALE)){
					C.TEMPBOARD[i][j] = 0;
					C.BOARD[i][j] = 0;
				}
			}
		}
		
		//reset
		this.clearTempBoard = function(){
			for (var i in that.range(0, C.XSCALE)){
				for (var j in that.range(0, C.YSCALE)){
					C.TEMPBOARD[i][j] = 0;
				}
			}
		}
		
		// private constructor 
		var __construct__ = function(that) {
			console.log('life has been instantiated');
			that.generation 	= 0;
			
			/* CONSTANTS */
			C.XSCALE 	= 50;
			C.YSCALE	= 25;
			C.BOARD		= [];
			C.TEMPBOARD = [];
			C.gameTimer	= {};

			that.generateBoards();
			that.drawBoxes(C.XSCALE, C.YSCALE, 'life');
		}(this);
	}
	//end class Life()
	window.life = new Life({
		$: 		jQuery
	});
});