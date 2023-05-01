var elements = []

for (var i = 0; i < 25; i++) {
  elements.push({
    data: {
      id: "node" + i,
      isMutated: Math.random() > 0.85 ? true : false,
      disease: Math.random() > .7 ? "disease 1" : "disease 2",
    },
  })
}

for (i = 0; i < elements.length; i++) {
  var randomTargetIndex = Math.floor(Math.random() * elements.length)
  if(i !== randomTargetIndex) {
    var source = 'node' + i
    elements.push({
      data: {
        id: 'edge' + i,
        source: source,
        target: 'node' + randomTargetIndex
      },
      classes: [
        Math.random() < .5 ? 'disease 1' : '',
        Math.random() < .5 ? 'disease 2' : '',
        Math.random() < .5 ? 'isMutated' : '',
        Math.random() < .5 ? 'inhibitor' : 'tickler'
      ]
    })
  }
}

export default elements;
