let dataset
let w = 1000
let h = 500
const padding = 20

let nodes = [] // To push extracted data from dataset to

let throttledNodes = []
let graph

let throttleIndex = 0
let throttleNum = 10
let timer
let labels = []
let color = d3.scale.category20()

document.addEventListener('DOMContentLoaded', () => {
  console.log('JS loaded')


  d3.csv("/data/significantvolcanoeruptions.csv", function(data) {
    dataset = data
		console.log('dataset', dataset)
		console.log('volcanos', data[601].Latitude, ':', data[601].Longitude)
    visualiseData()
	})

  d3.json('/data/world.json', function(err, json) {
  //Bind data and create one path per GeoJSON feature
  svg.selectAll("path")
     .data(json.features)
     .enter()
     .append("path")
     .attr("d", path)
     .attr("z-index", -1)
     .style("fill", "steelblue")
})

var projection = d3.geoEquirectangular()
                      // .scale(100)
                      // .center([0, 0])
                      // .translate([0, 0])
                      // .fitSize([w, h], geojson)
                      // .fitExtent([[0, 0], [w, h]], geojson)
                      .translate([w/2, h/2])
                      // .scale([200])

  //Define path generator, using the Albers USA projection
	var path = d3.geoPath()
    			 		 .projection(projection)


	//Create SVG element
	var svg = d3.select("body")
    					.append("svg")
    					.attr("width", w)
    					.attr("height", h)


  // // set up animation and apply some gravity rules
  // var force = d3.layout.force()
  // .gravity(0.04)
  // .charge(0)
  // .nodes(throttledNodes)
  // .size([w, h])

  // // on every layout tick, check for collisions using quadtree spacial subdivisions
  // force.on("tick", function(e) {
  //   var q = d3.geom.quadtree(throttledNodes),
  //   i = 0,
  //   n = throttledNodes.length
  //
  //   while (i < n) {
  //     q.visit(collide(throttledNodes[i]))
  //     i++
  //   }
  // })


let visualiseData = () => {

  // var linearScale = d3.scale
  //   .linear()
  //   .domain([0, 10])
  //   .range([0, 600]);

	//Create scale functions
	var xScale = d3.scale
              .linear()
              .domain([-180, 180])
              .range([padding, w - padding * 2])

	var yScale = d3.scale
              .linear()
              .domain([-90, 90])
              .range([h - padding, padding])

  var rScale = d3.scale
              .linear()
              .domain([0, 10])
              .range([0, 10]);
  //
	// var yScale = d3.scaleLinear()
	// 					 .domain([0, d3.max(dataset, function(d) { return d.long })])
	// 					 .range([0, h])

  // Extract from dataset
  dataset.forEach((val, i, array) => {
    let node = {}
    node.name = val['Name']
    node.date = new Date(val['Year'], 1, 1, 0, 0, 0, 0)
    node.type = val['Type']
    node.lat = val['Latitude']
    node.long = val['Longitude']
    if ('' == node.type) node.type = 'Type N/A'
    node.vei = val['Volcano Explosivity Index (VEI)']
    if (node.vei) nodes.push(node)
    if (labels.indexOf(node.type) == -1) labels.push(node.type)
  })
  console.log("nodes:", nodes)
  // Sort nodes by date
  nodes.sort(function(a, b) {return a.date - b.date})

  // //Create SVG element
  // var svg = d3.select("body")
  // .append("svg")
  // .attr("width", w)
  // .attr("height", h)

  // // Apply new properties to circles
  // svg.selectAll(".data-circle")
  // .attr("cx", function(d) { return d.lat })
  // .attr("cy", function(d) { return d.long })

  // Create circles
  svg.selectAll(".data-circle")
     .data(nodes)
     .enter()
     .append("circle")
     .attr("cx", function(d) {
        if (d.long) return xScale(parseInt(d.long))
     })
     .attr("cy", function(d) {
        if (d.lat) return yScale(parseInt(d.lat))
     })
     // .attr("r", function(d) {
     //        return 10
     //     })
     .attr("r", function(d) {
     		return rScale(parseInt(d.vei))
     })
     .attr("class", function(d) {
       return "data-circle"
     })
  }

  svg.selectAll("text")
    .data(nodes)
    .enter()
    .on("hover", function() {

    })





  // // handle collisions
  // // visit http://bl.ocks.org/mbostock/3231298 for more info
  // var collide = function (node) {
  //
  //   var r = node.radius + 16,
  //   nx1 = node.x - r,
  //   nx2 = node.x + r,
  //   ny1 = node.y - r,
  //   ny2 = node.y + r
  //   return function(quad, x1, y1, x2, y2) {
  //     if (quad.point && (quad.point !== node)) {
  //       var x = node.x - quad.point.x,
  //       y = node.y - quad.point.y,
  //       l = Math.sqrt(x * x + y * y),
  //       r = node.radius + quad.point.radius
  //       if (l < r) {
  //         l = (l - r) / l * .5
  //         x *= l
  //         y *= l
  //         node.x -= x
  //         node.y -= y
  //         quad.point.x += x
  //         quad.point.y += y
  //       }
  //     }
  //     return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1
  //   }
  // }
//
// let addCircles = () => {
//   // trickle nodes in. tweak throttleNum vars to alter timing
//   let adds = nodes.slice(throttleIndex, throttleIndex += throttleNum)
//
//   throttledNodes = throttledNodes.concat(adds)
//
//   // Create circles
//   svg.selectAll(".data-circle")
//      .data(nodes)
//      .enter()
//      .append("circle")
//      // .attr("cx", function(d) {
//      //    return parseInt(d.Latitude)
//      // })
//      // .attr("cy", function(d) {
//      //    return parseInt(d.Longitude)
//      // })
//      // .attr("r", function(d) {
//      //        return 10
//      //     })
//      .attr("r", function(d) {
//      		return Math.sqrt(h - d.radius)
//      })
//      .attr("class", function(d) {
//        return "data-circle"
//      })
//
//
//      // if (throttledNodes.length >= nodes.length) {
//      //    clearInterval(timer)
//      //  }
//      //
//      //  force.nodes(throttledNodes)
//      //
//      //  force.start()
//
//
// }

// start adding circles
  // timer = setInterval(addCircles, 100)

})
