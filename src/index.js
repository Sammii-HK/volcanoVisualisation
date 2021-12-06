const width = 960
const height = 500
const config = {
  speed: 0.005,
  verticalTilt: -30,
  horizontalTilt: 0
}
let locations = []
const projection = d3.geoOrthographic()
const path = d3.geoPath().projection(projection)
const initialScale = projection.scale()
let svg
let markerGroup
const center = [width/2, height/2]

document.addEventListener('DOMContentLoaded', () => {
  svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'container')
  
  markerGroup = svg.append('g')

  svg.call(d3.drag()
    .on("drag", function() {
      var x = d3.mouse(this);
      projection.rotate([x[0], -15])
      svg.selectAll("path").attr("d",path);
      drawMarkers();
    })
  )
  drawGlobe()
  drawGraticule()
  console.log('JS loaded')
})

function drawGlobe() {
  d3.queue()
    .defer(d3.json, 'https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/world-110m.json')
    .defer(d3.json, '/data/locations.json')
    // .defer(d3.csv, '/data/significantvolcanoeruptions.csv')
    .await((error, worldData, locationData) => {
      svg.selectAll(".segment")
        .data(topojson.feature(worldData, worldData.objects.countries).features)
        .enter().append("path")
        .attr("class", "segment")
        .attr("d", path)
        // .style("stroke", "#888")
        // .style("stroke-width", "1px")
        .style("fill", "#eaeaea")
        .style("stroke", "#ccc")
        .style("stroke-width", "0.3px")
        // .style("fill", (d, i) => '#e5e5e5')
        // .style("fill", d => '#000000')
        .style("opacity", ".6")
        locations = locationData
        drawMarkers()
        console.log('locations', locations)
        console.log('worldData', worldData)
      }
    )
  console.log('finished')
}

function drawGraticule() {
  const graticule = d3.geoGraticule().step([10, 10])

  svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path)
    // .style("fill", "#fff")
    .style("stroke", "#ccc")
    .style("stroke-width", "0.3px")
  }

// function enableRotation() {
//     d3.timer(function (elapsed) {
//         projection.rotate([config.speed * elapsed - 120, config.verticalTilt, config.horizontalTilt])
//         svg.selectAll("path").attr("d", path)
//         drawMarkers()
//     })
// }



function drawMarkers() {
  const markers = markerGroup.selectAll('circle').data(locations)
  
  markers
    .enter()
    .append('circle')
    .merge(markers)
    .attr('cx', d => projection([d.longitude, d.latitude])[0])
    .attr('cy', d => projection([d.longitude, d.latitude])[1])
    .attr('fill', d => {
      const coordinate = [d.longitude, d.latitude]
      gdistance = d3.geoDistance(coordinate, projection.invert(center))
      return gdistance > 1.57 ? 'none' : 'steelblue'
    })
    .attr('r', 7)

  markerGroup.each(function () {
    this.parentNode.appendChild(this)
  })
}

