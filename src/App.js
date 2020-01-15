import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import rd3 from 'react-d3-library'
import * as d3 from 'd3'

const App () => {

  // componentDidMount() {
  //   const data = [12, 5, 6, 6, 9, 10];
  //
  //   const svg = d3.select("body").append("svg").attr("width", 700).attr("height", 300);
  //
  //   svg.selectAll("rect").data(data).enter().append("rect")
  //
  //   svg.selectAll("rect")
  //   .data(data)
  //   .enter()
  //   .append("rect")
  //   .attr("x", (d, i) => i * 70)
  //   .attr("y", 0)
  //   .attr("width", 25)
  //   .attr("height", (d, i) => d)
  //   .attr("fill", "green");
  //
  // }

  const [books, setBooks] = useState(initialBooks)
  const initialBooks = [
    {
        name: "Harry Potter and the Philosophers Stone",
        author: "J. K. Rowling",
        genre: "fantasy"
    },{
        name: "The Pedagogy of Freedom",
        author: "Bell hooks",
        genre: "non-fiction"
    },{
        name: "Harry Potter and the Chamber of Secrets",
        author: "J. K. Rowling",
        genre: "fantasy"
    },{
        name: "Gilgamesh",
        author: "Derrek Hines",
        genre: "poetry"
    }
]

  render() {
    return (
      <div className="App">
        <h1>I'm here 😎</h1>
        <div id={"#"}></div>
      </div>
    );
  }
}

export default App;









// let data
// const nodes = []
// const throttledNodes = []
// let graph
// const width = 800
// const height = 800
// const throttleIndex = 0
// const throttleNum = 10
// let timer
// const labels = []
// const color = d3.scale.catergory20()
// d3.request('/assets/significantvolcanoeruptions.csv')
//   .mimeType('text/csv')
//   .response(xhr => d3.csvParse(xhr.responseText))
//   .get(data => {
//     this.setState({data})
//   })

// d3.csv('/assets/significantvolcanoeruptions.csv')
//   .row(function(d) { return {key: d.key, value: +d.value} })
//   .get (function(error, rows) { console.log("rows", rows) })
