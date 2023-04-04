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


  // Адаптивные подписи значений, осей - цена/штуки
  w.xAxis.labels.align = "left";
  w.xAxis.labels.reserveSpace = true;

  return w;
}

function chartTop_afterRender(chart, type) {
  return chart;
}
