//https://cdn.jsdelivr.net/gh/dekan006/visiology/liba.js
function convertAxisAdaptive(value, max, type) {
  let fixed = 2;
  if (max < 1000) {
    return addSpaceFixed(value, fixed) + " " + type;
  }
  if (max < 1000000) {
    return addSpaceFixed(Math.round(value / 10) / 100, fixed) + " тыс " + type;
  }
  if (max < 1000000000) {
    return (
      addSpaceFixed(Math.round(value / 10000) / 100, fixed) + " млн " + type
    );
  }
  if (max < 1000000000000) {
    return (
      addSpaceFixed(Math.round(value / 10000000) / 100, fixed) + " млрд " + type
    );
  }
  return (
    addSpaceFixed(Math.round(value / 10000000000) / 100, fixed) +
    " трлн " +
    type
  );
}

function addSpaceFixed(value, fixed) {
  return value
    .toFixed(fixed)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    .replace(".", ",");
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
