document.head.appendChild(document.createElement("style")).innerHTML = `
    .lib-va-widget-modal {
        width: 1910px !important;
        top: 240px !important;
        height: 850px !important;
        left: 0 !important;
        z-index: 891!important;
    }
    .lib-va-widget-modal-pie {
        width: 1912px !important;
        top: 240px !important;
        z-index: 900!important;
        height: 830px !important;
        left: 0 !important;
    }
    .lib-va-table-modal {
        width: 1912px !important;
        z-index: 900 !important;
        top: 240px !important;
        height: 830px !important;
        left: 0 !important;
    }
    .lib-va-chart-modal {
        width: 1912px !important;
        top: 240px !important;
        z-index: 800!important;
        height: 830px !important;
        left: 0 !important;
    }
    .lib-modal {
        position: relative;
        width: 1910px;
        height: 780px !important;
        background: rgba(0, 0, 0, 0.7);
    }
    .lib-zoom-color{
        fill: blue;
    }
    .lib-chart-title-label {
        position: absolute; 
        font-family: "Roboto"; 
        padding-left: 10px; 
        bottom: 0px; 
        font-size: 18px; 
        color: #334059; 
        z-index: 20;
    }
    .lib-chart-title-label-toZoom {
        font-size: 25px; 
        color: #334059
    }
    .lib-сumulative-total {
        right: 20px;
        left: auto !important;
    }
    .lib-сumulative-total {
        right: 75px;
        left: auto !important;
    }
    .lib-сumulative-total-size {
        font-size: 22px !important;
    }

    .lib-imgZoom-top {
        cursor: pointer;  
        position: absolute; 
        padding-left: 10px; 
        top: 10px; 
        font-size: 22px;
    }
    .lib-imgZoom-top-toZoom
        {font-size: 26px;
        color: blue
    }
    
    .lib-help-tooltip {
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
    .lib-help-tooltip-text{
        color: "#334059";
        font-family: "Roboto";
        font-size: 18px;
    }
    .lib-help-tooltip-right {
    right: 30px;
    }
    .lib-help-tooltip-left {
    left: 30px;
    }
    .lib-z-index-1000 {
        z-index: 1000 !important
    }`;
