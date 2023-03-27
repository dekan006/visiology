const defaultColor1 = "#60769f"; // цвет текста не выбранного элемента
const activeColor1 = "#115dee"; // цвет текста выбранного элемента
const backgroundColor1 = "#f5f5f7"; // цвет фона выбранного элемента

document.head.appendChild(document.createElement("style")).innerHTML = `
    .dx-item-selected {
        background: ${backgroundColor1} !important;
        color: ${activeColor1} !important;
    }`;

function buttonGroup_cssStyle(w) {
  const widgetId = $("#widget-" + w.general.renderTo);

  widgetId.find(".dx-button-text").css({
    "font-size": "18px",
    "line-height": "20px",
    "font-weight": "500",
  });

  widgetId.find(".dx-item").css({
    color: defaultColor1,
  });
}
