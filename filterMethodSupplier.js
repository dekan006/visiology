// фильтр Способ определения поставщика
function filterMethodSupplier_updateData(w) {
  return w;
}

function filterMethodSupplier_cssStyle(w) {
  const width = w.props.width || 0; // Ширина выпадающего списка виджета. Если 0 - остается неизменна
  const height = w.props.height || 510; // Высота выпадающего списка виджета. Если 0 - остается неизменна
  const widgetId = $("#widget-" + w.general.renderTo);
  const widget = $("#" + w.general.renderTo);

  widget.css({
    background: "white",
    display: "block",
  });

  widgetId.css({
    "font-family": "Roboto",
    "z-index": "999",
  });

  widgetId.find(".rb-filter-cloud-tag-container").css({
    "font-family": "Roboto",
    margin: "0 0 5px 0",
    "font-size": "14px",
  });

  widgetId.find(".filter-selection-buttons").css({
    display: "none",
    "font-size": "20px",
  });

  widgetId.find(".rb-filter-exclude-container").css({
    display: "none",
  });

  widgetId.find(".va-widget-body-container").css({
    display: "none",
    width: width ? width + "px" : "",
    overflow: "hidden",
    border: "1px solid #ededed",
    "margin-top": "0px",
    padding: "10px",
    "background-color": "white",
    cursor: "default",
  });

  widgetId.find(".button").css({
    padding: "10px",
    cursor: "pointer",
    "text-transform": "uppercase",
    color: "#3ea3f5",
    "font-size": "13px",
    "font-style": "normal",
    "font-weight": "normal",
    "font-family": "Roboto",
  });

  widgetId.find(".button").hover(
    function () {
      $(this).css("opacity", "0.7");
    },
    function () {
      $(this).css("opacity", "1");
    }
  );

  widgetId.find(".rb-filter-apply-button").css({
    color: "white",
    "background-color": "#3ea3f5",
  });

  widgetId.find(".dx-visibility-change-handler").css({
    "border-top": "1px solid #ededed",
    "border-bottom": "1px solid #ededed",
    height: height ? height + "px" : "",
  });

  widgetId.find(".dx-scrollable-content").css({
    height: "100%",
  });

  widgetId.find(".dx-treeview-node-container").css({
    height: "100%",
    margin: "0",
    padding: "0",
    "list-style": "none",
    overflow: "auto",
    "font-size": "18px",
  });

  widgetId.find(".dx-texteditor-input").css({
    padding: "5px 10px",
  });

  //изменить стрелку выпадающего меню
  $(".rb-filter-header-arrow").css({
    color: "#0033FF",
  });
  $(".rb-filter-header-close").css({
    color: "#0033FF",
  });

  widgetId.find(".dx-texteditor-input")[0].classList.add("rb-filter-search");
  widgetId.addClass("widgetHeight");

  let styleMagicLabel = document.createElement("style");
  styleMagicLabel.className = "style-magic-label-" + w.general.renderTo;
  let styleWidgetHeight = document.createElement("style");
  styleWidgetHeight.className = "style-widget-height-" + w.general.renderTo;
  styleMagicLabel.innerText = ".magic + label:after{top: 5px;left: 5px;}";
  styleWidgetHeight.innerText = ".widgetHeight {display: table-caption;}";
  document.body.appendChild(styleMagicLabel);
  document.body.appendChild(styleWidgetHeight);

  let checkboxStateFocused = document.createElement("style");
  checkboxStateFocused.className =
    "checkbox-state-focused-" + w.general.renderTo;
  checkboxStateFocused.innerText =
    ".dx-treeview-item-with-checkbox.dx-state-focused > .dx-checkbox .dx-checkbox-icon {border: 1px solid #47c148;}";
  document.body.appendChild(checkboxStateFocused);

  let checkboxStateHover = document.createElement("style");
  checkboxStateHover.className = "checkbox-state-hover-" + w.general.renderTo;
  checkboxStateHover.innerText =
    ".dx-checkbox.dx-state-hover .dx-checkbox-icon {border: 1px solid #47c148;}";
  document.body.appendChild(checkboxStateHover);

  let checkboxIconBefore = document.createElement("style");
  checkboxIconBefore.className = "checkbox-icon-before-" + w.general.renderTo;
  checkboxIconBefore.innerText =
    ".dx-checkbox-indeterminate .dx-checkbox-icon::before {background-color: #47c148;}";
  document.body.appendChild(checkboxIconBefore);

  let checkboxChecked = document.createElement("style");
  checkboxChecked.className = "checkbox-checked-" + w.general.renderTo;
  checkboxChecked.innerText =
    ".dx-checkbox-checked .dx-checkbox-icon::before  {color: white; background-color: #47c148;width: 20px;height: 20px;margin-left: 0;margin-top: 0;top: -1px;left: -1px;padding-top: 2px;} .dx-checkbox-icon{width: 20px; height: 20px; font-size: 14px; font-weight: 900;}";
  document.body.appendChild(checkboxChecked);

  let checkboxContainer = document.createElement("style");
  checkboxContainer.className = "checkbox-container-" + w.general.renderTo;
  checkboxContainer.innerText =
    ".dx-checkbox-icon {border-radius: 5px;} .dx-checkbox-container{border-radius: 5px;} .dx-checkbox-checked .dx-checkbox-icon {font: bold 15px DXIcons;}";
  document.body.appendChild(checkboxContainer);

  // Изменяем цвет контура фильтра
  widgetId
    .find(".rb-filter-header-container")
    .css({ border: "1px solid #C4CDD6" });
  // Изменяем скругление контура фильтра
  widgetId.find(".rb-filter-header-container").css({ "border-radius": "20px" });

  // Мин Ширина выпадающего списка и ширина выпадающего списка
  widgetId
    .find(".rb-filter-body-container")
    .css({ "min-width": "310px", width: "310px" });
  // Цвет и шрифт элементов списка
  widgetId
    .find(".dx-widget")
    .css({ "font-family": "Roboto", color: "#334059" });
  // Шрифт и цвет текста выбранных значений
  widgetId
    .find(".rb-tag-title")
    .css({ "font-family": "Roboto", color: "#334059 !important" });
}
