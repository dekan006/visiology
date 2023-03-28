function textCard_updateData(w) {
  // w.style.color = "red";
  // w.style.fontSize = "30px";
  return w;
}

function textCard_checkNoData(w) {
  if (!w.data.values[0][0]) {
    $(".table-nodata").remove();
    const element = document.createElement("div");
    element.className = "table-nodata";
    element.style = `
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 980;
        font-family: Roboto;
        background-color: rgba(255,255,255,1);
        top:240px;
        left:0px;
        right:0px;
        bottom:0px;
        border-radius: 10px;
        `;
    element.innerHTML = `<div style="font-size: 98px; color: silver"><i class="fa fa-times-circle-o" aria-hidden="true"></i></div>
          <div style="font-size: 28px">По заданным фильтрам нет данных</div>`;

    $(".va-widgets-container").append(element);
  } else {
    $(".table-nodata").remove();
  }
}
