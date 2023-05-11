import { useState } from "react";
import Controls from "../../sections/controls/Controls";
import Graph from "../../sections/graph/Graph";

const options = [
  "No Filter",
  "ALL",
  "AML",
  "CML",
  "acute promyelocytic leukemia",
];

export default function Home(props) {
  const [showMutations, setShowMutations] = useState(false);
  const [disease, setDisease] = useState(options[0]);
  const handleDiseaseSelect = (e) => setDisease(e.target.value);
  const handleMutationClick = () => {
    setShowMutations((curr) => !curr);
    console.log("clicked");
  };
  return (
    <div id="home" style={{ position: "relative" }}>
      <h1>Home Page!</h1>
      <h3>What! What!</h3>
      <Controls
        disease={disease}
        diseaseOptions={options}
        handleDiseaseSelect={handleDiseaseSelect}
        handleMutationClick={handleMutationClick}
        showMutations={showMutations}
      />
      <Graph
        disease={disease}
        options={options}
        showMutations={showMutations}
      />
    </div>
  );
}
