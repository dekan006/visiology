const myModule = {
  afterRender: function (chart, type, w) {
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
  svgOverflowVisible: function () {
    // Сделать видимой область графика которая выходит за пределы контейнера с графиком (необходимо для yAxis.title)
    $("#" + w.general.renderTo).css({ overflow: "visible" });
    widgetId.find(".highcharts-container").css({ overflow: "visible" });
    widgetId.find("svg.highcharts-root").attr("overflow", "visible");
  },
};
