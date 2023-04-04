document.head.appendChild(document.createElement("style")).innerHTML = `
    .va-widget-modal {
        width: 1910px !important;
        top: 240px !important;
        height: 850px !important;
        left: 0 !important;
        z-index: 891!important;
    }
    .va-widget-modal-pie {
        width: 1912px !important;
        top: 240px !important;
        z-index: 900!important;
        height: 830px !important;
        left: 0 !important;
    }
    .va-table-modal {
        width: 1912px !important;
        z-index: 900 !important;
        top: 240px !important;
        height: 830px !important;
        left: 0 !important;
    }
    .va-chart-modal {
        width: 1912px !important;
        top: 240px !important;
        z-index: 800!important;
        height: 830px !important;
        left: 0 !important;
    }
    .modal {
        position: relative;
        width: 1910px;
        height: 780px !important;
        background: rgba(0, 0, 0, 0.7);
    }
    .zoom-color{
        fill: blue;
    }
    .chart-title-label {
        position: absolute; 
        font-family: "Roboto"; 
        padding-left: 10px; 
        bottom: 0px; 
        font-size: 18px; 
        color: #334059; 
        z-index: 20;
    }
    .chart-title-label-toZoom {
        font-size: 25px; 
        color: #334059
    }
    .сumulative-total {
        right: 20px;
        left: auto !important;
    }
    .сumulative-total {
        right: 75px;
        left: auto !important;
    }
    .сumulative-total-size {
        font-size: 22px !important;
    }

    .imgZoom-top {
        cursor: pointer;  
        position: absolute; 
        padding-left: 10px; 
        top: 10px; 
        font-size: 22px;
    }
    .imgZoom-top-toZoom
        {font-size: 26px;
        color: blue
    }
    
    .help-tooltip {
        position: absolute;
        display: none;
        padding: 10px;
        top: 30px;
        background: white;
        max-width: 1000px;
        width: max-content;
        border: 1px solid #00000057;
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
