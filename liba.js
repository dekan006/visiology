//https://cdn.jsdelivr.net/gh/dekan006/visiology/liba.js
function convertAxisAdaptive(value, max, type) {
  if (!type) {
    type = "";
  }
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

function formatTooltipChart(thisData, type) {
  return (
    thisData.key + ": " + convertAxisAdaptive(thisData.y, thisData.y, type)
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

let arrayFilterAdd = [
  "Федеральный уровень",
  "Уровень субъекта РФ",
  "Муниципальный уровень",
  "Иные",
];
let arrayFilterRemove = ["<Пусто>", "<ОТСЕВ>", "НЕ ОПРЕДЕЛЕНО"];

function updateFilterValue(arr) {
  if (arrayFilterAdd.length > 0) {
    arr.length = 0;
    arrayFilterAdd.map((item, index) => {
      arr[index] = {
        text: item,
        id: item,
        lazyLoading: false,
      };
    });
  }
  return arr.filter((item, index) => {
    return arrayFilterRemove.indexOf(item.text) < 0;
  });
}
