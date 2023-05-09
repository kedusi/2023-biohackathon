export default function (props) {
  const {
    disease,
    diseaseOptions,
    handleDiseaseSelect,
    handleMutationClick,
    showMutations,
  } = props;

  return (
    <div id="controls">
      <div id="disease">
        <label htmlFor="diseaseSelect">Disease: </label>
        <select
          value={disease}
          name="disease"
          id="diseaseSelect"
          onChange={handleDiseaseSelect}
        >
          {diseaseOptions.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div id="mutations">
        <button onClick={handleMutationClick}>
          {showMutations ? "Hide Mutations" : "Show Mutations"}
        </button>
      </div>
    </div>
  );
}

{
  /* <div style={{ display: "inline" }}>
        <label>Disease:</label>
        <select value={disease} onChange={(e) => setDisease(e.target.value)}>
          {options.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
        <button onClick={handleShowMutations}>
          {showMutations ? "Hide Mutations" : "Show Mutations"}
        </button>
      </div> */
}
