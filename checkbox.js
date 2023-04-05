function checkbox_updateData(w) {
  $("#" + w.general.renderTo).append('<div id="checkbox"></div>');

  $("#checkbox").dxCheckBox({
    value: false,
    text: "Накопительный итог",
    onValueChanged(e) {
      let filterValue = e.value === true ? "Накопительный итог" : "";
      visApi().setFilterSelectedValues(
        w.general.renderTo,
        [[filterValue]],
        function (response) {}
      );
    },
  });

  $(".dx-checkbox-icon::before").css({
    "background-color": "blue",
    width: 30,
  });

  $(".dx-checkbox-text").css({
    "font-size": "14px",
    "min-width": "250px",
    "padding-left": "30px",
  });
  $("#widget-" + w.general.renderTo).css({
    "z-index": "850",
  });
}
