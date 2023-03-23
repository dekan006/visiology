//https://dekan006.github.io/visiology/liba.js

function formatTooltipChart(thisData, type) {
  return (
    // thisData.key + ": " + convertAxisAdaptive(thisData.y, thisData.y, type)
    convertAxisAdaptive(thisData.y, thisData.y, type)
  );
}

function extendObj(obj1, obj2) {
  for (let a in obj2) {
    obj1[a] = obj2[a];
  }
  return obj1;
}

function addCss(css) {
  document.head.appendChild(document.createElement("style")).innerHTML = css;
}

console.log("LIBA RUN***************");
