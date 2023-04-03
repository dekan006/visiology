function helpTooltip_afterRender(w, position, helpId) {
  const widgetId = $("#widget-" + w.general.renderTo);

  const textTooltip = {
    id01: "Дашборд отражает сведения о контрактах по 44-ФЗ заключенных в выбранном году по показателям в разрезе кодов ОКПД 2:<br><br><b>Количество контрактов </b>– общее количество контрактов, включенных в реестр контрактов ЕИС<br><br><b>Стоимость ТРУ </b>– общая стоимость товаров, работ и услуг по всем позициям контрактов, включенных в реестр контрактов ЕИС<br><br><b>Товары </b>– общая стоимость товаров по позициям контрактов, включенных в реестр контрактов ЕИС<br><br><b>Товары РФ </b>– общая стоимость товаров российского происхождения (ЕАЭС) по позициям контрактов, включенных в реестр контрактов ЕИС",
  };
  console.log("textTooltip.helpId-1111", textTooltip[helpId]);

  widgetId.css({
    "z-index": "999",
  });

  function createTooltip() {
    console.log("helpId", helpId);
    console.log("textTooltip.helpId", textTooltip[helpId]);
    const tooltip = document.createElement("div");
    tooltip.id = "help-tooltip-" + helpId;
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
