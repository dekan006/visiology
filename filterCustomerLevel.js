// filterId - 02 фильтр Уровень организации заказчика
function filterCustomerLevel_updateData(w) {
  w.data.data = updateFilterValue(w.data.data);
  w.data.data.sort(function (a, b) {
    return a.text > b.text ? -1 : 1;
  });
  return w;
}

let arrayFilterAdd = [
  //   "Федеральный уровень",
  //   "Уровень субъекта РФ",
  //   "Муниципальный уровень",
  //   "Иные",
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
  return arr.filter((item) => {
    return arrayFilterRemove.indexOf(item.text) < 0;
  });
}

function filterCustomerLevel_cssStyle(w) {
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

function filterCustomerLevel_checkBudgetLevel(
  infoBudgetLevel,
  idGRBS,
  idSubjectRF
) {
  if (
    infoBudgetLevel.length === 1 &&
    infoBudgetLevel[0][0] === "Федеральный уровень"
  ) {
    $("#widget-" + idSubjectRF).css({
      "pointer-events": "none",
      opacity: "0",
    });
    $("#widget-" + idGRBS).css({
      "pointer-events": "all",
      opacity: "1",
    });
  } else {
    $("#widget-" + idSubjectRF).css({
      "pointer-events": "all",
      opacity: "1",
    });
    $("#widget-" + idGRBS).css({
      "pointer-events": "none",
      opacity: "0",
    });
  }
}
