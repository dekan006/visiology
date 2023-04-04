// основание единственного поставщика
// фильтр Статус контракта
function filterFoundationSingleSupplier_updateData(w) {
  return w;
}

function filterFoundationSingleSupplier_cssStyle(w) {
  var widget = $("#" + w.general.renderTo);

  let width = 620; // Ширина выпадающего списка виджета. Если 0 - остается неизменна
  let height = 0; // Высота выпадающего списка виджета. Если 0 - остается неизменна
  var listPosition = "left"; // Выравнивание выпадающего списка right или left

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
    "max-height": height ? height + "px" : "500px",
  });
  // Мин Ширина выпадающего списка и ширина выпадающего списка
  widget
    .find(".rb-filter-body-container")
    .css({ "min-width": "310px", width: width ? width + "px" : "310px" });

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
  // Позиционирование выпадающего списка
  widget.find(".rb-filter-body-container").css({
    position: "absolute",
    [listPosition]: 0,
  });
  // размер шрифта в поле поиска
  widget
    .find(".rb-filter-search")
    .css({
      "font-size": "18px",
      "padding-top": "7px",
      "padding-bottom": "7px",
    });
}
