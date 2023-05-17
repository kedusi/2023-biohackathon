export function InfoBox({ nodeData }) {
  const { id, stringId, ncbiTaxonId } = nodeData;

  return (
    <div id="infoBox">
      {`${id}\n
    stringId: ${stringId}\n
    ncbiTaxonId: ${ncbiTaxonId}`}
    </div>
  );
}
