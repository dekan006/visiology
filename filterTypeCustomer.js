// filterId - 03 фильтр Тип организации заказчика

function filterTypeCustomer_updateData(w) {
  return w;
}

function filterTypeCustomer_cssStyle(w) {
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
    "max-height": "800px",
  });
  // Мин Ширина выпадающего списка и ширина выпадающего списка
  widget
    .find(".rb-filter-body-container")
    .css({ "min-width": "310px", width: "500px" });

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
