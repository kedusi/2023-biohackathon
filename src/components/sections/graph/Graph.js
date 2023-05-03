import StyledDiv from "./Graph.styled";

import { default as data } from "../../../data/Data";
import CytoscapeComponent from "react-cytoscapejs";
import { useEffect } from "react";

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
        stylesheet={[
          {
            selector: "node",
            style: {
              "background-color": "gray",
              label: "data(id)",
            },
          },
          {
            selector: "node[?isMutated]",
            style: {
              shape: "star",
              backgroundColor: "orange",
            },
          },
          {
            selector: ".isGrouped",
            style: {
              "background-color": "green",
            },
          },
          {
            selector: "edge",
            style: {
              width: 1,
              "curve-style": "straight",
              "arrow-scale": 2,
            },
          },
          {
            selector: ".inhibitor",
            style: {
              lineColor: "red",
              "target-arrow-color": "red",
              "target-arrow-shape": "triangle-backcurve",
            },
          },
          {
            selector: ".promoter",
            style: {
              lineColor: "green",
              "target-arrow-color": "green",
              "target-arrow-shape": "tee",
            },
          },
        ]}
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
