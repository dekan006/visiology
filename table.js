function table_beforeRender(w, props) {
  // Стиль текста заголовков столбцов
  w.style.columnCell = {
    "font-family": "Roboto",
    "font-weight": "400",
    "font-size": "18px",
    color: "#334059",
    "background-color": "#F0F3FF",
    "vertical-align": "top",
    "text-align": "left",
  };

  w.style.dataCell = {
    "font-family": "Roboto",
    "font-size": "16px",
    "background-color": "rgba(255, 255, 255, 0)",
    color: "rgb(51, 64, 89)",
    "font-weight": "normal",
    "font-style": "normal",
  };

  w.style.rowCell = {
    "font-family": "Roboto",
    "font-size": "16px",
    "background-color": "rgba(255, 255, 255, 0)",
    color: "rgb(51, 64, 89)",
    "font-weight": "normal",
    "font-style": "normal",
    //   'white-space': 'nowrap'
  };

  return w;
}

function table_afterRender(w, props) {
  const wigetId = $("#widget-" + w.general.renderTo);
  const widget = $("#" + w.general.renderTo);

  return w;
}
