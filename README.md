# Volcation Visualisation

## Using d3 and CVS data to visualise volcation eruptions, with React



#### [Dexter](https://github.com/Dextorr/) is awesome



He is also overlord of the Universe.


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