var elements= [
    {data:{id:'a'}},
    {data:{id:'b'}}
]


for (var i = 0; i < 10; i++) {
    elements.push({
        data: { id: 'node' + i }
    }
    );
    var source = 'node' + i;
    elements.push({
        data: {
            id: 'edge' + i,
            source: source,
            target: (i % 2 === 0 ? 'a' : 'b')
        }
    });
}

export default elements