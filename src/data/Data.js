import data from "./data.json";

let nodes = [];
let edges = [];
let allDiseases = [];
let allFunctions = [];
for (let row of data) {
  const {
    Gene_1: source,
    Gene_2: target,
    Function: rowFunction,
    Disease: disease,
  } = row;
  for (let gene of [source, target]) {
    const existingGene = nodes.find((node) => node.data.id === gene);

    if (!existingGene) {
      nodes.push({
        data: {
          id: gene,
          disease,
          tooltip: "<p>Hello, Tooltip-World!</p>",
        },
      });
    }
  }

  edges.push({
    data: {
      id: `${source} ${rowFunction} ${target}`,
      source,
      target,
      function: rowFunction,
      disease,
    },
  });

  if (!allFunctions.includes(rowFunction)) {
    allFunctions.push(rowFunction);
  }

  if (!allDiseases.includes(disease)) {
    allDiseases.push(disease);
  }
}

for (var i = 0; i < 25; i++) {
  nodes.push({
    data: {
      id: "node" + i,
      isMutated: Math.random() > 0.85 ? true : false,
      disease: Math.random() > 0.7 ? "disease 1" : "disease 2",
    },
  });
}

const numElements = 25;
for (i = 0; i < numElements; i++) {
  var randomTargetIndex = Math.floor(Math.random() * numElements);
  if (i !== randomTargetIndex) {
    var source = "node" + i;
    var target = "node" + randomTargetIndex;
    edges.push({
      data: {
        id: "edge" + i,
        source,
        target,
        disease: Math.random() < 0.5 ? "disease 1" : "disease 2",
      },
    });
  }
}

const output = {
  elements: {
    nodes,
    edges,
  },
  allDiseases,
  allFunctions,
};

export default output.elements;
// const tsvData = require("./data.tsv");

// let cyData = (async () => {
//   return await fetch(tsvData)
//     .then((tsv) => tsv.text())
//     .then((text) => tsv2json(text))
//     .then((jsonData) => {
//       let rawNodes = [];
//       let rawEdges = [];
//       let rawEdgeTypes = [];
//       let rawDiseases = [];

//       for (let i = 1; i < jsonData.length; i++) {
//         let source = jsonData[i][0];
//         let target = jsonData[i][1];
//         let rowFunction = jsonData[i][2];
//         let disease = jsonData[i][3];
//         // add column 1 node, column 2 node to list of nodes if unique, add to list of diseases for the node if node is already existing and disease is not in list
//         for (let columnNode of [source, target]) {
//           // console.log(columnNode);
//           let existingNode = rawNodes.find(
//             (node) => node.data.id === columnNode
//           );
//           // console.log(existingNode);
//           if (!existingNode) {
//             rawNodes.push({
//               data: { id: columnNode, diseases: [disease] },
//             });
//           } else {
//             let existingDisease = existingNode.data.diseases.find(
//               (el) => el === disease
//             );
//             if (!existingDisease) {
//               existingNode.data.diseases.push(disease);
//             }
//           }
//         }

//         // add edge to list of edges
//         rawEdges.push({
//           data: {
//             id: source + " " + rowFunction + " " + target,
//             source,
//             target,
//             disease,
//             function: rowFunction,
//           },
//         });

//         rawEdgeTypes.push(rowFunction);
//         rawDiseases.push(disease);
//       }

//       let uniqueEdgeTypes = rawEdgeTypes.filter(
//         (edgeType, index, array) => array.indexOf(edgeType) === index
//       );
//       let uniqueDiseases = rawDiseases.filter(
//         (disease, index, array) => array.indexOf(disease) === index
//       );

//       return {
//         elements: {
//           nodes: rawNodes,
//           edges: rawEdges,
//         },
//         diseases: uniqueDiseases,
//         edgeTypes: uniqueEdgeTypes,
//       };
//     });
//   // .then((realData) => {
//   //   for (var i = 0; i < 25; i++) {
//   //     realData.elements.nodes.push({
//   //       data: {
//   //         id: "node" + i,
//   //         isMutated: Math.random() > 0.85 ? true : false,
//   //         disease: Math.random() > 0.7 ? "disease 1" : "disease 2",
//   //       },
//   //     });
//   //   }
//   //   const numElements = 25;
//   //   for (i = 0; i < numElements; i++) {
//   //     var randomTargetIndex = Math.floor(Math.random() * numElements);
//   //     if (i !== randomTargetIndex) {
//   //       var source = "node" + i;
//   //       var target = "node" + randomTargetIndex;
//   //       realData.elements.edges.push({
//   //         data: {
//   //           id: "edge" + i,
//   //           source,
//   //           target,
//   //           disease: Math.random() < 0.5 ? "disease 1" : "disease 2",
//   //         },
//   //       });
//   //     }
//   //   }
//   //   return realData;
//   // });
// })();

// export default cyData.elements;

// // [
// //   {
// //     data: {
// //     id: "A",
// //     disease: "Leukemia",
// //   },
// // },
// // {
// //   data: {
// //     id: "B",
// //     disease: "Leukemia",
// //   },
// // },
// // {
// //   data: {
// //     id: "C",
// //     disease: "Leukemia",
// //   },
// // },
// // {
// //   data: {
// //     id: "D",
// //     disease: "Leukemia",
// //   },
// // },
// // {
// //   data: {
// //     id: "E",
// //     disease: "Leukemia",
// //   },
// // },
// // {
// //   data: {
// //     id: "A activates C",
// //     disease: "Leukemia",
// //     source: "A",
// //     target: "C",
// //     interaction: "activate",
// //   },
// // },
// // {
// //   data: {
// //     id: "C suppresses A",
// //     disease: "Leukemia",
// //     source: "C",
// //     target: "A",
// //     interaction: "suppress",
// //   },
// // },
// // {
// //   data: {
// //     id: "A activates B",
// //     disease: "Leukemia",
// //     source: "A",
// //     target: "B",
// //     interaction: "activate",
// //   },
// // },
// // {
// //   data: {
// //     id: "B suppresses C",
// //     disease: "Leukemia",
// //     source: "B",
// //     target: "C",
// //     interaction: "suppress",
// //   },
// // },
// // {
// //   data: {
// //     id: "C inhibits D",
// //     disease: "Leukemia",
// //     source: "C",
// //     target: "D",
// //     interaction: "inhibit",
// //   },
// // },
// // {
// //   data: {
// //     id: "B relates generally to E",
// //     disease: "Leukemia",
// //     source: "B",
// //     target: "E",
// //   },
// // },
// // {
// //   data: {
// //     id: "D relates generally to E",
// //     disease: "Leukemia",
// //     source: "D",
// //     target: "E",
// //   },
// // },
// // ];
