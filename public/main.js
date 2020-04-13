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

let active = []

let color = d3.scale.category20()

document.addEventListener('DOMContentLoaded', () => {
  console.log('JS loaded')


  d3.csv("/data/significantvolcanoeruptions.csv", function(data) {
    dataset = data

		// console.log('dataset', dataset)
		// console.log('volcanos', data[601].Latitude, ':', data[601].Longitude)
	})


  // Render map with equirectangluar view
  var projection = d3.geoEquirectangular()
                        .translate([w/2, h/2])


  //Define path generator, using the Albers USA projection
  var path = d3.geoPath()
    			 		 .projection(projection)


  //Create SVG element
  var svg = d3.select("body")
    					.append("svg")
    					.attr("width", w)
    					.attr("height", h)

  //Create a container in which all zoom-able elements will live
  var map = svg.append("g")
  			.attr("id", "map")
  			// .call(zoom)  //Bind the zoom behavior
  			// 	.call(zoom.transform, d3.zoomIdentity  //Then apply the initial transform
  			// 	.translate(w/2, h/2)
  			// 	.scale(0.25)
  			// 	.translate(-center[0], -center[1]));

  //Create a new, invisible background rect to catch zoom events
	map.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", w)
		.attr("height", h)
		.attr("opacity", 0)

  //Create a box for roll over events
	d3.select("body").append("div")
    .attr("class", "text-box")
    // .text('hi')
    // .text(active)
		// .attr("x", 500)
		// .attr("y", 500)
		// .attr("width", 50)
		// .attr("height", 20)
    // .attr("fill", "orange")


  const visualiseData = () => {

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
      // if (node.date < 1, 1, 1, 1900, 0, 0) nodes.delete(node)
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
       .attr("r", function(d) {
       		return rScale(parseInt(d.vei))
       })
       .attr("fill", function(d) {
        // return "rgb(0, 0, " + Math.round(d * 10) + ")";
        return "rgb(" + Math.round(d.vei * 5) + ", 0, 0)";
      })
       .style("opacity", 0.65)
       .attr("class", function(d) {
         return "data-circle"
       })

       .on("mouseover", function(d, i) {
         // d3.select(this)
         //   .attr("fill", "orange");
           console.log(d.name, d.vei, i)

           d3.select('.text-box').text (d.name + '-' + d.vei)

           // active = [d.name]
           // active.push(d.name)

          // d3.select("text-box")
          //   .insert("p")
          //   .text(d.name)
            // .text(function(d) {
            //   return d.name + '–' + d.vei
            // })

         // d3.select("body").select("text-box")
         //  // .append("p").text(d.name)
         //  .append("text")
         //  .text(function(d) {
         //      return d.name + '–' + d.vei
        	// })

          // make a box, put the text from roll over item in it


        })
        .on("mouseout", function() {
          active = []
        })
        //Bind data and create one path per GeoJSON feature
        map.selectAll("path")
           .data(nodes)
           .enter()
           .append("path")
           .attr("d", path)

        //Create one label per state
         map.selectAll("text")
        	.data(nodes)
        	.enter()
        	.append("text")
        	.attr("class", "label")
        	.attr("x", function(d) {
             if (d.long) return xScale(parseInt(d.long) + 1)
        	})
        	.attr("y", function(d) {
        		 if (d.lat) return yScale(parseInt(d.lat) + 1)
        	})
        	.text(function(d) {
              return d.name + '–' + d.vei
        	})
          .attr("opacity", 0)

          // .on("mouseover", function(d) {
          //   d3.select(this)
          //   // .attr("opacity", 1);
          //   // console.log(d.name, d.vei);
          //
          //  })
          //  .on("mouseout", function() {
          //    d3.select(this)
          //    .attr("opacity", 0);
          //
          //  })

      }

      d3.json('/data/world.json', function(err, json) {
      // Bind data and create one path per GeoJSON feature
      svg.selectAll("path")
         .data(json.features)
         .enter()
         .append("path")
         .attr("d", path)
         .style("fill", "steelblue")

       visualiseData()
    })


})
