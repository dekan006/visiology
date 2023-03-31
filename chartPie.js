function chartPie_formatTooltip(thisData, type) {
  return (
    // thisData.key + ": " + convertAxisAdaptive(thisData.y, thisData.y, type)
    thisData.key +
    ": " +
    convertAxisAdaptive(thisData.y, thisData.y, type) +
    "(" +
    addSpaceFixed(thisData.percentage, 2) +
    "%)"
  );
}

function chartPie_cssStyle(w) {
  const wigetId = $("#widget-" + w.general.renderTo);
  const headerContainer = wigetId.find(".va-widget-header-container");

  const zoom = document.createElement("img");
  zoom.className = "chart-zoom-" + w.general.renderTo;
  zoom.style.cursor = "pointer";
  zoom.style.paddingLeft = "10px";
  zoom.src = "https://img.icons8.com/ios/25/null/search--v1.png";

  headerContainer.prepend(zoom);
}

function chartPie_beforeRender(w, type) {
  w.plotOptions.pie.dataLabels.style.fontFamily = "Roboto";
  w.legend.itemStyle.fontFamily = "Roboto";
  w.tooltip.style.fontFamily = "Roboto";
  w.plotOptions.pie.dataLabels.style = {
    align: "center",
    color: "white", // Цвет цифрового значения
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: "bold",
    fontStyle: "normal",
    textOverflow: "none",
  };

  return w;
}

function chartPie_afterRender(chart, type) {
  chart.update({
    chart: {},
    plotOptions: {
      series: {
        events: {
          legendItemClick(e) {
            e.preventDefault();
            return false;
          },
        },
      },
      pie: {
        dataLabels: {
          enabled: true,
          style: {
            textOutline: "none", // '1px white'
          },
        },
      },
    },
    tooltip: {
      formatter: function () {
        return chartPie_formatTooltip(this, type);
      },
    },
  });

  return chart;
}

function chartPie_sortByBudget(arr) {
  const level = [
    "Федеральный уровень",
    "Уровень субъекта РФ",
    "Муниципальный уровень",
    "Иные",
  ];
  arr.sort((a, b) => level.indexOf(a.name) - level.indexOf(b.name));
  return arr;
}
