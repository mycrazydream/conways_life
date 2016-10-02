<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>Conway&amp;s Game of Life</title>
	<meta name="generator" content="TextMate http://macromates.com/">
	<meta name="author" content="Brent Ransom">
	<!-- Date: 2014-09-13 -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<script src="http://d3js.org/d3.v3.min.js"></script>
	<script>
	/*
	conways_game_of_life.js

	Created by Brent Ransom on 2014-01-28.
	Copyright (c) 2014 mycrazydream. All rights reserved.

	Conway's Game of Life
	http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

	Axiom 1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
	Axiom 2. Any live cell with two or three live neighbours lives on to the next generation.
	Axiom 3. Any live cell with more than three live neighbours dies, as if by overcrowding.
	Axiom 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
	*/



	function Life(args){
		args = args || {}''
		/*var scale = args.scale.
		if(scale.length!==2)(
			throw('The dimensions of our grid must be in two dimensions for this exercise. Please pass a scale with an x and y value.');
		)*/
		this.generation = 0;
		this.black 	= "stroke:#FFFFFF; fill: #000000";
	    this.blue 	= "stroke:#FFFFFF; fill: #0000FF";
	    this.green 	= "stroke:#FFFFFF; fill: #00CC00";
	    this.red 	= "stroke:#FFFFFF; fill: #FF0000";
		drawBoxes(100,'life');
		
		function singleBox(color) {
	        s = '<svg width="11" height="11">';
	        s += '<rect x="0" y="0" height="10" width="10" style="';
	        s += color + '"></rect>';
	        s += '</svg>';
	        return s;
	    }
	
		function drawBoxes(n, div, color) {
	        var cw = 100;
	        var ch = (n / 10) * 10;
	        if ((n % 10) != 0) {
	          ch += 10;
	        }
	        var rects = d3.select("#" + div).
	         append("svg:svg").
	         attr("width", cw).
	         attr("height", ch);

	        var length = 10;
	        var whitespace = 2;

	        for (var y = 0; y < ch; y+=length) {
	            for (var x = 0; x < cw; x+=length) {
	                if (n > 0 && n < 1) {
	                  var width = n * length;
	                } else {
	                  var width = length;
	                }
					var color;
					switch(x){
						case x%4==0:
							color = Life.red;
						break;
						case x%3==0:
							color = Life.green;
						break;
						case x%2==0:
							color = Life.blue;
						break;
						default:
							color = Life.black;
					}
	                rects.append("svg:rect").
	                  attr("x", x).
	                  attr("y", y).
	                  attr("height", length).
	                  attr("width", width).
	                  attr("style", color);

	                n -= 1;
	                if (n <= 0) {
	                   return;
	                }
	            }
	        }
	    }
	}
	</script>
</head>
<body>
	<div id="life"></div>
</body>
</html>