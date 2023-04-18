function chartColumn_formatTooltip(thisData, type) {
  return (
    // thisData.key + ": " + convertAxisAdaptive(thisData.y, thisData.y, type)
    thisData.key + ": " + convertAxisAdaptive(thisData.y, thisData.y, type)
  );
}

function chartColumn_cssStyle(w) {
  const widgetId = $("#widget-" + w.general.renderTo);
  const headerContainer = widgetId.find(".va-widget-header-container");

  const zoom = document.createElement("div");
  zoom.className = "chart-icon-zoom-" + w.general.renderTo;
  zoom.style.paddingLeft = "10px";
  zoom.style.cursor = "pointer";
  zoom.innerHTML = iconZoomSVG;
  headerContainer.prepend(zoom);
}

function chartColumn_beforeRender(w, type) {
  const widgetId = $("#widget-" + w.general.renderTo);
  const labelFontSize = "14px";
  const labelFontSizeZoom = "22px";
  const titleAxisFontSize = "16px";
  const titleAxisSizeZoom = "22px";

  // Изменение стилей текста
  w.drilldown.activeAxisLabelStyle.fontFamily = "Roboto";
  w.drilldown.activeDataLabelStyle.fontFamily = "Roboto";
  w.legend.itemStyle.fontFamily = "Roboto";
  w.plotOptions.series.dataLabels.style.fontFamily = "Roboto";
  w.xAxis.title.style.fontFamily = "Roboto";
  w.yAxis.title.style.fontFamily = "Roboto";
  w.xAxis.labels.style.fontFamily = "Roboto";
  w.yAxis.labels.style.fontFamily = "Roboto";
  w.tooltip.style.fontFamily = "Roboto";

  const isZoomed = document
    .getElementById(w.general.renderTo)
    .classList.contains("modal");

  widgetId.find(".va-widget-header")[0].style.fontSize = isZoomed
    ? "26px"
    : "21px";
  w.legend.itemStyle.fontSize = isZoomed ? labelFontSizeZoom : labelFontSize;
  w.tooltip.style.fontSize = isZoomed ? labelFontSizeZoom : labelFontSize;
  w.plotOptions.series.dataLabels.style.fontSize = isZoomed
    ? labelFontSizeZoom
    : labelFontSize;
  w.xAxis.labels.style.fontSize = isZoomed ? labelFontSizeZoom : labelFontSize;
  w.xAxis.title.style.fontSize = isZoomed
    ? titleAxisSizeZoom
    : titleAxisFontSize;
  w.yAxis.labels.style.fontSize = isZoomed ? labelFontSizeZoom : labelFontSize;
  w.yAxis.title.style.fontSize = isZoomed
    ? titleAxisSizeZoom
    : titleAxisFontSize;
  w.yAxis.stackLabels.style.fontSize = isZoomed
    ? labelFontSizeZoom
    : labelFontSize;

  // толщина линии графика
  w.series.map((elem) => {
    elem.lineWidth = 5;
  });

  if (document.getElementById(w.general.renderTo).classList.contains("modal")) {
    w.general.marginTop = 20;
    w.general.marginLeft = 90;
    w.tooltip.style.fontSize = labelFontSizeZoom;
  } else {
    w.general.marginTop = 10;
    w.general.marginLeft = 60;
    w.tooltip.style.fontSize = labelFontSize;
  }

  w.xAxis.categories = sortByMonth(w.xAxis.categories);
  function sortByMonth(arr) {
    const months = [
      "январь",
      "февраль",
      "март",
      "апрель",
      "май",
      "июнь",
      "июль",
      "август",
      "сентябрь",
      "октябрь",
      "ноябрь",
      "декабрь",
    ];
    arr.sort((a, b) => months.indexOf(a) - months.indexOf(b));
    return arr;
  }

  return w;
}

function chartColumn_afterRender(chart, type, w) {
  const widgetId = $("#widget-" + w.general.renderTo);
  const isZoomed = document
    .getElementById(w.general.renderTo)
    .classList.contains("modal");
  const maxVal = chart.yAxis[0].max; // получаем максимальное значение оси Y
  // let tickAmount =
  //   chart.yAxis[0].tickPositions.length > 10
  //     ? 10
  //     : chart.yAxis[0].tickPositions.length;
  let tickAmount = 7;

  chart.update({
    chart: {
      marginLeft: isZoomed ? 90 : 65,
      marginTop: isZoomed ? 20 : 10,
    },
    // добавляем сверху заголовок единиц измерений
    yAxis: {
      tickAmount: tickAmount,
      title: {
        text: chartAxisAdaptiveTitle(maxVal, type),
        align: "high",
        rotation: 0,
        style: {
          fontSize: isZoomed ? "22px" : "16px",
          fontWeight: "normal",
        },
        offset: 0,
        x: isZoomed ? 35 : 25,
        y: isZoomed ? -20 : -15,
      },
      // форматирование значений для оси измерений
      labels: {
        formatter: function formatter() {
          let tick = this.axis.tickPositions;
          if (this.value === 0) {
            return 0;
          }
          let arr = tick.map((item) =>
            chartAxisAdaptiveLabel(item, this.axis.max).slice(-2)
          );
          let fixed = 2;
          if (arr.every((elem) => elem.charAt(1) === "0")) {
            fixed = 1;
          }
          if (arr.every((elem) => elem === "00")) {
            fixed = 0;
          }
          return chartAxisAdaptiveLabel(this.value, this.axis.max, fixed);
        },
        x: -20,
      },
    },
    plotOptions: {
      series: {
        events: {
          legendItemClick(e) {
            e.preventDefault(); // отменяет действия мыши на легенде графика
            return false;
          },
        },
      },
    },
    tooltip: {
      formatter: function () {
        return chartColumn_formatTooltip(this, type);
      },
    },
  });

  // Сделать видимой область графика которая выходит за пределы контейнера с графиком (необходимо для yAxis.title)
  $("#" + w.general.renderTo).css({ overflow: "visible" });
  widgetId.find(".highcharts-container").css({ overflow: "visible" });
  widgetId.find("svg.highcharts-root").attr("overflow", "visible");

  return chart;
}
