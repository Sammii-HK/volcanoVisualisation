const width = 960
const height = 500
const config = {
  speed: 0.005,
  verticalTilt: -30,
  horizontalTilt: 0
}
let locations = []
const center = [width/2, height/2]
const projection = d3.geoOrthographic()
projection.rotate([0, -15])
const path = d3.geoPath().projection(projection)
const initialScale = projection.scale()
let svg
let markerGroup
let x

document.addEventListener('DOMContentLoaded', () => {
  svg = d3.select('#globe-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'container')
  
  markerGroup = svg.append('g')

  svg.call(d3.drag()
    .on("drag", function() {
      x = d3.mouse(this);
      // getAnimationFrame/setInterval
      // Get initial x value
      // after 1 second get current x value
      // send difference value to momentum function

      // momentum function takes difference value
      // it translates the difference to projecttion.rotate(x) over a dynamic amount of time
      // the amount which the projection rotates starts as large4 increments
      // and then decrements over time
      // console.log("x", x[0]);
      
      requestAnimationFrame(() => {
        projection.rotate([x[0], -15])
        // 
        svg.selectAll("path").attr("d",path);
        drawMarkers();
      });
    })
  )
  drawGlobe()
  // drawGraticule()
  console.log('JS loaded')
})

const locationData = [
  {"latitude": 22, "longitude": 88},
  {"latitude": 12.61315, "longitude": 38.37723},
  {"latitude": -30, "longitude": -58},
  {"latitude": -14.270972, "longitude": -170.132217},
  {"latitude": 28.033886, "longitude": 1.659626},
  {"latitude": 40.463667, "longitude": -3.74922},
  {"latitude": 35.907757, "longitude": 127.766922},
  {"latitude": 23.634501, "longitude": -102.552784}
];

function drawGlobe() {
  d3.queue()
    .defer(d3.json, 'https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/world-110m.json')
    // .defer(d3.json, '/data/locations.json')
    // .defer(d3.csv, '/data/significantvolcanoeruptions.csv')
    .await((error, worldData, /* locationData */) => {
      svg.selectAll(".segment")
        .data(topojson.feature(worldData, worldData.objects.countries).features)
        .enter().append("path")
        .attr("class", "segment")
        .attr("d", path)
        .style("fill", "#aaaaaa")
        .style("stroke", "#ccc")
        .style("stroke-width", "0.3px")
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