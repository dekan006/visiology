document.head.appendChild(document.createElement("style")).innerHTML = `
    .va-widget-modal {
        width: 1910px !important;
        top: 220px !important;
        height: 850px !important;
        left: 0 !important;
    }
    .modal {
        position: relative;
        width: 1910px;
        height: 780px !important;
        background: rgba(0, 0, 0, 0.7);
    }
    .help-tooltip {
        position: absolute;
        display: none;
        padding: 10px;
        top: 30px;
        background: white;
        max-width: 1000px;
        width: max-content;
        border: 1px solid #000057;
        border-radius: 5px;
    }
    .help-tooltip-text{
        color: "#334059";
        font-family: "Roboto";
        font-size: 18px;
    }
    .help-tooltip-right {
    right: 30px;
    }
    .help-tooltip-left {
    left: 30px;
    }`;
