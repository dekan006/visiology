function helpTooltip_afterRender(w, position, helpId) {
  const widgetId = $("#widget-" + w.general.renderTo);

  const textTooltip = {
    id01: "Дашборд отражает сведения о контрактах по 44-ФЗ заключенных в выбранном году по показателям в разрезе кодов ОКПД 2:<br><br><b>Количество контрактов </b>– общее количество контрактов, включенных в реестр контрактов ЕИС<br><br><b>Стоимость ТРУ </b>– общая стоимость товаров, работ и услуг по всем позициям контрактов, включенных в реестр контрактов ЕИС<br><br><b>Товары </b>– общая стоимость товаров по позициям контрактов, включенных в реестр контрактов ЕИС<br><br><b>Товары РФ </b>– общая стоимость товаров российского происхождения (ЕАЭС) по позициям контрактов, включенных в реестр контрактов ЕИС",
    id02: "Дашборд отражает сведения о контрактах по 44-ФЗ, заключенных в выбранном году в разрезе показателей:<br><br><b>Цена контрактов </b>– общая цена контрактов, включенных в реестр контрактов ЕИС<br><br><b>Количество контрактов </b>– общее количество контрактов, включенных в реестр контрактов ЕИС<br><br><b>Экономия (абсолютное значение)</b> - разница между суммой начальных (максимальных) цен контрактов и общей ценой заключенных контрактов на основании сведений из реестра контрактов ЕИС<br><br><b>Экономия (%)</b> – отношение между абсолютным значением экономии и суммой начальных (максимальных) цен контрактов на основании сведений из реестра контрактов ЕИС ",
  };

  widgetId.css({
    "z-index": "999",
  });

  function createTooltip() {
    $("#help-tooltip-" + w.general.renderTo).remove();
    const tooltip = document.createElement("div");
    tooltip.id = "help-tooltip-" + w.general.renderTo;
    tooltip.className = `help-tooltip help-tooltip-${position}`;
    tooltip.innerHTML =
      '<span class="help-tooltip-text">' + textTooltip[helpId] + "</span>";
    widgetId.append(tooltip);
  }

  function showTooltip() {
    widgetId.find(".help-tooltip").show();
  }

  function hideTooltip() {
    widgetId.find(".help-tooltip").hide();
  }

  createTooltip();

  widgetId.mouseover(showTooltip);
  widgetId.mouseout(hideTooltip);

  return w;
}
