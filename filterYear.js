// filterId - 01 Фильтр Дата заключения контракта

function filterYear_updateData(w, props) {
  const minYear = props.minYear || 2020; // Минимальный год выдачи, не может быть меньше 2000 года
  const maxYear = props.maxYear || 2023; // Максимальный год выдачи, не может быть больше текущего года

  w.data.data = filteredYears(w.data.data, minYear, maxYear);

  function filteredYears(filterArray, minYear, maxYear) {
    const date = new Date();
    const currentYear = date.getFullYear();

    if (!filterArray || !Array.isArray(filterArray))
      return w.data.data.filter(
        (item) => +item.id >= 0 && +item.id <= currentYear
      );
    if (!minYear || !Number.isFinite(minYear) || +minYear < 2000)
      minYear = 2000;
    if (!maxYear || !Number.isFinite(maxYear) || +maxYear > currentYear)
      maxYear = currentYear;

    return filterArray.filter(
      (item) => +item.id >= minYear && +item.id <= maxYear
    );
  }

  return w;
}

function filterYear_cssStyle(w, props) {
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
  widget.find(".rb-filter-body-container").css({
    "min-width": "310px",
    width: props.width ? props.width + "px" : "310px",
  });

  // Мин высота выпадающего списка
  widget.find(".rb-filter-list-container").css({
    "min-height": "200px",
    height: props.height ? props.height + "px" : "200px",
  });

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
  if (props.listPosition) {
    widget.find(".rb-filter-body-container").css({
      position: "absolute",
      [props.listPosition]: 0,
    });
  }
}
