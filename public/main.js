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
	})

  d3.json('/data/world.json', function(err, json) {
  //Bind data and create one path per GeoJSON feature
  svg.selectAll("path")
     .data(json.features)
     .enter()
     .append("path")
     .attr("d", path)
     .style("fill", "steelblue")
     visualiseData()
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


let visualiseData = () => {

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
     .style("opacity", 0.75)
     .attr("class", function(d) {
       return "data-circle"
     })
     .on("mouseover", function(d) {

       //Get this bar's x/y values, then augment for the tooltip
       // var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
       // var yPosition = parseFloat(d3.select(this).attr("y")) + 14;

       console.log(d.name, d.vei);

       //Create the tooltip label
       svg.append("text")
          .attr("id", "tooltip")
          .attr("x", d.long)
          .attr("y", d.lat)
          .attr("text-anchor", "middle")
          .attr("font-family", "sans-serif")
          .attr("font-size", "11px")
          .attr("font-weight", "bold")
          .attr("fill", "black")
          .text(d.name + ' ' + d.vei);

      })
      .on("mouseout", function() {

       //Remove the tooltip
       d3.select("#tooltip").remove();

      })

    }


})
