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
    <div id="home">
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
