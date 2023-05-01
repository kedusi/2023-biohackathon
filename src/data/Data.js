var elements = [{ data: { id: "a" } }, { data: { id: "b" } }];

for (var i = 0; i < 10; i++) {
  elements.push({
    data: {
      id: "node" + i,
      isMutated: Math.random() > 0.85 ? true : false,
      disease: "disease 1",
    },
  });
  var source = "node" + i;
  elements.push({
    data: {
      id: "edge" + i,
      source: source,
      target: i % 2 === 0 ? "a" : "b",
    },
  });
}

for (var i = 10; i < 25; i++) {
  elements.push({
    data: {
      id: "node" + i,
      isMutated: Math.random() > 0.85 ? true : false,
      disease: "disease 2",
    },
  });
  var source = "node" + i;
  elements.push({
    data: {
      id: "edge" + i,
      source: source,
      target: "node" + Math.floor(Math.random() * (i - 1)),
    },
  });
}
export default elements;
