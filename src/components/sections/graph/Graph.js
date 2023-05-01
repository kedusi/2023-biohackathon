import StyledDiv from "./Graph.styled";

import { default as data } from "../../../data/Data";
import CytoscapeComponent from "react-cytoscapejs";
import { useEffect } from "react";

console.log(data);

export default function Graph() {
  let cyRef;

  const addToGroup = (el) => el.addClass("isGrouped");

  const filterForDisease = (cy, disease) => {
    return cy.$("node[disease!='" + disease + "']");
  };

  useEffect(() => {
    console.log(cyRef);
    cyRef.on("tap", "node", (e) => {
      addToGroup(e.target);
    });

    filterForDisease(cyRef, 'disease 1').remove()
    cyRef.layout({name: 'circle'}).run()
  });

  return (
    <StyledDiv>
      <CytoscapeComponent
        cy={(cy) => (cyRef = cy)}
        layout={{ name: "circle" }}
        stylesheet={}
        elements={data}
        style={{
          height: "100%",
          width: "100%",
        }}
      />
    </StyledDiv>
  );
}
