//https://dekan006.github.io/visiology/liba.js
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

function checkNoData(w) {
  if (!w.data.values[0][0]) {
    $(".table-nodata").remove();
    const element = document.createElement("div");
    element.className = "table-nodata";
    element.style =
      "position: absolute; display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 980; font-family: Roboto; background-color: rgba(255,255,255,1); top:240px; left:0px; right:0px; bottom:0px; border-radius: 10px";
    element.innerHTML = `<div style="font-size: 98px; color: silver"><i class="fa fa-times-circle-o" aria-hidden="true"></i></div>
        <div style="font-size: 28px">По заданным фильтрам нет данных</div>`;

    $(".va-widgets-container").append(element);
  } else {
    $(".table-nodata").remove();
  }
}
