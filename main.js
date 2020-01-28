document.addEventListener('DOMContentLoaded', () => {
  console.log('JS loaded')


  d3.csv("/data/significantvolcanoeruptions.csv", function(data) {
				console.log('volcanos', data)
			})

  //Width and height
  var w = 500;
  var h = 100;

  var dataset = [
    [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
    [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
  ];


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

	svg.selectAll("circle")
	   .data(dataset)
	   .enter()
	   .append("circle")
	   .attr("cx", function(d) {
	   		return d[0];
	   })
	   .attr("cy", function(d) {
	   		return d[1];
	   })
     .attr("r", function(d) {
			   		return Math.sqrt(h - d[1]);
			   });

     // Create labels
     svg.selectAll("text")
  			   .data(dataset)
  			   .enter()
  			   .append("text")
  			   .text(function(d) {
  			   		return d[0] + "," + d[1];
  			   })
  			   .attr("x", function(d) {
  			   		return d[0];
  			   })
  			   .attr("y", function(d) {
  			   		return d[1];
  			   })
  			   .attr("font-family", "sans-serif")
  			   .attr("font-size", "11px")
  			   .attr("fill", "red");



  // const body = d3.select("body")
  // const p = body.append("p")
  // p.text("Hello world!")
  //
  // var dataset = [ 5, 10, 15, 20, 25 ]
  //
	// 		d3.select("body").selectAll("p")
	// 			.data(dataset)
	// 			.enter()
	// 			.append("p")
	// 			.text(function(d) { return d })
})
