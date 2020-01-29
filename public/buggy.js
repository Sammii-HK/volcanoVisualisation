document.addEventListener('DOMContentLoaded', () => {
  var data;
  var nodes = [];
  var throttledNodes = [];
  var graph;
  var width = 800;
  var height = 600;
  var throttleIndex = 0;
  var throttleNum = 10;
  var timer;
  var labels = [];
  var color = d3.scale.category20();
  d3.csv('/data/significantvolcanoeruptions.csv',
    function (csvData) {
      data = csvData;
      visualizeData();
    }
  );

  var visualizeData = function () {
    data.forEach(function (val, index, array) {
      var node = {};
      node.date = new Date(val['Year'], 1, 1, 0, 0, 0, 0);
      node.type = val['Type'];
      if ('' == node.type) node.type = 'Type N/A';
      node.amount = val['Volcano Explosivity Index (VEI)'];
      node.radius = node.amount * 2;
      nodes.push(node);
      if (labels.indexOf(node.type) == -1) labels.push(node.type);
    });

    // sort nodes by date
    nodes.sort(function(a, b) {return a.date - b.date;});

    // add SVG element to DOM
    var svg =  d3.select("#volcano-graph").append("svg")
      .attr('width', width)
      .attr('height', height);

    // set up animation and apply some gravity rules
    var force = d3.layout.force()
      .gravity(0.04)
      .charge(0)
      .nodes(throttledNodes)
      .size([width, height]);

    // on every layout tick, check for collisions using quadtree spacial subdivisions
    force.on("tick", function(e) {
      var q = d3.geom.quadtree(throttledNodes),
          i = 0,
          n = throttledNodes.length;

      while (i < n) {
        q.visit(collide(throttledNodes[i]));
        i++;
      }

      // applies new properties to circles
      svg.selectAll(".data-circle")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    });

    // handle collisions
    // visit http://bl.ocks.org/mbostock/3231298 for more info
    var collide = function (node) {

      var r = node.radius + 16,
          nx1 = node.x - r,
          nx2 = node.x + r,
          ny1 = node.y - r,
          ny2 = node.y + r;
      return function(quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== node)) {
          var x = node.x - quad.point.x,
              y = node.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = node.radius + quad.point.radius;
          if (l < r) {
            l = (l - r) / l * .5;
            node.x -= x *= l;
            node.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      };
    }

    var addCircles = function(){
      // trickle nodes in. tweak throttleNum vars to alter timing
      var adds = nodes.slice(throttleIndex, throttleIndex += throttleNum)

      throttledNodes = throttledNodes.concat(adds);
      svg.selectAll('.data-circle')
          .data(throttledNodes)
          .enter()
          .append("circle")
          .attr("r", function(d) { return d.radius; })
          .attr('class',function(d){ return 'data-circle'; })
          .style("fill", function (d, i) { return color(labels.indexOf(d.type));});

      if (throttledNodes.length >= nodes.length) {
        clearInterval(timer);
      }

      force.nodes(throttledNodes);

      force.start();

    }

    // start adding circles
    timer = setInterval(addCircles, 100);

    // render labels
    labels.forEach(function (val) {
      $('#labels').append(
          '<p style="border-left: 20px solid ' + color(labels.indexOf(val))
          + ';padding-left: 10px;">'
          + val + '</p>'
          );
    });
  }
})
