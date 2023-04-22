const buttonGroup = {
  defaultColor: "#60769f", // цвет текста не выбранного элемента
  activeColor: "#115dee", // цвет текста выбранного элемента
  backgroundColor: "#f5f5f7", // цвет фона выбранного элемента
  cssStyle: function (w) {
    const widgetId = $("#widget-" + w.general.renderTo);
    document.head.appendChild(document.createElement("style")).innerHTML = `
    .dx-item-selected {
        background: ${this.backgroundColor} !important;
        color: ${this.activeColor} !important;
    }`;

    widgetId.find(".dx-button-text").css({
      "font-size": "18px",
      "line-height": "20px",
      "font-weight": "500",
    });

    widgetId.find(".dx-item").css({
      color: this.defaultColor,
    });
  },
};

function buttonGroup_cssStyle(w) {
  const defaultColor = "#60769f"; // цвет текста не выбранного элемента
  const activeColor = "#115dee"; // цвет текста выбранного элемента
  const backgroundColor = "#f5f5f7"; // цвет фона выбранного элемента

  const widgetId = $("#widget-" + w.general.renderTo);

  document.head.appendChild(document.createElement("style")).innerHTML = `
    .dx-item-selected {
        background: ${backgroundColor} !important;
        color: ${activeColor} !important;
    }`;

  widgetId.find(".dx-button-text").css({
    "font-size": "18px",
    "line-height": "20px",
    "font-weight": "500",
  });

  widgetId.find(".dx-item").css({
    color: defaultColor,
  });
}
