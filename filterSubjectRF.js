function filterSubjectRF_updateData(w) {
    w = filterSubjectRF_addNewRegion(w);
    return w;
}



function filterSubjectRF_addNewRegion(w) {
  const newRegion = [
    [
      "Южный федеральный округ",
      "Луганская Народная Республика",
      "Луганская Народная Республика",
    ],
    [
      "Южный федеральный округ",
      "Донецкая Народная Республика",
      "Донецкая Народная Республика",
    ],
    ["Южный федеральный округ", "Херсонская область", "Херсонская область"],
    ["Южный федеральный округ", "Запорожская область", "Запорожская область"],
    ["Южный федеральный округ", "Камчатский край", "Запорожская область"],
    ["Южный федеральный округ", "Крым", "Крым"],
  ];

  let mySet = new Set();
  w.data.rows.forEach((item) => mySet.add(item[1]));

  newRegion.forEach((item) => {
    if (!mySet.has(item[1])) {
      w.data.rows.push(item);
    }
  });
  return w;
}
