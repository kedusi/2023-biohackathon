import { StyledDiv } from "./Graph.styled";

import { default as importData } from "../../../data/Data";
import CytoscapeComponent from "react-cytoscapejs";
import { useCallback, useEffect, useState } from "react";
import graphStyles from "./Graph.style.json";
import cytoscape from "cytoscape";
import cola from "cytoscape-cola";
import { tippy } from "@tippyjs/react";
cytoscape.use(cola);
// cytoscape.use(popper);

console.log(importData);

export default function Graph(props) {
  const { disease, options, showMutations } = props;
  const [removed, setRemoved] = useState();
  const [infoBox, setInfoBox] = useState();
  const [showInfoBox, setShowInfoBox] = useState();

  let cyRef;

  const addToGroup = (el) => el.addClass("isGrouped");
  const removeFromGroup = (el) => el.removeClass("isGrouped");

  const filterForDisease = useCallback(() => {
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
  }, [cyRef, disease, options, removed]);

  useEffect(() => {
    if (infoBox && showInfoBox) {
      infoBox.show();
    } else if (infoBox) {
      infoBox.destroy();
      setInfoBox();
    }
  }, [showInfoBox, infoBox]);

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
  }, [removed, filterForDisease]);

  useEffect(() => {
    if (showMutations) {
      cyRef.$("[?isMutated]").addClass("isMutated");
    } else {
      cyRef.$("[?isMutated]").removeClass("isMutated");
    }
  }, [showMutations, cyRef]);

  return (
    <div id="cyWrapper">
      <CytoscapeComponent
        cy={(cy) => (cyRef = cy)}
        layout={{ name: "circle" }}
        stylesheet={graphStyles}
        elements={CytoscapeComponent.normalizeElements(importData)}
        id="cy"
      />
    </div>
  );
}
