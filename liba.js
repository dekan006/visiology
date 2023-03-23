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

let arrayFilterAdd = [
  "Федеральный уровень",
  "Уровень субъекта РФ",
  "Муниципальный уровень",
  "Иные",
  //   "****Прочие*****",
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

function cssStyleFilterYear(w) {
  var widget = $("#" + w.general.renderTo);

  //Изменить шрифт вложеных значений
  widget.find(".rb-filter-list-item-text").attr("style", "font-size: 18px");
  widget.find(".rb-filter-exclude-container").attr("style", "font-size: 18px");

  //изменить стрелку выпадающего меню
  widget.find(".rb-filter-header-arrow").css({ color: "#0033FF" });
  // Изменить крестик выпадающего меню
  widget.find(".rb-filter-header-close").css({ color: "#0033FF" });

  //скрыть кнопи 'Выбрать отображаемое' и  'снять выделение'
  widget
    .find(".rb-filter-selection-buttons-container")
    .css({ display: "none" });
  widget.find(".rb-filter-header-arrow").css({ color: "#0033FF" });

  // Высота выпадающего списка
  widget.find(".rb-filter-body-container .rb-filter-list-container > ul").css({
    height: "auto",
    "max-height": "500px",
  });
  // Мин Ширина выпадающего списка и ширина выпадающего списка
  widget
    .find(".rb-filter-body-container")
    .css({ "min-width": "310px", width: "310px" });

  // Изменяем цвет контура фильтра
  widget
    .find(".rb-filter-header-container")
    .css({ border: "1px solid #C4CDD6" });
  // Изменяем скругление контура фильтра
  widget.find(".rb-filter-header-container").css({ "border-radius": "20px" });

  //скрыть кнопки 'Выбрать отображаемое' и  'снять выделение'
  $("#widget-" + w.general.renderTo)
    .find(".rb-filter-selection-buttons-container")
    .css({ display: "none" });
}
