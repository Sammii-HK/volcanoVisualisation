document.addEventListener('DOMContentLoaded', () => {
  console.log('JS loaded')

  // d3.csv("/data/food.csv", function(data) {
	// 			console.log('food', data);
	// 		});
  // d3.json("/data/data.json", function(data) {
	// 			console.log('json', data);
	// 		});

  // d3.csv("/data/chronounits.csv", function(data) {
	// 			console.log(data);
	// 		});
  d3.csv("/data/significantvolcanoeruptions.csv", function(data) {
				console.log('volcanos', data);
			});
  // d3.csv("/data/Mag6PlusEarthquakes_1900-2013.csv", function(data) {
	// 			console.log('mag 6', data);
	// 		});

  const body = d3.select("body")
  const p = body.append("p")
  p.text("Hello world!")

  var dataset = [ 5, 10, 15, 20, 25 ];

			d3.select("body").selectAll("p")
				.data(dataset)
				.enter()
				.append("p")
				.text(function(d) { return d; });
})

// $(function() {
//   let data
//   let nodes = []
//   let throttledNodes = []
//   let graph
//   const width = 800
//   const height = 600
//   const throttleIndex = 0
//   const throttleNum = 10
//   let timer
//   let labels = []
//   const color = d3.scale.category20()
//   d3.csv('/data/significantvolcanoeruptions.csv',
//     function (csvData) {
//       data = csvData
//       visualiseData()
//     })
//
//     const visualiseData = function () {
//     data.forEach(function (val, index, array) {
//       const node = {}
//       node.date = new Date(val['Year'], 1, 1, 0, 0, 0, 0)
//       node.type = val['Type']
//       if ('' == node.type) node.type = 'Type N/A'
//       node.amount = val['Volcano Explosivity Index (VEI)']
//       node.radius = node.amount * 2
//       nodes.push(node)
//       if (labels.indexOf(node.type) == -1) labels.push(node.type)
//     })
//
//     // sort nodes by date
//     nodes.sort(function(a, b) {return a.date - b.date})
//
//     // add SVG element to DOM
//     const svg =  d3.select("#volcano-graph").append("svg")
//       .attr('width', width)
//       .attr('height', height)
//
//     // set up animation and apply some gravity rules
//     const force = d3.layout.force()
//       .gravity(0.04)
//       .charge(0)
//       .nodes(throttledNodes)
//       .size([width, height])
//     }
// })
