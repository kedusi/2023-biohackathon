var elements = [];

for (var i = 0; i < 25; i++) {
  elements.push({
    data: {
      id: "node" + i,
      isMutated: Math.random() > 0.85 ? true : false,
      disease: Math.random() > 0.7 ? "disease 1" : "disease 2",
    },
  });
}
const numElements = elements.length;
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
      },
      classes: [
        Math.random() < 0.5 ? "disease 1" : "",
        Math.random() < 0.5 ? "disease 2" : "",
        Math.random() < 0.5 ? "isMutated" : "",
        Math.random() < 0.5 ? "inhibitor" : "promoter",
      ],
    });
    console.log(source);
  }
}

export default elements;
