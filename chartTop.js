const chartTop = {
  fontFamily: "Roboto",
  labelFontSize: "14px",
  labelFontSizeZoom: "22px",
  titleFontSize: "16px",
  titleFontSizeZoom: "22px",
  updateFont: function (w) {
    // Изменение стилей текста
    w.drilldown.activeAxisLabelStyle.fontFamily = this.fontFamily;
    w.drilldown.activeDataLabelStyle.fontFamily = this.fontFamily;
    w.legend.itemStyle.fontFamily = this.fontFamily;
    w.plotOptions.series.dataLabels.style.fontFamily = this.fontFamily;
    w.xAxis.title.style.fontFamily = this.fontFamily;
    w.yAxis.title.style.fontFamily = this.fontFamily;
    w.xAxis.labels.style.fontFamily = this.fontFamily;
    w.yAxis.labels.style.fontFamily = this.fontFamily;
    w.tooltip.style.fontFamily = this.fontFamily;

    let isZoomed = document
      .getElementById(w.general.renderTo)
      .classList.contains("modal");

    w.tooltip.style.fontSize = isZoomed
      ? this.labelFontSizeZoom
      : this.labelFontSize;
    w.xAxis.labels.style.fontSize = isZoomed
      ? this.labelFontSizeZoom
      : this.labelFontSize;
    w.yAxis.labels.style.fontSize = isZoomed
      ? this.labelFontSizeZoom
      : this.labelFontSize;
    w.yAxis.title.style.fontSize = isZoomed
      ? this.titleFontSizeZoom
      : this.titleFontSize;

    return w;
  },
  tickAmount: function (w, amount) {
    w.yAxis.tickAmount = amount || 7; //На сколько значений разбивать ось значений
    return w;
  },
  updateChart: function (chart, type, w) {
    let maxVal = chart.yAxis[0].max;
    let isZoomed = document
      .getElementById(w.general.renderTo)
      .classList.contains("modal");

    chart.update({
      chart: {
        marginRight: isZoomed ? 40 : 30, // Отступы графика
        marginBottom: isZoomed ? 80 : 60,
      },
      yAxis: {
        labels: {
          formatter: function formatter() {
            let tick = this.axis.tickPositions;
            if (this.value === 0) {
              return 0;
            }
            let arr = tick.map((item) =>
              lib.chartAxisAdaptiveLabel(item, this.axis.max).slice(-2)
            );
            let fixed = 2;
            if (arr.every((elem) => elem.charAt(1) === "0")) {
              fixed = 1;
            }
            if (arr.every((elem) => elem === "00")) {
              fixed = 0;
            }
            return lib.chartAxisAdaptiveLabel(this.value, this.axis.max, fixed);
          },
        },
        title: {
          text: lib.chartAxisAdaptiveTitle(maxVal, type),
          align: "high",
          rotation: 0,
          offset: 0,
          x: isZoomed ? 25 : 15,
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
          return lib.convertAxisAdaptive(this.y, this.y, type);
        },
      },
    });

    return chart;
  },
};

function chartTop_cssStyle(w) {}

function chartTop_beforeRender(w, type) {
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

  w.yAxis.tickAmount = 7; //На сколько значений разбивать ось значений

  return w;
}

function chartTop_afterRender(chart, type, w) {
  let maxVal = chart.yAxis[0].max;
  let isZoomed = document
    .getElementById(w.general.renderTo)
    .classList.contains("modal");

  chart.update({
    chart: {
      marginRight: isZoomed ? 40 : 30,
      marginBottom: isZoomed ? 80 : 60,
    },
    yAxis: {
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
        x: isZoomed ? 25 : 15,
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
        return convertAxisAdaptive(this.y, this.y, type);
      },
    },
  });

  return chart;
}
