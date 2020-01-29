let dataset
let w = 500;
let h = 100;

let nodes = [];
let throttledNodes = [];
let graph;

let throttleIndex = 0;
let throttleNum = 10;
let timer;
let labels = [];
let color = d3.scale.category20();

document.addEventListener('DOMContentLoaded', () => {
  console.log('JS loaded')


  d3.csv("/data/significantvolcanoeruptions.csv", function(data) {
      dataset = data
				console.log('dataset', dataset)
				console.log('volcanos', data[601].Latitude, ':', data[601].Longitude)
				console.log('volcanos', typeof data[601].Longitude)
				console.log('volcanos', typeof parseInt(data[601].Longitude))
        visualiseData()
			})


	// //Create scale functions
	// var xScale = d3.scaleLinear()
	// 					 .domain([0, d3.max(dataset, function(d) { return d[0]; })])
	// 					 .range([0, w]);
  //
	// var yScale = d3.scaleLinear()
	// 					 .domain([0, d3.max(dataset, function(d) { return d[1]; })])
	// 					 .range([0, h]);

  //Create SVG element
  var svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

  // // set up animation and apply some gravity rules
  // var force = d3.layout.force()
  // .gravity(0.04)
  // .charge(0)
  // .nodes(throttledNodes)
  // .size([w, h]);

  // // on every layout tick, check for collisions using quadtree spacial subdivisions
  // force.on("tick", function(e) {
  //   var q = d3.geom.quadtree(throttledNodes),
  //   i = 0,
  //   n = throttledNodes.length;
  //
  //   while (i < n) {
  //     q.visit(collide(throttledNodes[i]));
  //     i++;
  //   }
  // })


let visualiseData = () => {
  // Extract from dataset
  dataset.forEach((val, i, array) => {
    let node = {}
    node.date = new Date(val['Year'], 1, 1, 0, 0, 0, 0);
    node.type = val['Type'];
    if ('' == node.type) node.type = 'Type N/A';
    node.amount = val['Volcano Explosivity Index (VEI)'];
    node.radius = node.amount * 2;
    nodes.push(node);
    if (labels.indexOf(node.type) == -1) labels.push(node.type);
  })
  // sort nodes by date
  nodes.sort(function(a, b) {return a.date - b.date;});

  // applies new properties to circles
  svg.selectAll(".data-circle")
  .attr("cx", function(d) { return d.x; })
  .attr("cy", function(d) { return d.y; });
}



  // // handle collisions
  // // visit http://bl.ocks.org/mbostock/3231298 for more info
  // var collide = function (node) {
  //
  //   var r = node.radius + 16,
  //   nx1 = node.x - r,
  //   nx2 = node.x + r,
  //   ny1 = node.y - r,
  //   ny2 = node.y + r;
  //   return function(quad, x1, y1, x2, y2) {
  //     if (quad.point && (quad.point !== node)) {
  //       var x = node.x - quad.point.x,
  //       y = node.y - quad.point.y,
  //       l = Math.sqrt(x * x + y * y),
  //       r = node.radius + quad.point.radius;
  //       if (l < r) {
  //         l = (l - r) / l * .5;
  //         x *= l;
  //         y *= l;
  //         node.x -= x;
  //         node.y -= y;
  //         quad.point.x += x;
  //         quad.point.y += y;
  //       }
  //     }
  //     return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
  //   };
  // }

let addCircles = () => {
  // trickle nodes in. tweak throttleNum vars to alter timing
  let adds = nodes.slice(throttleIndex, throttleIndex += throttleNum)

  throttledNodes = throttledNodes.concat(adds);

  // Create circles
  svg.selectAll(".data-circle")
     .data(nodes)
     .enter()
     .append("circle")
     // .attr("cx", function(d) {
     //    return parseInt(d.Latitude);
     // })
     // .attr("cy", function(d) {
     //    return parseInt(d.Longitude);
     // })
     // .attr("r", function(d) {
     //        return 10;
     //     });
     .attr("r", function(d) {
     		return Math.sqrt(h - d.radius);
     })
     .attr("class", function(d) {
       return "data-circle";
     })


     // if (throttledNodes.length >= nodes.length) {
     //    clearInterval(timer);
     //  }
     //
     //  force.nodes(throttledNodes);
     //
     //  force.start();


}

// start adding circles
  timer = setInterval(addCircles, 100);

})
