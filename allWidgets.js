function convertAxisAdaptive(value, max, type = "", fixed = 2) {
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

function addCss(css) {
  document.head.appendChild(document.createElement("style")).innerHTML = css;
}

function copy(aObject) {
  const bObject = Array.isArray(aObject) ? [] : {};

  let value;
  for (const key in aObject) {
    value = aObject[key];
    bObject[key] = typeof value === "object" ? copy(value) : value;
  }

  return bObject;
}

function chartAxisAdaptiveLabel(value, max, fixed = 2) {
  let label = "";
  if (max < 1000) {
    label = addSpaceFixed(value, fixed);
  }
  if (max < 1000000) {
    label = addSpaceFixed(Math.round(value / 10) / 100, fixed);
  }
  if (max < 1000000000) {
    label = addSpaceFixed(Math.round(value / 10000) / 100, fixed);
  }
  if (max < 1000000000000) {
    label = addSpaceFixed(Math.round(value / 10000000) / 100, fixed);
  }
  if (max >= 1000000000000) {
    label = addSpaceFixed(Math.round(value / 10000000000) / 100, fixed);
  }
  return label;
}

function chartAxisAdaptiveTitle(max, type) {
  let title = "";
  if (max < 1000) {
    title = " " + type;
  }
  if (max < 1000000) {
    title = " тыс " + type;
  }
  if (max < 1000000000) {
    title = " млн " + type;
  }
  if (max < 1000000000000) {
    title = " млрд " + type;
  }
  if (max >= 1000000000000) {
    title = " трлн " + type;
  }
  return title;
}
//
