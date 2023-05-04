import StyledDiv from "./Graph.styled";

import { default as importData } from "../../../data/Data";
import CytoscapeComponent from "react-cytoscapejs";
import { useEffect, useState } from "react";
import graphStyles from "./Graph.style.json";

console.log(importData);
const options = ["Leukemia", "disease 1", "disease 2"];

export default function Graph() {
  const [disease, setDisease] = useState(options[0]);
  const [removed, setRemoved] = useState();

  let cyRef;

  const addToGroup = (el) => el.addClass("isGrouped");

  const filterForDisease = () => {
    removed && removed.restore();
    setRemoved();
    const leukemiaNodes = cyRef.$("[disease = '" + disease + "']");
    const notLeukemiaNodes = cyRef.elements().not(leukemiaNodes).remove();
    setRemoved(notLeukemiaNodes);
    leukemiaNodes.layout({ name: "circle" }).run();
  };

  useEffect(() => {
    console.log(cyRef);
    cyRef.on("tap", "node", (e) => {
      addToGroup(e.target);
    });
  });

  useEffect(() => {
    filterForDisease();
  }, [disease]);

  return (
    <StyledDiv>
      <form>
        <select value={disease} onChange={(e) => setDisease(e.target.value)}>
          {options.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
      </form>
      <CytoscapeComponent
        cy={(cy) => (cyRef = cy)}
        layout={{ name: "circle" }}
        stylesheet={graphStyles}
        elements={importData}
        style={{
          // 99% because of some infinite re-calculating of render (when 100%) to add/remove scroll bars
          height: "99%",
          width: "99%",
        }}
      />
    </StyledDiv>
  );
}
