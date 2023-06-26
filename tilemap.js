/*
 Highmaps JS v11.1.0 (2023-06-05)

 Tilemap module

 (c) 2010-2021 Highsoft AS

 License: www.highcharts.com/license
*/
'use strict';(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/tilemap",["highcharts","highcharts/modules/map"],function(m){a(m);a.Highcharts=m;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function m(a,d,p,e){a.hasOwnProperty(d)||(a[d]=e.apply(null,p),"function"===typeof CustomEvent&&window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded",{detail:{path:d,module:a[d]}})))}
a=a?a._modules:{};m(a,"Series/Tilemap/TilemapPoint.js",[a["Core/Axis/Color/ColorAxisComposition.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,d,p){const {series:{prototype:{pointClass:e}},seriesTypes:{heatmap:{prototype:{pointClass:t}}}}=d;({extend:d}=p);class f extends t{constructor(){super(...arguments);this.tileEdges=this.series=this.radius=this.options=void 0}haloPath(){return this.series.tileShape.haloPath.apply(this,arguments)}}d(f.prototype,{setState:e.prototype.setState,
setVisible:a.pointSetVisible});return f});m(a,"Series/Tilemap/TilemapShapes.js",[a["Core/Globals.js"],a["Core/Series/SeriesRegistry.js"],a["Core/Utilities.js"]],function(a,d,p){function e(b,c,a){b=b.options;return{xPad:(b.colsize||1)/-c,yPad:(b.rowsize||1)/-a}}({noop:a}=a);const {seriesTypes:{heatmap:t,scatter:f}}=d,{clamp:g,pick:m}=p;return{hexagon:{alignDataLabel:f.prototype.alignDataLabel,getSeriesPadding:function(b){return e(b,3,2)},haloPath:function(b){if(!b)return[];const c=this.tileEdges;return[["M",
c.x2-b,c.y1+b],["L",c.x3+b,c.y1+b],["L",c.x4+1.5*b,c.y2],["L",c.x3+b,c.y3-b],["L",c.x2-b,c.y3-b],["L",c.x1-1.5*b,c.y2],["Z"]]},translate:function(){let b=this.options,c=this.xAxis,a=this.yAxis,p=b.pointPadding||0,d=(b.colsize||1)/3,f=(b.rowsize||1)/2,x;this.generatePoints();this.points.forEach(function(b){let n=g(Math.floor(c.len-c.translate(b.x-2*d,0,1,0,1)),-c.len,2*c.len),u=g(Math.floor(c.len-c.translate(b.x-d,0,1,0,1)),-c.len,2*c.len),q=g(Math.floor(c.len-c.translate(b.x+d,0,1,0,1)),-c.len,2*
c.len),v=g(Math.floor(c.len-c.translate(b.x+2*d,0,1,0,1)),-c.len,2*c.len),r=g(Math.floor(a.translate(b.y-f,0,1,0,1)),-a.len,2*a.len),h=g(Math.floor(a.translate(b.y,0,1,0,1)),-a.len,2*a.len),k=g(Math.floor(a.translate(b.y+f,0,1,0,1)),-a.len,2*a.len);var l=m(b.pointPadding,p),e=l*Math.abs(u-n)/Math.abs(k-h);e=c.reversed?-e:e;let w=c.reversed?-l:l;l=a.reversed?-l:l;b.x%2&&(x=x||Math.round(Math.abs(k-r)/2)*(a.reversed?-1:1),r+=x,h+=x,k+=x);b.plotX=b.clientX=(u+q)/2;b.plotY=h;n+=e+w;u+=w;q-=w;v-=e+w;r-=
l;k+=l;b.tileEdges={x1:n,x2:u,x3:q,x4:v,y1:r,y2:h,y3:k};b.shapeType="path";b.shapeArgs={d:[["M",u,r],["L",q,r],["L",v,h],["L",q,k],["L",u,k],["L",n,h],["Z"]]}});this.translateColors()}},diamond:{alignDataLabel:f.prototype.alignDataLabel,getSeriesPadding:function(b){return e(b,2,2)},haloPath:function(b){if(!b)return[];const c=this.tileEdges;return[["M",c.x2,c.y1+b],["L",c.x3+b,c.y2],["L",c.x2,c.y3-b],["L",c.x1-b,c.y2],["Z"]]},translate:function(){let b=this.options,c=this.xAxis,a=this.yAxis,d=b.pointPadding||
0,p=b.colsize||1,e=(b.rowsize||1)/2,f;this.generatePoints();this.points.forEach(function(b){let q=g(Math.round(c.len-c.translate(b.x-p,0,1,0,0)),-c.len,2*c.len),n=g(Math.round(c.len-c.translate(b.x,0,1,0,0)),-c.len,2*c.len),w=g(Math.round(c.len-c.translate(b.x+p,0,1,0,0)),-c.len,2*c.len),v=g(Math.round(a.translate(b.y-e,0,1,0,0)),-a.len,2*a.len),r=g(Math.round(a.translate(b.y,0,1,0,0)),-a.len,2*a.len),h=g(Math.round(a.translate(b.y+e,0,1,0,0)),-a.len,2*a.len);var k=m(b.pointPadding,d),l=k*Math.abs(n-
q)/Math.abs(h-r);l=c.reversed?-l:l;k=a.reversed?-k:k;b.x%2&&(f=Math.abs(h-v)/2*(a.reversed?-1:1),v+=f,r+=f,h+=f);b.plotX=b.clientX=n;b.plotY=r;q+=l;w-=l;v-=k;h+=k;b.tileEdges={x1:q,x2:n,x3:w,y1:v,y2:r,y3:h};b.shapeType="path";b.shapeArgs={d:[["M",n,v],["L",w,r],["L",n,h],["L",q,r],["Z"]]}});this.translateColors()}},circle:{alignDataLabel:f.prototype.alignDataLabel,getSeriesPadding:function(b){return e(b,2,2)},haloPath:function(b){return f.prototype.pointClass.prototype.haloPath.call(this,b+(b&&this.radius))},
translate:function(){let b=this.options,c=this.xAxis,a=this.yAxis,f=b.pointPadding||0,d=(b.rowsize||1)/2,p=b.colsize||1,e,u,m,t,y=!1;this.generatePoints();this.points.forEach(function(b){let q=g(Math.round(c.len-c.translate(b.x,0,1,0,0)),-c.len,2*c.len),h=g(Math.round(a.translate(b.y,0,1,0,0)),-a.len,2*a.len),k=f,l=!1;"undefined"!==typeof b.pointPadding&&(k=b.pointPadding,y=l=!0);if(!t||y)e=Math.abs(g(Math.floor(c.len-c.translate(b.x+p,0,1,0,0)),-c.len,2*c.len)-q),u=Math.abs(g(Math.floor(a.translate(b.y+
d,0,1,0,0)),-a.len,2*a.len)-h),m=Math.floor(Math.sqrt(e*e+u*u)/2),t=Math.min(e,m,u)-k,y&&!l&&(y=!1);b.x%2&&(h+=u*(a.reversed?-1:1));b.plotX=b.clientX=q;b.plotY=h;b.radius=t;b.shapeType="circle";b.shapeArgs={x:q,y:h,r:t}});this.translateColors()}},square:{alignDataLabel:t.prototype.alignDataLabel,translate:t.prototype.translate,getSeriesPadding:a,haloPath:t.prototype.pointClass.prototype.haloPath}}});m(a,"Series/Tilemap/TilemapComposition.js",[a["Core/Axis/Axis.js"],a["Core/Utilities.js"]],function(a,
d){({addEvent:d}=d);d(a,"afterSetAxisTranslation",function(){if(!this.recomputingForTilemap&&"colorAxis"!==this.coll){var a=this,e=a.series.map(function(d){return d.getSeriesPixelPadding&&d.getSeriesPixelPadding(a)}).reduce(function(a,d){return(a&&a.padding)>(d&&d.padding)?a:d},void 0)||{padding:0,axisLengthFactor:1},d=Math.round(e.padding*e.axisLengthFactor);e.padding&&(a.len-=d,a.recomputingForTilemap=!0,a.setAxisTranslation(),delete a.recomputingForTilemap,a.minPixelPadding+=e.padding,a.len+=d)}})});
m(a,"Series/Tilemap/TilemapSeries.js",[a["Core/Globals.js"],a["Core/Series/SeriesRegistry.js"],a["Series/Tilemap/TilemapPoint.js"],a["Series/Tilemap/TilemapShapes.js"],a["Core/Utilities.js"]],function(a,d,m,e,t){({noop:a}=a);const {seriesTypes:{column:f,heatmap:g,scatter:p}}=d,{extend:b,merge:c}=t;class n extends g{constructor(){super(...arguments);this.tileShape=this.points=this.options=this.data=void 0}alignDataLabel(){return this.tileShape.alignDataLabel.apply(this,Array.prototype.slice.call(arguments))}drawPoints(){f.prototype.drawPoints.call(this);
this.points.forEach(a=>{a.graphic&&a.graphic[this.chart.styledMode?"css":"animate"](this.colorAttribs(a))})}getSeriesPixelPadding(a){let b=a.isXAxis;var c=this.tileShape.getSeriesPadding(this);let d;if(!c)return{padding:0,axisLengthFactor:1};d=Math.round(a.translate(b?2*c.xPad:c.yPad,0,1,0,1));c=Math.round(a.translate(b?c.xPad:0,0,1,0,1));return{padding:(a.single?Math.abs(d-c)/2:Math.abs(d-c))||0,axisLengthFactor:b?2:1.1}}setOptions(){const a=super.setOptions.apply(this,Array.prototype.slice.call(arguments));
this.tileShape=e[a.tileShape];return a}translate(){return this.tileShape.translate.apply(this,Array.prototype.slice.call(arguments))}}n.defaultOptions=c(g.defaultOptions,{marker:null,states:{hover:{halo:{enabled:!0,size:2,opacity:.5,attributes:{zIndex:3}}}},pointPadding:2,tileShape:"hexagon"});b(n.prototype,{getSymbol:a,markerAttribs:p.prototype.markerAttribs,pointAttribs:f.prototype.pointAttribs,pointClass:m});d.registerSeriesType("tilemap",n);"";"";return n});m(a,"masters/modules/tilemap.src.js",
[],function(){})});
/* //# sourceMappingURL=tilemap.js.map*/
