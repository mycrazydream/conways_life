/*Got these from http://www.eecs.berkeley.edu/~rcs/research/interactive_latency.html where they are being used
in a different way, but the drawing of boxes with svg would be perfect for Conway's Life */

<script src="http://d3js.org/d3.v3.min.js"></script>
// Display functions:
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

    function singleBox(color) {
        s = '<svg width="11" height="11">';
        s += '<rect x="0" y="0" height="10" width="10" style="';
        s += color + '"></rect>';
        s += '</svg>';
        return s;
    }

    var black = "stroke:#FFFFFF; fill: #000000";
    var blue = "stroke:#FFFFFF; fill: #0000FF";
    var green = "stroke:#FFFFFF; fill: #00CC00";
    var red = "stroke:#FFFFFF; fill: #FF0000";
    
    <!--
    <svg height="201.41006141478022" width="100">
	
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="0" x="0"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="0" x="10"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="0" x="20"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="0" x="30"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="0" x="40"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="0" x="50"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="0" x="60"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="0" x="70"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="0" x="80"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="0" x="90"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="10" x="0"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="10" x="10"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="10" x="20"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="10" x="30"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="10" x="40"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="10" x="50"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="10" x="60"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="10" x="70"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="10" x="80"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="10" x="90"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="20" x="0"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="20" x="10"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="20" x="20"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="20" x="30"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="20" x="40"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="20" x="50"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="20" x="60"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="20" x="70"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="20" x="80"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="20" x="90"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="30" x="0"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="30" x="10"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="30" x="20"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="30" x="30"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="30" x="40"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="30" x="50"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="30" x="60"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="30" x="70"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="30" x="80"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="30" x="90"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="40" x="0"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="40" x="10"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="40" x="20"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="40" x="30"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="40" x="40"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="40" x="50"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="40" x="60"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="40" x="70"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="40" x="80"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="40" x="90"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="50" x="0"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="50" x="10"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="50" x="20"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="50" x="30"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="50" x="40"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="50" x="50"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="50" x="60"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="50" x="70"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="50" x="80"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="50" x="90"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="60" x="0"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="60" x="10"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="60" x="20"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="60" x="30"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="60" x="40"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="60" x="50"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="60" x="60"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="60" x="70"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="60" x="80"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="60" x="90"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="70" x="0"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="70" x="10"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="70" x="20"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="70" x="30"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="70" x="40"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="70" x="50"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="70" x="60"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="70" x="70"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="70" x="80"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="70" x="90"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="80" x="0"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="80" x="10"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="80" x="20"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="80" x="30"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="80" x="40"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="80" x="50"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="80" x="60"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="80" x="70"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="80" x="80"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="80" x="90"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="90" x="0"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="90" x="10"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="90" x="20"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="90" x="30"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="90" x="40"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="90" x="50"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="90" x="60"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="90" x="70"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="90" x="80"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="90" x="90"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="100" x="0"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="100" x="10"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="100" x="20"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="100" x="30"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="100" x="40"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="100" x="50"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="100" x="60"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="100" x="70"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="100" x="80"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="100" x="90"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="110" x="0"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="110" x="10"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="110" x="20"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="110" x="30"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="110" x="40"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="110" x="50"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="110" x="60"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="110" x="70"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="110" x="80"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="110" x="90"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="120" x="0"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="120" x="10"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="120" x="20"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="120" x="30"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="120" x="40"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="120" x="50"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="120" x="60"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="120" x="70"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="120" x="80"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="120" x="90"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="130" x="0"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="130" x="10"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="130" x="20"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="130" x="30"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="130" x="40"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="130" x="50"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="130" x="60"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="130" x="70"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="130" x="80"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="130" x="90"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="140" x="0"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="140" x="10"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="140" x="20"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="140" x="30"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="140" x="40"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="140" x="50"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="140" x="60"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="140" x="70"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="140" x="80"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="140" x="90"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="150" x="0"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="150" x="10"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="150" x="20"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="150" x="30"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="150" x="40"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="150" x="50"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="150" x="60"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="150" x="70"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="150" x="80"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="150" x="90"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="160" x="0"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="160" x="10"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="160" x="20"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="160" x="30"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="160" x="40"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="160" x="50"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="160" x="60"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="160" x="70"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="160" x="80"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="160" x="90"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="170" x="0"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="170" x="10"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="170" x="20"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="170" x="30"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="170" x="40"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="170" x="50"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="170" x="60"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="170" x="70"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="170" x="80"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="170" x="90"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="180" x="0"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="180" x="10"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="180" x="20"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="180" x="30"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="180" x="40"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="180" x="50"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="180" x="60"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="180" x="70"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="180" x="80"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="180" x="90"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="10" height="10" y="190" x="0"></rect>
<rect style="stroke:#FFFFFF; fill: #00CC00" width="4.100614147802446" height="10" y="190" x="10"></rect>
</svg>
-->
