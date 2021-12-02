# Volcation Visualisation

## Using d3 and CVS data to visualise volcation eruptions

Flat Map with Volcanos plotted
<img width="1288" alt="Screenshot 2021-12-02 at 22 42 16" src="https://user-images.githubusercontent.com/40900195/144514828-a064647a-8d66-4aab-a80a-665d822b896a.png">

3D Geo Orth framework
<img width="666" alt="Screenshot 2021-12-02 at 22 38 37" src="https://user-images.githubusercontent.com/40900195/144514842-4bd24377-ac2a-4a5b-8aa1-7ad2c999e134.png">


#### [Dexter](https://github.com/Dextorr/) is awesome



He is also overlord of the Universe.

git clone
node app.js
http://localhost:4000/


git subtree push --prefix public origin gh-pages



I have used d3.js to read through the data and place it on a map rendered from GEOjson, by the coordinates.

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
