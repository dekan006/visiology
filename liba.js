//https://dekan006.github.io/visiology/liba.js

function extendObj(obj1, obj2) {
  for (let a in obj2) {
    obj1[a] = obj2[a];
  }
  return obj1;
}

function chartColumn_formatTooltip(thisData, type) {
  return (
    // thisData.key + ": " + convertAxisAdaptive(thisData.y, thisData.y, type)
    convertAxisAdaptive(thisData.y, thisData.y, type)
  );
}

console.log("LIBA RUN***************");

// merge test
// merge test main 3
