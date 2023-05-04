var elements = [
  {
    data: {
      id: "A",
      disease: "Leukemia",
    },
  },
  {
    data: {
      id: "B",
      disease: "Leukemia",
    },
  },
  {
    data: {
      id: "C",
      disease: "Leukemia",
    },
  },
  {
    data: {
      id: "D",
      disease: "Leukemia",
    },
  },
  {
    data: {
      id: "E",
      disease: "Leukemia",
    },
  },
  {
    data: {
      id: "A activates C",
      disease: "Leukemia",
      source: "A",
      target: "C",
      interaction: "activate",
    },
  },
  {
    data: {
      id: "C suppresses A",
      disease: "Leukemia",
      source: "C",
      target: "A",
      interaction: "suppress",
    },
  },
  {
    data: {
      id: "A activates B",
      disease: "Leukemia",
      source: "A",
      target: "B",
      interaction: "activate",
    },
  },
  {
    data: {
      id: "B suppresses C",
      disease: "Leukemia",
      source: "B",
      target: "C",
      interaction: "suppress",
    },
  },
  {
    data: {
      id: "C inhibits D",
      disease: "Leukemia",
      source: "C",
      target: "D",
      interaction: "inhibit",
    },
  },
  {
    data: {
      id: "B relates generally to E",
      disease: "Leukemia",
      source: "B",
      target: "E",
    },
  },
  {
    data: {
      id: "D relates generally to E",
      disease: "Leukemia",
      source: "D",
      target: "E",
    },
  },
];

for (var i = 0; i < 25; i++) {
  elements.push({
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
    elements.push({
      data: {
        id: "edge" + i,
        source,
        target,
        disease: Math.random() < 0.5 ? "disease 1" : "disease 2",
      },
    });
    console.log(source);
  }
}

export default elements;
