import StyledDiv from "./Graph.styled";

import { default as importData } from "../../../data/Data";
import CytoscapeComponent from "react-cytoscapejs";
import { useEffect, useState } from "react";
import graphStyles from "./Graph.style.json";
import cytoscape from "cytoscape";
import cola from "cytoscape-cola";
import { tippy } from "@tippyjs/react";
cytoscape.use(cola);
// cytoscape.use(popper);

console.log(importData);
const options = ["Leukemia", "disease 1", "disease 2"];

export default function Graph() {
  const [disease, setDisease] = useState(options[0]);
  const [removed, setRemoved] = useState();
  const [infoBox, setInfoBox] = useState();
  const [showInfoBox, setShowInfoBox] = useState();

  let cyRef;

  const addToGroup = (el) => el.addClass("isGrouped");
  const removeFromGroup = (el) => el.removeClass("isGrouped");

  const filterForDisease = () => {
    removed && removed.restore();
    setRemoved();
    const leukemiaNodes = cyRef.$("[disease = '" + disease + "']");
    const notLeukemiaNodes = cyRef.elements().not(leukemiaNodes).remove();
    setRemoved(notLeukemiaNodes);
    leukemiaNodes.layout({ name: "cola" }).run();
  };

  useEffect(() => {
    if (infoBox && showInfoBox) {
      infoBox.show();
    } else if (infoBox) {
      infoBox.destroy();
      setInfoBox();
    }
  }, [showInfoBox]);

  useEffect(() => {
    cyRef.on("mouseover", "node", (e) => {
      let node = e.target;
      addToGroup(node);
      if (node.data("tooltip")) {
        let dummyDiv = document.createElement("div");
        dummyDiv.setAttribute("id", "nodeInfo");

        setInfoBox(
          new tippy(dummyDiv, {
            trigger: "manual",
            content: () => {
              let content = document.createElement("div");
              content.innerHTML = node.data("tooltip");
              return content;
            },
          })
        );

        setShowInfoBox(true);
      }
    });

    cyRef.on("mouseout", "node", (e) => {
      removeFromGroup(e.target);
      setShowInfoBox(false);
    });
  });

  useEffect(() => {
    filterForDisease();
  }, [disease]);

  return (
    <StyledDiv>
      <div id="header" style={{ width: "100%", textAlign: "center" }}>
        <h1>Team 4: Gene-Gene Interaction with CytoscapeJS</h1>
        <form style={{ display: "inline" }}>
          <select value={disease} onChange={(e) => setDisease(e.target.value)}>
            {options.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </select>
        </form>
      </div>
      <CytoscapeComponent
        cy={(cy) => (cyRef = cy)}
        layout={{ name: "cola" }}
        stylesheet={graphStyles}
        elements={CytoscapeComponent.normalizeElements(importData)}
        style={{
          // 99% because of some infinite re-calculating of render (when 100%) to add/remove scroll bars
          height: "85%",
          width: "85%",
        }}
      />
    </StyledDiv>
  );
}
