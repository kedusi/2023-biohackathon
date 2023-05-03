import StyledDiv from "./Graph.styled";

import { default as data } from "../../../data/Data";
import CytoscapeComponent from "react-cytoscapejs";
import { useEffect } from "react";
import graphStyles from "./Graph.style.json";

console.log(data);

export default function Graph() {
  let cyRef;

  const addToGroup = (el) => el.addClass("isGrouped");

  // const filterForDisease = (cy, disease) => {
  //   cy.$("[disease='" + disease + "']").remove();
  // };

  useEffect(() => {
    console.log(cyRef);
    cyRef.on("tap", "node", (e) => {
      addToGroup(e.target);
    });

    // filterForDisease(cyRef, "disease 1");
  });

  return (
    <StyledDiv>
      <CytoscapeComponent
        cy={(cy) => (cyRef = cy)}
        layout={{ name: "circle" }}
        stylesheet={graphStyles}
        elements={data}
        style={{
          // 90% because of some infinite re-calculating of render (when 100%) to add/remove scroll bars
          height: "90%",
          width: "90%",
        }}
      />
    </StyledDiv>
  );
}
