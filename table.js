function table_beforeRender(w, props) {
  // Стиль текста заголовков столбцов
  w.style.columnCell = {
    "font-family": "Roboto",
    "font-weight": "400",
    "font-size": "18px",
    color: "#334059",
    "background-color": "#F0F3FF",
    "vertical-align": "top",
    "text-align": "left",
  };

  w.style.dataCell = {
    "font-family": "Roboto",
    "font-size": "16px",
    "background-color": "rgba(255, 255, 255, 0)",
    color: "rgb(51, 64, 89)",
    "font-weight": "normal",
    "font-style": "normal",
  };

  w.style.rowCell = {
    "font-family": "Roboto",
    "font-size": "16px",
    "background-color": "rgba(255, 255, 255, 0)",
    color: "rgb(51, 64, 89)",
    "font-weight": "normal",
    "font-style": "normal",
    //   'white-space': 'nowrap'
  };

  return w;
}

function table_afterRender(w, props) {
  const wigetId = $("#widget-" + w.general.renderTo);
  const widget = $("#" + w.general.renderTo);

  return w;
}

function table_hideTableOnLoad(w) {
  const wigetId = $("#widget-" + w.general.renderTo);
  wigetId.find("#pivotGridContainer_" + w.general.renderTo + " table").css({
    opacity: "0",
  });
  wigetId.find(".dx-loadpanel").css({
    display: "none",
  });
  wigetId.find(".va-widget-loader").css({
    display: "block",
  });
}

function table_sort(columnsValId, columnsYearId, w) {
  const data = w.pivotGridOptions.dataSource.getData();

  if (data.sort === "max") {
    data.sort = "min";
    for (let i = 0; i < data.values.length - 1; i++) {
      let wasSwap = false;
      for (let j = 1; j < data.values.length - 1 - i; j++) {
        if (
          data.values[j][columnsYearId][columnsValId] >
          data.values[j + 1][columnsYearId][columnsValId]
        ) {
          const bufRow = data.rows[j - 1].index;
          const row = data.rows[j - 1];
          const bufVal = data.values[j];
          data.rows[j - 1].index = data.rows[j].index;
          data.rows[j - 1] = data.rows[j];
          data.values[j] = data.values[j + 1];
          data.rows[j].index = bufRow;
          data.rows[j] = row;
          data.values[j + 1] = bufVal;
          wasSwap = true;
        }
      }
      if (!wasSwap) {
        break;
      }
    }
  } else {
    data.sort = "max";
    for (let i = 0; i < data.values.length - 1; i++) {
      let wasSwap = false;
      for (let j = 1; j < data.values.length - 1 - i; j++) {
        if (
          data.values[j][columnsYearId][columnsValId] <
          data.values[j + 1][columnsYearId][columnsValId]
        ) {
          const bufRow = data.rows[j - 1].index;
          const row = data.rows[j - 1];
          const bufVal = data.values[j];
          data.rows[j - 1].index = data.rows[j].index;
          data.rows[j - 1] = data.rows[j];
          data.values[j] = data.values[j + 1];
          data.rows[j].index = bufRow;
          data.rows[j] = row;
          data.values[j + 1] = bufVal;
          wasSwap = true;
        }
      }
      if (!wasSwap) {
        break;
      }
    }
  }
  w.pivotGridOptions.dataSource.mergePartialDataSource(data);
}

function table_removeItems(w) {
  const wigetId = $("#widget-" + w.general.renderTo);
  $("#fa-sort-" + w.general.renderTo).remove();
  wigetId.find(".button-export-icon-" + w.general.renderTo).remove();
  wigetId.find(".table-zoom-" + w.general.renderTo).remove();
}

function table_cssStyle(w) {
  const wigetId = $("#widget-" + w.general.renderTo);
  $(".arrow-sort-" + w.general.renderTo).remove();
  $(".row-headers-width-" + w.general.renderTo).remove();
  $(".body-table-" + w.general.renderTo).remove();
  $(".header-table-" + w.general.renderTo).remove();
  $(".cell-hight-" + w.general.renderTo).remove();

  const rowHeadersWidth = document.createElement("style");
  rowHeadersWidth.className = "row-headers-width-" + w.general.renderTo;
  rowHeadersWidth.innerHTML = `
            .row-headers-width{
                width : 500px !important;
            }
        `;
  document.querySelector("head").append(rowHeadersWidth);
  wigetId.find(".dx-area-row-cell table").addClass("row-headers-width");
  wigetId.find(".dx-area-description-cell table").addClass("row-headers-width");

  w.pivotGridOptions.dataSource.reload().then(() => {
    setTimeout(() => {
      wigetId.find(".dx-area-data-cell table").css({
        "table-layout": "auto",
      });
      wigetId.find(".dx-pivotgrid-horizontal-headers table").css({
        "table-layout": "auto",
      });
      wigetId.find(".dx-area-row-cell table").css({
        "table-layout": "auto",
      });

      wigetId.find(".dx-pivotgrid-horizontal-headers").css({
        width: "100%",
      });
      wigetId.find(".dx-pivotgrid-horizontal-headers table").css({
        width: "100%",
      });
      wigetId.find(".dx-pivotgrid-area-data").css({
        width: "100%",
      });
      wigetId.find(".dx-pivotgrid-area-data table").css({
        width: "100%",
      });
      table_addSortArrow(w);
      table_toogleClassArrowSort(w.props.columnSort, w);
      table_measurementColumnWidth(w);
      table_hideSpiner(w);
    }, 100);
  });
}

function table_addSortArrow(w) {
  const widget = $("#" + w.general.renderTo);
  const arrowSort = document.createElement("style");
  arrowSort.className = "arrow-sort-" + w.general.renderTo;
  arrowSort.innerText =
    '.arrow-up::before {content: "\\2191";font-weight: bold;font-size: 21px;} .arrow-down::before {content: "\\2193";font-weight: bold;font-size: 21px;}';
  document.body.appendChild(arrowSort);

  // нахождение столбцов по классу для добавление кнопки сортировки
  const columsSpan = widget
    .find(".dx-pivotgrid-horizontal-headers tr")
    .eq(1)
    .find("td span");
  const colums = widget
    .find(".dx-pivotgrid-horizontal-headers tr")
    .eq(1)
    .find("td");
  let columnsValId = 0;

  console.log("columns", colums);

  // создание и добавление элементов в каждый столбец
  for (let i = 0; i < columsSpan.length; i++) {
    const span = document.createElement("span");
    columnsValId = columnsValId > columsSpan.length ? 0 : columnsValId;
    span.id = "fa-sort-" + w.general.renderTo;
    span.className = "fa-sort";
    span.setAttribute("data-columnsVal", columnsValId++);
    span.style.cssText =
      "\n        font: normal normal normal 16px/1 FontAwesome;\n        cursor: pointer;\n        position: absolute;\n        top: 10px;\n        right: 10px;\n    ";

    columsSpan[i].appendChild(span);
    columsSpan[i].style.cssText =
      " \n        display: flex;\n        justify-content: left;\n        gap: 10px;\n        margin: 0;\n        max-width: 189px;\n    ";

    colums[i].style.cssText =
      '\n    position: relative;\n    border-bottom-width: 0px;\n    font-family: "Roboto";\n    font-weight: ;\n    font-size: 18px;\n    color: rgb(51, 64, 89);\n    background-color: rgba(240, 243, 255, 1);\n    vertical-align: top;\n    text-align: left;\n    width: 20%;\n    ';
  }

  // Вызов функции сортировки по клику. Сортировка меняется от меньшего к большему и наоборот
  widget.find(".fa-sort").on("click", (e) => {
    columnSort = e.target.dataset.columnsval;
    table_sort(columnSort, 0, w);

    // вызов функции отрисовки кнопок т.к после сортировки заново происходит рендер виджета
    table_hideTableOnLoad(w);
    table_cssStyle(w);
  });
}

function table_measurementColumnWidth(w, props) {
  const tableСolumns = $(
    ".dx-area-data-cell .dx-scrollable-content table tr td"
  );
  const tableRowsLength = $("td", $(".dx-area-data-cell tr")[0]).length - 1;
  const allHeaderСolumns = $(".dx-pivotgrid-horizontal-headers tr").eq(1);
  const headerСolumns = allHeaderСolumns.find("td");

  // настройка ячеек
  for (let i = 0; i <= tableRowsLength; i++) {
    headerСolumns[i].style.width = w.props.widthColumn[i] + "%";
    tableСolumns[i].style.width = w.props.widthColumn[i] + "%";
    for (let j = i; j <= tableСolumns.length - 1; j = j + tableRowsLength + 1) {
      tableСolumns[j].style.textAlign = w.props.textAlign[i];
    }
  }
}

function table_hideSpiner(w) {
  const wigetId = $("#widget-" + w.general.renderTo);
  if (!w.pivotGridOptions.dataSource.isLoading()) {
    wigetId.find(".va-widget-loader").css({
      display: "none",
    });
    wigetId.find("#pivotGridContainer_" + w.general.renderTo + " table").css({
      opacity: "1",
    });
  } else {
    setTimeout(function () {
      table_hideSpiner(w);
    }, 50);
  }
}

function table_tableZoom(w) {
  const wigetId = $("#widget-" + w.general.renderTo);
  // замена значка выгрузки
  const buttonContent = wigetId.find(".dx-pivotgrid-toolbar div")[0];
  wigetId.find(".dx-button-content").remove();
  wigetId.find(".dx-pivotgrid-toolbar").css({
    display: "flex",
    "align-items": "center",
  });

  buttonContent.className =
    "dx-button dx-button-normal dx-widget dx-button-has-icon";
  buttonContent.style.border = "none";

  const tableZoomStyle = document.createElement("style");
  tableZoomStyle.className = "header-table";
  tableZoomStyle.innerHTML = `
            .va-table-modal {
            width: 1912px !important;
            z-index: 891 !important;
            top: 240px !important;
            height: 830px !important;
            left: 0 !important;
        }
            .zoom-color{
                fill: blue;
            }
        `;
  document.querySelector("head").append(tableZoomStyle);

  const img = document.createElement("img");
  img.style.cursor = "pointer";
  img.className = "button-export-icon-" + w.general.renderTo;
  img.src = "https://img.icons8.com/wired/30/null/ms-excel.png";

  const zoom = document.createElement("svg");
  zoom.className = "table-zoom-" + w.general.renderTo;
  zoom.style.marginLeft = "10px";
  zoom.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="26px" height="26px"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"/></svg>';
  zoom.style.cursor = "pointer";

  buttonContent.append(img);
  buttonContent.after(zoom);

  if (document.getElementById(w.general.renderTo).classList.contains("modal")) {
    document
      .querySelector(".dx-pivotgrid-toolbar > svg")
      .classList.add("zoom-color");
  }

  $(".table-zoom-" + w.general.renderTo).click(() => {
    table_hideTableOnLoad(w);
    document
      .getElementById("widget-" + w.general.renderTo)
      .classList.toggle("va-table-modal");
    document
      .querySelector(".dx-pivotgrid-toolbar > svg")
      .classList.toggle("zoom-color");
    document.getElementById(w.general.renderTo).classList.toggle("modal");
    w.pivotGridOptions.dataSource.reload().then(() => {
      setTimeout(() => {
        table_cssStyle(w);
      }, 100);
    });
  });
}

function table_toogleClassArrowSort(columnsValId, w) {
  const widget = $("#" + w.general.renderTo);
  const data = w.pivotGridOptions.dataSource.getData();
  const arrowSort = data.sort === "max" ? "arrow-down" : "arrow-up";
  $(widget.find(".fa-sort")[columnsValId])
    .removeClass("fa-sort")
    .addClass(arrowSort);
}
