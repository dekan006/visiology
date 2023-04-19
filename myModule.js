const chartColumn = {
  fontFamily: "Roboto",
  labelFontSize: "14px",
  labelFontSizeZoom: "22px",
  titleAxisFontSize: "16px",
  titleAxisSizeZoom: "22px",

  updateFont: function (w) {
    const widgetId = $("#widget-" + w.general.renderTo);

    w.drilldown.activeAxisLabelStyle.fontFamily = this.fontFamily;
    w.drilldown.activeDataLabelStyle.fontFamily = this.fontFamily;
    w.legend.itemStyle.fontFamily = this.fontFamily;
    w.plotOptions.series.dataLabels.style.fontFamily = this.fontFamily;
    w.xAxis.title.style.fontFamily = this.fontFamily;
    w.yAxis.title.style.fontFamily = this.fontFamily;
    w.xAxis.labels.style.fontFamily = this.fontFamily;
    w.yAxis.labels.style.fontFamily = this.fontFamily;
    w.tooltip.style.fontFamily = this.fontFamily;

    const isZoomed = document
      .getElementById(w.general.renderTo)
      .classList.contains("modal");

    widgetId.find(".va-widget-header")[0].style.fontSize = isZoomed
      ? "26px"
      : "21px";
    w.legend.itemStyle.fontSize = isZoomed
      ? this.labelFontSizeZoom
      : this.labelFontSize;
    w.tooltip.style.fontSize = isZoomed
      ? this.labelFontSizeZoom
      : this.labelFontSize;
    w.plotOptions.series.dataLabels.style.fontSize = isZoomed
      ? this.labelFontSizeZoom
      : this.labelFontSize;
    w.xAxis.labels.style.fontSize = isZoomed
      ? this.labelFontSizeZoom
      : this.labelFontSize;
    w.xAxis.title.style.fontSize = isZoomed
      ? this.titleAxisSizeZoom
      : this.titleAxisFontSize;
    w.yAxis.labels.style.fontSize = isZoomed
      ? this.labelFontSizeZoom
      : this.labelFontSize;
    w.yAxis.title.style.fontSize = isZoomed
      ? this.titleAxisSizeZoom
      : this.titleAxisFontSize;

    if (w.yAxis.stackLabels) {
      w.yAxis.stackLabels.style.fontSize = isZoomed
        ? this.labelFontSizeZoom
        : this.labelFontSize;
    }
    return w;
  },
  lineWidth: function (w) {
    // толщина линии графика
    w.series.map((elem) => {
      elem.lineWidth = 5;
    });
    return w;
  },
  sortByMonth: function (w) {
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
  },
  tickAmount: function (w, amount) {
    w.yAxis.tickAmount = amount || 7; //На сколько значений разбивать ось значений
    return w;
  },
  updateChart: function (chart, type, w) {
    const widgetId = $("#widget-" + w.general.renderTo);
    const isZoomed = document
      .getElementById(w.general.renderTo)
      .classList.contains("modal");

    const maxVal = chart.yAxis[0].max; // получаем максимальное значение оси Y

    chart.update({
      chart: {
        marginLeft: isZoomed ? 90 : 65, // Отступы графика
        marginTop: isZoomed ? 20 : 10,
      },
      // добавляем сверху заголовок единиц измерений
      yAxis: {
        title: {
          text: chartAxisAdaptiveTitle(maxVal, type),
          align: "high",
          rotation: 0,
          textAlign: "center",
          offset: 0,
          x: -25, // смещение title для выравнивания
          y: isZoomed ? -25 : -20,
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

    return chart;
  },
  svgOverflowVisible: function (w) {
    const widgetId = $("#widget-" + w.general.renderTo);
    // Сделать видимой область графика которая выходит за пределы контейнера с графиком (необходимо для yAxis.title)
    $("#" + w.general.renderTo).css({ overflow: "visible" });
    widgetId.find(".highcharts-container").css({ overflow: "visible" });
    widgetId.find("svg.highcharts-root").attr("overflow", "visible");
  },
};
