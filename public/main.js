document.addEventListener('DOMContentLoaded', () => {
  console.log('JS loaded')


  d3.csv("/data/significantvolcanoeruptions.csv", function(data) {
				console.log('volcanos', data)
			})

  const body = d3.select("body")
  const p = body.append("p")
  p.text("Hello world!")

  var dataset = [ 5, 10, 15, 20, 25 ]

			d3.select("body").selectAll("p")
				.data(dataset)
				.enter()
				.append("p")
				.text(function(d) { return d });
})
