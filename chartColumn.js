function chartColumn_formatTooltip(thisData, type) {
  return (
    // thisData.key + ": " + convertAxisAdaptive(thisData.y, thisData.y, type)
    convertAxisAdaptive(thisData.y, thisData.y, type)
  );
}
