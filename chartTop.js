function chartTop_cssStyle(w) {}

function chartTop_beforeRender(w, type) {
  const labelFontSize = "14px";
  const labelFontSizeZoom = "22px";
  const titleFontSize = "16px";
  const titleFontSizeZoom = "22px";
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

  let isZoomed = document
    .getElementById(w.general.renderTo)
    .classList.contains("modal");

  w.tooltip.style.fontSize = isZoomed ? labelFontSizeZoom : labelFontSize;
  w.xAxis.labels.style.fontSize = isZoomed ? labelFontSizeZoom : labelFontSize;
  w.yAxis.labels.style.fontSize = isZoomed ? labelFontSizeZoom : labelFontSize;
  w.yAxis.title.style.fontSize = isZoomed ? titleFontSizeZoom : titleFontSize;

  return w;
}

function chartTop_afterRender(chart, type, w) {
  let tickAmount = 7;
  let maxVal = chart.yAxis[0].max;
  let isZoomed = document
    .getElementById(w.general.renderTo)
    .classList.contains("modal");

  chart.update({
    chart: {
      marginRight: 25,
      marginBottom: isZoomed ? 80 : 60,
    },
    yAxis: {
      tickAmount: tickAmount,
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
      },
      title: {
        text: chartAxisAdaptiveTitle(maxVal, type),
        align: "high",
        rotation: 0,
        offset: 0,
        x: 10,
        y: isZoomed ? 40 : 30,
      },
    },
    xAxis: {
      labels: {
        align: "left",
        reserveSpace: true,
      },
    },
    tooltip: {
      formatter: function () {
        return chartAxisAdaptiveTitle(this.y, type);
      },
    },
  });

  return chart;
}
