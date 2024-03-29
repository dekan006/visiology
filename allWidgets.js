const lib = {
  convertAxisAdaptive: function (value, max, type = "", fixed = 2) {
    if (max < 1000) {
      return this.addSpaceFixed(value, fixed) + " " + type;
    }
    if (max < 1000000) {
      return (
        this.addSpaceFixed(Math.round(value / 10) / 100, fixed) + " тыс " + type
      );
    }
    if (max < 1000000000) {
      return (
        this.addSpaceFixed(Math.round(value / 10000) / 100, fixed) +
        " млн " +
        type
      );
    }
    if (max < 1000000000000) {
      return (
        this.addSpaceFixed(Math.round(value / 10000000) / 100, fixed) +
        " млрд " +
        type
      );
    }
    return (
      this.addSpaceFixed(Math.round(value / 10000000000) / 100, fixed) +
      " трлн " +
      type
    );
  },
  addSpaceFixed: function (value, fixed) {
    return value
      .toFixed(fixed)
      .replace(/\./, ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  },
  addCss: function (css) {
    const style = document.createElement("style");
    style.type = "text/css";
    style.textContent = css;
    document.head.appendChild(style);
  },
  copy: function (aObject) {
    const bObject = Array.isArray(aObject) ? [] : {};

    let value;
    for (const key in aObject) {
      value = aObject[key];
      bObject[key] = typeof value === "object" ? this.copy(value) : value;
    }

    return bObject;
  },
  chartAxisAdaptiveLabel: function (value, max, fixed = 2) {
    if (max < 1000) {
      return this.addSpaceFixed(value, fixed);
    }
    if (max < 1000000) {
      return this.addSpaceFixed(Math.round(value / 10) / 100, fixed);
    }
    if (max < 1000000000) {
      return this.addSpaceFixed(Math.round(value / 10000) / 100, fixed);
    }
    if (max < 1000000000000) {
      return this.addSpaceFixed(Math.round(value / 10000000) / 100, fixed);
    }
    return this.addSpaceFixed(Math.round(value / 10000000000) / 100, fixed);
  },
  chartAxisAdaptiveTitle: function (max, type) {
    const units = [" ", " тыс", " млн", " млрд", " трлн"];
    const index = Math.floor(Math.log10(max) / 3);
    return units[index] + type;
  },
};

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
    .replace(/\./, ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function addCss(css) {
  const style = document.createElement("style");
  style.type = "text/css";
  style.textContent = css;
  document.head.appendChild(style);
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
  if (max < 1000) {
    return addSpaceFixed(value, fixed);
  }
  if (max < 1000000) {
    return addSpaceFixed(Math.round(value / 10) / 100, fixed);
  }
  if (max < 1000000000) {
    return addSpaceFixed(Math.round(value / 10000) / 100, fixed);
  }
  if (max < 1000000000000) {
    return addSpaceFixed(Math.round(value / 10000000) / 100, fixed);
  }
  return addSpaceFixed(Math.round(value / 10000000000) / 100, fixed);
}

// function chartAxisAdaptiveLabel(value, max, fixed = 2) {
//   let divider = 1;
//   let labels = [
//   { max: 1000, divider: 1 },
//   { max: 1000000, divider: 100 },
//   { max: 1000000000, divider: 10000 },
//   { max: 1000000000000, divider: 10000000 }
//   ];

//   for (let label of labels) {
//   if (max < label.max) {
//   divider = label.divider;
//   break;
//   }
//   }

//   let roundedValue = Math.round(value / divider) / 100;
//   return addSpaceFixed(roundedValue, fixed);
//   }

//function chartAxisAdaptiveTitle(max, type) {
//   if (max < 1000) {
//     return " " + type;
//   }
//   if (max < 1000000) {
//     return " тыс " + type;
//   }
//   if (max < 1000000000) {
//     return " млн " + type;
//   }
//   if (max < 1000000000000) {
//     return " млрд " + type;
//   }
//   return " трлн " + type;
// }

function chartAxisAdaptiveTitle(max, type) {
  const units = [" ", " тыс", " млн", " млрд", " трлн"];
  const index = Math.floor(Math.log10(max) / 3);
  return units[index] + type;
}

const iconZoomSVG =
  '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="26px" height="26px"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"/></svg>';
//
