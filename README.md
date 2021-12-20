# Volcation Visualisation

A full stack app, which plots volcano eruptions on a Orthographic projection map, using D3.js to visualise the data, running an Express server loading data stored as JSON.

## Details

### Timeframe

5 days

### Technologies Used

* [D3.js](https://d3js.org/)
* Express
* Javascript

### App Overview

To objective of this project is to plot data, using latitudinal and longatudinal co-ordinates, projected onto a geoOrthographic projection of a world map, using [D3.js](https://d3js.org/).

#### Development Process

The volcano eruption data is rendered with D3.js and then plotted on a map rendered from GEOjson, solely using SVG coordinates.

```js
  // Extract from dataset
    dataset.forEach((val, i, array) => {
      let node = {}
      node.name = val['Name']
      node.date = new Date(val['Year'], 1, 1, 0, 0, 0, 0)
      node.type = val['Type']
      node.lat = val['Latitude']
      node.long = val['Longitude']
      node.index = i
      if ('' == node.type) node.type = 'Type N/A'
      node.vei = val['Volcano Explosivity Index (VEI)']
      if (node.vei) nodes.push(node)
      // if (node.date < 1, 1, 1, 1900, 0, 0) nodes.delete(node)
      if (labels.indexOf(node.type) == -1) labels.push(node.type)
    })
```
```js
  // Extract from dataset
    dataset.forEach((val, i, array) => {
      let node = {}
      node.name = val['Name']
      node.date = new Date(val['Year'], 1, 1, 0, 0, 0, 0)
      node.type = val['Type']
      node.lat = val['Latitude']
      node.long = val['Longitude']
      node.index = i
      if ('' == node.type) node.type = 'Type N/A'
      node.vei = val['Volcano Explosivity Index (VEI)']
      if (node.vei) nodes.push(node)
      // if (node.date < 1, 1, 1, 1900, 0, 0) nodes.delete(node)
      if (labels.indexOf(node.type) == -1) labels.push(node.type)
    })
```

I extracted the data I needed from the CVS data set.

As the circles are created, they are placed on the x & y Axis accordindly on the canvas. The circles radius is also determined by the 'VEI' or Volcano Explosivity Index.

```js
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
```

#### Functionality

To rotate the globe, use the cursor to drag and drop.

### Challenges & Achievements

An achievement was to render the globe with a geoOrthographic projection so that the world map was projected onto a sphere and able to be rotated.

## Future enhancements

* To implement spin momentum for a more natural feeling response when spinning the globe.
