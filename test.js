// TODO - Id фильтров Цена/количество и  Накопительный итог
const filterIdToogle = "d57a4b7589734090a72d88d85a16ab5e"; // фильтр цена/количество
const filterIdAccumulateChekbox = "0d72f968131c4b22894a0f631fbb9c8e"; // чекбокс Накопительный итог
const widgetIdByMonth = "4a7558028ae8428c9e0e7bbdb6896cfe"; // график динамика по месяцу заключения
const widgetId = $("#widget-" + w.general.renderTo);

// Изменение стилей текста
// w.drilldown.activeAxisLabelStyle.fontFamily = "Roboto";
// w.drilldown.activeDataLabelStyle.fontFamily = "Roboto";
// w.legend.itemStyle.fontFamily = "Roboto";
// w.plotOptions.series.dataLabels.style.fontFamily = "Roboto";
// w.xAxis.title.style.fontFamily = "Roboto";
// w.yAxis.title.style.fontFamily = "Roboto";
// w.xAxis.labels.style.fontFamily = "Roboto";
// w.yAxis.labels.style.fontFamily = "Roboto";
// w.tooltip.style.fontFamily = "Roboto";

// Зумирование графика при нажатии на иконку "лупа"
function zoomChart() {
  const headerContainer = widgetId.find(".va-widget-header-container");

  const zoom = document.createElement("div");
  zoom.className = "chart-zoom-level-dynamics-" + w.general.renderTo;
  zoom.style.paddingLeft = "10px";
  zoom.style.paddingBottom = "10px";
  zoom.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="26px" height="26px"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"/></svg>';
  zoom.style.cursor = "pointer";

  headerContainer.prepend(zoom);

  const headerChart = document.createElement("style");
  headerChart.className = "header-chart-" + w.general.renderTo;
  headerChart.innerHTML = `
        .va-chart-modal {
        width: 1912px !important;
        top: 240px !important;
        z-index: 800!important;
        height: 830px !important;
        left: 0 !important;
    }
     .zoom-color{
              fill: blue;
          }
    .chart-title-label {
        position: absolute; 
        font-family: "Roboto"; 
        padding-left: 10px; 
        bottom: 0px; 
        font-size: 18px; 
        color: #334059; 
        z-index: 20;
    }
    .chart-title-label-toZoom {
        font-size: 25px; 
        color: #334059
    }
    .cumulative-total {
        right: 20px;
        left: auto !important;
    }
    .cumulative-total-size {
        font-size: 22px !important;
    }
    `;
  document.querySelector("head").append(headerChart);

  const bodyChart = document.createElement("style");
  bodyChart.className = "body-chart-" + w.general.renderTo;
  bodyChart.innerHTML = `   
    .modal {
        position: relative;
        width: 1910px;
        height: 780px !important;
        background: rgba(0, 0, 0, 0.7);
    }`;
  document.querySelector("head").append(bodyChart);

  $(".chart-zoom-level-dynamics-" + w.general.renderTo).click(() => {
    document
      .getElementById("widget-" + w.general.renderTo)
      .classList.toggle("va-chart-modal");
    document
      .getElementById("widget-" + w.general.renderTo)
      .classList.toggle("zoom-color");
    document
      .getElementById("widget-0d72f968131c4b22894a0f631fbb9c8e")
      .classList.toggle("cumulative-total");
    document
      .querySelector("#loop-enabled-contract > div > span.dx-checkbox-text")
      .classList.toggle("cumulative-total-size");
    document.getElementById(w.general.renderTo).classList.toggle("modal");

    // при нажатии на зум зумировать второй график
    document
      .getElementById("widget-" + widgetIdByMonth)
      .classList.toggle("va-chart-modal");
    document
      .getElementById("widget-" + widgetIdByMonth)
      .classList.toggle("zoom-color");
    document.getElementById(widgetIdByMonth).classList.toggle("modal");

    updateChart();
  });
}

// Удалить стили при повторном нажатии на на "лупу"
function removeItems() {
  widgetId.find(".chart-zoom-level-dynamics-" + w.general.renderTo).remove();
  $(".header-chart-" + w.general.renderTo).remove();
  $(".body-chart-" + w.general.renderTo).remove();
}

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

function updateChart() {
  const filterValue = visApi().getSelectedValues(filterIdToogle);
  const filterViewValueChekbox = visApi().getSelectedValues(
    filterIdAccumulateChekbox
  );

  // Сортировка значений по порядку месяцев (с базы приходит по алфавиту)
  //   w.xAxis.categories = sortByMonth(w.xAxis.categories);

  // дополнительные отступы в графике при зуммировании графика
  //   if (document.getElementById(w.general.renderTo).classList.contains("modal")) {
  //     general.marginTop = 20;
  //     general.marginLeft = 90;
  //     w.tooltip.style.fontSize = labelFontSizeZoom;
  //   } else {
  //     general.marginTop = 10;
  //     general.marginLeft = 60;
  //     w.tooltip.style.fontSize = labelFontSize;
  //   }

  const general = copy(w.general);
  let series = copy(w.series);

  // // TODO - Разделить индексы серий количества и стоимости
  const indexes = filterValue[0][0] === "Цена" ? [0, 2, 4, 6] : [1, 3, 5, 7];
  let type = filterValue[0][0] === "Цена" ? " руб." : " шт.";
  series = series.filter((elem, index) => indexes.includes(index));

  w = chartColumn_beforeRender(w, type);

  if (
    filterViewValueChekbox.length > 0 &&
    filterViewValueChekbox[0][0] === "Накопительный итог"
  ) {
    general.type = "line";
    series.map((elem) => {
      const sum = [0];
      elem.data.map((item, index) => {
        sum[index] = sum[index === 0 ? 0 : index - 1] + item.y;
        item.y = sum[index];
      });
    });
  }

  let chart = Highcharts.chart({
    chart: general,
    xAxis: w.xAxis,
    yAxis: w.yAxis,
    plotOptions: {
      series: {
        events: {
          legendItemClick(e) {
            e.preventDefault();
            return false;
          },
        },
        ...w.plotOptions.series,
      },
    },
    series,
    drilldown: w.drilldown,
    legend: w.legend,
    tooltip: {
      style: w.tooltip.style,
      formatter: function formatter() {
        return convertAxisAdaptive(this.y, this.y, type);
      },
    },
  });

  //   let tickAmount =
  //     chart.yAxis[0].tickPositions.length > 10
  //       ? 10
  //       : chart.yAxis[0].tickPositions.length;
  //   let maxVal = chart.yAxis[0].max;

  //   chart.update({
  //     yAxis: {
  //       tickAmount: tickAmount,
  //       labels: {
  //         formatter: function formatter() {
  //           let tick = this.axis.tickPositions;
  //           if (this.value === 0) {
  //             return 0;
  //           }
  //           console.log("tick", tick);
  //           let arr = tick.map((item) =>
  //             chartAxisAdaptiveLabel(item, this.axis.max).slice(-2)
  //           );
  //           let fixed = 2;
  //           console.log("arr", arr);
  //           if (arr.every((elem) => elem.charAt(1) === "0")) {
  //             fixed = 1;
  //           }
  //           if (arr.every((elem) => elem === "00")) {
  //             fixed = 0;
  //           }
  //           return chartAxisAdaptiveLabel(this.value, this.axis.max, fixed);
  //         },
  //       },
  //       title: {
  //         text: chartAxisAdaptiveTitle(maxVal, type),
  //         align: "high",
  //         rotation: 0,
  //         style: {
  //           fontSize: isZoomed ? "22px" : "16px",
  //           fontWeight: "normal",
  //         },
  //         offset: 0,
  //         x: isZoomed ? 35 : 25,
  //         y: isZoomed ? -25 : -15,
  //       },
  //     },
  //   });

  chart = chartColumn_afterRender2(chart, type, w);

  function chartColumn_afterRender2(chart, type, w) {
    const widgetId = $("#widget-" + w.general.renderTo);
    const isZoomed = document
      .getElementById(w.general.renderTo)
      .classList.contains("modal");

    console.log("isZoomed", isZoomed);
    const maxVal = chart.yAxis[0].max; // получаем максимальное значение оси Y
    // let tickAmount =
    //   chart.yAxis[0].tickPositions.length > 10
    //     ? 10
    //     : chart.yAxis[0].tickPositions.length;
    let tickAmount = 7;

    chart.update({
      // chart: {
      //   marginTop: 30,
      // },
      // добавляем сверху заголовок единиц измерений
      yAxis: {
        tickAmount: tickAmount,
        title: {
          text: chartAxisAdaptiveTitle(maxVal, type),
          align: "high",
          rotation: 0,
          // style: {
          //   fontSize: isZoomed ? "22px" : "16px",
          //   fontWeight: "normal",
          // },
          offset: 0,
          x: isZoomed ? 25 : 15,
          y: isZoomed ? -25 : -15,
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
          x: 20,
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

  removeItems();
  zoomChart();
}

visApi().onSelectedValuesChangedListener(
  { guid: filterIdToogle + "-chart", widgetGuid: filterIdToogle },
  () => {
    updateChart();
  }
);

visApi().onSelectedValuesChangedListener(
  {
    guid: filterIdAccumulateChekbox + "-chart",
    widgetGuid: filterIdAccumulateChekbox,
  },
  () => {
    updateChart();
  }
);

visApi().onWidgetLoadedListener(
  { guid: w.general.renderTo + "-chart", widgetGuid: w.general.renderTo },
  () => {
    updateChart();
  }
);
