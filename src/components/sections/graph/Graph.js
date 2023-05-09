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

export default function Graph() {
  const [removed, setRemoved] = useState();
  const [infoBox, setInfoBox] = useState();
  const [showInfoBox, setShowInfoBox] = useState();

  let cyRef;

  const addToGroup = (el) => el.addClass("isGrouped");
  const removeFromGroup = (el) => el.removeClass("isGrouped");

  const filterForDisease = () => {
    removed && removed.restore();
    setRemoved();
    if (disease === options[0]) {
      cyRef.layout({ name: "circle" }).run();
    } else {
      const selectedNodes = cyRef.$("[disease *= '" + disease + "']");
      const notSelectedNodes = cyRef.elements().not(selectedNodes).remove();
      setRemoved(notSelectedNodes);
      selectedNodes.layout({ name: "cola" }).run();
    }
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

  useEffect(() => {
    if (showMutations) {
      cyRef.$("[?isMutated]").addClass("isMutated");
    } else {
      cyRef.$("[?isMutated]").removeClass("isMutated");
    }
  }, [showMutations]);

  return (
    <StyledDiv>
      <CytoscapeComponent
        cy={(cy) => (cyRef = cy)}
        layout={{ name: "circle" }}
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
