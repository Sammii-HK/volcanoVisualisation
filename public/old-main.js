import * as d3 from 'd3'
import React, { useState, useRef, useEffect } from 'react'

// const generateDataset = () => (
//   Array(10).fill(0).map(() => ([
//     Math.random() * 80 + 10,
//     Math.random() * 35 + 10,
//   ]))
// )

const generateDataset = () => {
  d3.csv("/data/chronounits.csv").then(function(data) {
    console.log(data[0])
  })
}

// const generateDataset = () => {
//   d3.csv("/data/chronounits.csv", function(data) {
//     return {
//       eon : data.eon,
//       era : data.era,
//       period : data.period,
//       epoch : data.epoch
//     }
//   }).then(function(data) {
//     console.log(data[0])
//   })
// }

const Circles = () => {
  const [dataset] = useState(
    generateDataset()
  )
  const ref = useRef()

  // useEffect(() => {
  //   const svgElement = d3.select(ref.current)
  //   svgElement.selectAll("circle")
  //     .data(dataset)
  //     .join("circle")
  //       .attr("cx", d => d[0])
  //       .attr("cy", d => d[1])
  //       .attr("r",  3)
  // }, [dataset])

  return (
    <svg
      viewBox="0 0 100 50"
      ref={ref}
    />
  )
}

// const Circles = () => {
//   const [dataset, setDataset] = useState(
//     generateDataset()
//   )
//
//   return (
//     <svg viewBox="0 0 100 50">
//       {dataset.map(([x, y], i) => (
//         <circle
//           key={i}
//           cx={x}
//           cy={y}
//           r="3"
//         />
//       ))}
//     </svg>
//   )
// }

export default Circles
