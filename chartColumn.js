function chartColumn_formatTooltip(thisData, type) {
  return (
    // thisData.key + ": " + convertAxisAdaptive(thisData.y, thisData.y, type)
    thisData.key + ": " + convertAxisAdaptive(thisData.y, thisData.y, type)
  );
}

function chartColumn_cssStyle(w) {
  const wigetId = $("#widget-" + w.general.renderTo);
  const headerContainer = wigetId.find(".va-widget-header-container");

  const zoom = document.createElement("div");
  zoom.className = "chart-icon-zoom-" + w.general.renderTo;
  zoom.style.paddingLeft = "10px";
  zoom.style.cursor = "pointer";
  zoom.innerHTML = iconZoomSVG;
  headerContainer.prepend(zoom);
}

function chartColumn_beforeRender(w, type) {
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

  w.tooltip.formatter = function () {
    return chartColumn_formatTooltip(this, type);
  };

  return w;
}

function chartColumn_afterRender(chart, type) {
  const maxVal = chart.yAxis[0].max; // получаем максимальное значение оси Y

  chart.update({
    chart: {
      marginTop: 30,
    },
    // добавляем сверху заголовок единиц измерений
    yAxis: {
      title: {
        text: chartAxisAdaptiveTitle(maxVal, type),
        align: "high",
        rotation: 0,
        style: {
          fontSize: "18px",
          fontWeight: "normal",
        },
        offset: 0,
        x: 0,
        y: -20,
      },
      // форматирование значений для оси измерений
      labels: {
        formatter: function () {
          return chartAxisAdaptiveLabel(this.value, this.axis.max);
        },
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
}
