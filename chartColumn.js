function chartColumn_formatTooltip(thisData, type) {
  return (
    // thisData.key + ": " + convertAxisAdaptive(thisData.y, thisData.y, type)
    thisData.key + ": " + convertAxisAdaptive(thisData.y, thisData.y, type)
  );
}

function chartColumn_cssStyle(w) {
  const wigetId = $("#widget-" + w.general.renderTo);
  const headerContainer = wigetId.find(".va-widget-header-container");

  const zoom = document.createElement("img");
  zoom.className = "chart-zoom-" + w.general.renderTo;
  zoom.style.cursor = "pointer";
  zoom.style.paddingLeft = "10px";
  zoom.src = "https://img.icons8.com/ios/25/null/search--v1.png";

  headerContainer.prepend(zoom);
}
