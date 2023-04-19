$(".visiology-liba").remove();

const urlArr = [
  "https://dekan006.github.io/visiology/liba.js",
  "https://dekan006.github.io/visiology/allWidgets.js",
  "https://dekan006.github.io/visiology/filterYear.js",
  "https://dekan006.github.io/visiology/textCard.js",
  "https://dekan006.github.io/visiology/filterCustomerLevel.js",
  "https://dekan006.github.io/visiology/filterTypeCustomer.js",
  "https://dekan006.github.io/visiology/buttonGroup.js",
  "https://dekan006.github.io/visiology/chartColumn.js",
  "https://dekan006.github.io/visiology/addCss.js",
  "https://dekan006.github.io/visiology/filterSubjectRF.js",
  "https://dekan006.github.io/visiology/filterMethodSupplier.js",
  "https://dekan006.github.io/visiology/filterGRBS.js",
  "https://dekan006.github.io/visiology/filterContractStatus.js",
  "https://dekan006.github.io/visiology/chartPie.js",
  "https://dekan006.github.io/visiology/table.js",
  "https://dekan006.github.io/visiology/chartTop.js",
  "https://dekan006.github.io/visiology/helpTooltip.js",
  "https://dekan006.github.io/visiology/filterFoundationSingleSupplier.js",
  "https://dekan006.github.io/visiology/checkbox.js",
  "https://dekan006.github.io/visiology/myModule.js",
];

urlArr.forEach((url) => {
  const script = document.createElement("script");
  script.src = url;
  script.type = "text/javascript";
  script.classList.add("visiology-liba");
  document.querySelector("head").appendChild(script);
});
