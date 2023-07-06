function textUpdateData(w) {
  let text = w.data.primaryData.items[0].metadata[0].columnName || '' + '<br>' + w.data.primaryData.items[0].values[0].substring(0, 10);
 
  w.general.text = text;
 
  return w;
}
