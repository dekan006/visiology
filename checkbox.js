const checkbox = {
  create: function (w) {
    $("#" + w.general.renderTo).append('<div id="checkbox"></div>');

    let textValue = w.props.title || "Накопительный итог";
    let textFilterValue = w.props.filterValue || "Накопительный итог";

    $("#checkbox").dxCheckBox({
      value: false,
      text: textValue,
      onValueChanged(e) {
        let filterValue = e.value === true ? textFilterValue : "";
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
      "font-size": w.props.fontSizeTitle || "14px",
      "min-width": "250px",
      "padding-left": "30px",
    });
    $("#widget-" + w.general.renderTo).css({
      "z-index": "850",
    });
  },
};

function checkbox_updateData(w) {
  $("#" + w.general.renderTo).append('<div id="checkbox"></div>');

  let textValue = w.props.title || "Накопительный итог";
  let textFilterValue = w.props.filterValue || "Накопительный итог";

  $("#checkbox").dxCheckBox({
    value: false,
    text: textValue,
    onValueChanged(e) {
      let filterValue = e.value === true ? textFilterValue : "";
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
    "font-size": w.props.fontSizeTitle || "14px",
    "min-width": "250px",
    "padding-left": "30px",
  });
  $("#widget-" + w.general.renderTo).css({
    "z-index": "850",
  });
}
