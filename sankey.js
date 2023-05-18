/*
 Highcharts JS v11.0.1 (2023-05-08)

 Sankey diagram module

 (c) 2010-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
"use strict";
(function (b) {
  "object" === typeof module && module.exports
    ? ((b["default"] = b), (module.exports = b))
    : "function" === typeof define && define.amd
    ? define("highcharts/modules/sankey", ["highcharts"], function (t) {
        b(t);
        b.Highcharts = t;
        return b;
      })
    : b("undefined" !== typeof Highcharts ? Highcharts : void 0);
})(function (b) {
  function t(b, h, l, e) {
    b.hasOwnProperty(h) ||
      ((b[h] = e.apply(null, l)),
      "function" === typeof CustomEvent &&
        window.dispatchEvent(
          new CustomEvent("HighchartsModuleLoaded", {
            detail: { path: h, module: b[h] },
          })
        ));
  }
  b = b ? b._modules : {};
  t(
    b,
    "Series/NodesComposition.js",
    [b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]],
    function (b, h) {
      const {
          series: {
            prototype: l,
            prototype: {
              pointClass: { prototype: e },
            },
          },
        } = b,
        { defined: z, extend: w, find: g, merge: n, pick: k } = h;
      var a;
      (function (a) {
        function c() {
          this.data = [].concat(this.points || [], this.nodes);
          return l.destroy.apply(this, arguments);
        }
        function b() {
          this.nodes &&
            (this.nodes.forEach((a) => {
              a.destroy();
            }),
            (this.nodes.length = 0));
          l.setData.apply(this, arguments);
        }
        function A(a) {
          const c = arguments,
            f = this.isNode
              ? this.linksTo.concat(this.linksFrom)
              : [this.fromNode, this.toNode];
          "select" !== a &&
            f.forEach((d) => {
              d &&
                d.series &&
                (e.setState.apply(d, c),
                d.isNode ||
                  (d.fromNode.graphic && e.setState.apply(d.fromNode, c),
                  d.toNode &&
                    d.toNode.graphic &&
                    e.setState.apply(d.toNode, c)));
            });
          e.setState.apply(this, c);
        }
        function p(a, c, f, d) {
          const m = this.series.options.nodes,
            r = this.series.options.data,
            y = (r && r.length) || 0,
            g = r && r[this.index];
          e.update.call(this, a, this.isNode ? !1 : c, f, d);
          this.isNode &&
            ((a = (m || []).reduce(
              (d, m, a) => (this.id === m.id ? a : d),
              -1
            )),
            (d = n((m && m[a]) || {}, (r && r[this.index]) || {})),
            r && (g ? (r[this.index] = g) : (r.length = y)),
            m
              ? 0 <= a
                ? (m[a] = d)
                : m.push(d)
              : (this.series.options.nodes = [d]),
            k(c, !0) && this.series.chart.redraw(f));
        }
        const v = [];
        a.compose = function (a, g) {
          h.pushUnique(v, a) &&
            ((a = a.prototype),
            (a.setNodeState = A),
            (a.setState = A),
            (a.update = p));
          h.pushUnique(v, g) &&
            ((a = g.prototype), (a.destroy = c), (a.setData = b));
          return g;
        };
        a.createNode = function (a) {
          const c = this.pointClass;
          var f = (d, a) => g(d, (d) => d.id === a);
          let d = f(this.nodes, a);
          if (!d) {
            f = this.options.nodes && f(this.options.nodes, a);
            const m = new c().init(
              this,
              w({ className: "highcharts-node", isNode: !0, id: a, y: 1 }, f)
            );
            m.linksTo = [];
            m.linksFrom = [];
            m.getSum = function () {
              let d = 0,
                a = 0;
              m.linksTo.forEach((a) => {
                d += a.weight || 0;
              });
              m.linksFrom.forEach((d) => {
                a += d.weight || 0;
              });
              return Math.max(d, a);
            };
            m.offset = function (d, a) {
              let f = 0;
              for (let c = 0; c < m[a].length; c++) {
                if (m[a][c] === d) return f;
                f += m[a][c].weight;
              }
            };
            m.hasShape = function () {
              let d = 0;
              m.linksTo.forEach((a) => {
                a.outgoing && d++;
              });
              return !m.linksTo.length || d !== m.linksTo.length;
            };
            m.index = this.nodes.push(m) - 1;
            d = m;
          }
          d.formatPrefix = "node";
          d.name = d.name || d.options.id || "";
          d.mass = k(
            d.options.mass,
            d.options.marker && d.options.marker.radius,
            this.options.marker && this.options.marker.radius,
            4
          );
          return d;
        };
        a.destroy = c;
        a.generatePoints = function () {
          const a = this.chart,
            c = {};
          l.generatePoints.call(this);
          this.nodes || (this.nodes = []);
          this.colorCounter = 0;
          this.nodes.forEach((a) => {
            a.linksFrom.length = 0;
            a.linksTo.length = 0;
            a.level = a.options.level;
          });
          this.points.forEach((f) => {
            z(f.from) &&
              (c[f.from] || (c[f.from] = this.createNode(f.from)),
              c[f.from].linksFrom.push(f),
              (f.fromNode = c[f.from]),
              a.styledMode
                ? (f.colorIndex = k(f.options.colorIndex, c[f.from].colorIndex))
                : (f.color = f.options.color || c[f.from].color));
            z(f.to) &&
              (c[f.to] || (c[f.to] = this.createNode(f.to)),
              c[f.to].linksTo.push(f),
              (f.toNode = c[f.to]));
            f.name = f.name || f.id;
          }, this);
          this.nodeLookup = c;
        };
        a.setNodeState = A;
        a.updateNode = p;
      })(a || (a = {}));
      return a;
    }
  );
  t(
    b,
    "Series/Sankey/SankeyPoint.js",
    [
      b["Core/Series/Point.js"],
      b["Core/Series/SeriesRegistry.js"],
      b["Core/Utilities.js"],
    ],
    function (b, h, l) {
      ({
        seriesTypes: { column: h },
      } = h);
      const { defined: e } = l;
      class z extends h.prototype.pointClass {
        constructor() {
          super(...arguments);
          this.toNode =
            this.series =
            this.options =
            this.nodeY =
            this.nodeX =
            this.mass =
            this.linksTo =
            this.linksFrom =
            this.linkBase =
            this.level =
            this.fromNode =
            this.className =
              void 0;
        }
        applyOptions(h, g) {
          b.prototype.applyOptions.call(this, h, g);
          e(this.options.level) &&
            (this.options.column = this.column = this.options.level);
          return this;
        }
        getClassName() {
          return (
            (this.isNode ? "highcharts-node " : "highcharts-link ") +
            b.prototype.getClassName.call(this)
          );
        }
        getFromNode() {
          let b = -1,
            g;
          for (let n = 0; n < this.linksTo.length; n++) {
            const k = this.linksTo[n];
            k.fromNode.column > b &&
              k.fromNode !== this &&
              ((g = k.fromNode), (b = g.column));
          }
          return { fromNode: g, fromColumn: b };
        }
        setNodeColumn() {
          e(this.options.column) ||
            (this.column =
              0 === this.linksTo.length
                ? 0
                : this.getFromNode().fromColumn + 1);
        }
        isValid() {
          return this.isNode || "number" === typeof this.weight;
        }
      }
      return z;
    }
  );
  t(b, "Series/Sankey/SankeySeriesDefaults.js", [], function () {
    "";
    return {
      borderWidth: 0,
      colorByPoint: !0,
      curveFactor: 0.33,
      dataLabels: {
        enabled: !0,
        backgroundColor: "none",
        crop: !1,
        nodeFormat: void 0,
        nodeFormatter: function () {
          return this.point.name;
        },
        format: void 0,
        formatter: function () {},
        inside: !0,
      },
      inactiveOtherPoints: !0,
      linkOpacity: 0.5,
      opacity: 1,
      minLinkWidth: 0,
      nodeWidth: 20,
      nodePadding: 10,
      showInLegend: !1,
      states: {
        hover: { linkOpacity: 1, opacity: 1 },
        inactive: {
          linkOpacity: 0.1,
          opacity: 0.1,
          animation: { duration: 50 },
        },
      },
      tooltip: {
        followPointer: !0,
        headerFormat:
          '<span style="font-size: 0.8em">{series.name}</span><br/>',
        pointFormat:
          "{point.fromNode.name} \u2192 {point.toNode.name}: <b>{point.weight}</b><br/>",
        nodeFormat: "{point.name}: <b>{point.sum}</b><br/>",
      },
    };
  });
  t(
    b,
    "Series/Sankey/SankeyColumnComposition.js",
    [b["Core/Utilities.js"]],
    function (b) {
      const { defined: h, relativeLength: l } = b;
      var e;
      (function (b) {
        b.compose = function (b, n) {
          b.sankeyColumn = new e(b, n);
          return b;
        };
        class e {
          constructor(b, n) {
            this.points = b;
            this.series = n;
          }
          getTranslationFactor(b) {
            const g = this.points,
              k = g.slice(),
              a = b.options.minLinkWidth || 0;
            let c = 0,
              q,
              e =
                (b.chart.plotSizeY || 0) -
                (b.options.borderWidth || 0) -
                (g.length - 1) * b.nodePadding;
            for (; g.length; ) {
              c = e / g.sankeyColumn.sum();
              b = !1;
              for (q = g.length; q--; )
                g[q].getSum() * c < a && (g.splice(q, 1), (e -= a), (b = !0));
              if (!b) break;
            }
            g.length = 0;
            k.forEach((a) => {
              g.push(a);
            });
            return c;
          }
          top(b) {
            const g = this.series,
              k = g.nodePadding,
              a = this.points.reduce(function (a, q) {
                0 < a && (a += k);
                q = Math.max(q.getSum() * b, g.options.minLinkWidth || 0);
                return a + q;
              }, 0);
            return ((g.chart.plotSizeY || 0) - a) / 2;
          }
          left(b) {
            const g = this.series,
              k = g.chart,
              a = g.options.equalNodes,
              c = k.inverted ? k.plotHeight : k.plotWidth,
              q = g.nodePadding,
              e = this.points.reduce(function (k, e) {
                0 < k && (k += q);
                e = a
                  ? c / e.series.nodes.length - q
                  : Math.max(e.getSum() * b, g.options.minLinkWidth || 0);
                return k + e;
              }, 0);
            return ((k.plotSizeX || 0) - Math.round(e)) / 2;
          }
          sum() {
            return this.points.reduce(function (b, e) {
              return b + e.getSum();
            }, 0);
          }
          offset(b, e) {
            const g = this.points,
              a = this.series,
              c = a.nodePadding;
            let q = 0;
            if (a.is("organization") && b.hangsFrom)
              return { absoluteTop: b.hangsFrom.nodeY };
            for (let k = 0; k < g.length; k++) {
              var x = g[k].getSum();
              const p = Math.max(x * e, a.options.minLinkWidth || 0),
                v =
                  b.options[
                    a.chart.inverted ? "offsetHorizontal" : "offsetVertical"
                  ],
                u = b.options.offset || 0;
              x = x ? p + c : 0;
              if (g[k] === b)
                return { relativeTop: q + (h(v) ? l(v, p) : l(u, x)) };
              q += x;
            }
          }
        }
        b.SankeyColumnAdditions = e;
      })(e || (e = {}));
      return e;
    }
  );
  t(
    b,
    "Series/TreeUtilities.js",
    [b["Core/Color/Color.js"], b["Core/Utilities.js"]],
    function (b, h) {
      function l(a, b) {
        var c = b.before;
        const g = b.idRoot,
          h = b.mapIdToNode[g],
          p = b.points[a.i],
          v = (p && p.options) || {},
          u = [];
        let n = 0;
        a.levelDynamic = a.level - (!1 !== b.levelIsConstant ? 0 : h.level);
        a.name = k(p && p.name, "");
        a.visible = g === a.id || !0 === b.visible;
        "function" === typeof c && (a = c(a, b));
        a.children.forEach((c, d) => {
          const m = e({}, b);
          e(m, { index: d, siblings: a.children.length, visible: a.visible });
          c = l(c, m);
          u.push(c);
          c.visible && (n += c.val);
        });
        c = k(v.value, n);
        a.visible = 0 <= c && (0 < n || a.visible);
        a.children = u;
        a.childrenTotal = n;
        a.isLeaf = a.visible && !n;
        a.val = c;
        return a;
      }
      const {
        extend: e,
        isArray: t,
        isNumber: w,
        isObject: g,
        merge: n,
        pick: k,
      } = h;
      return {
        getColor: function (a, c) {
          const g = c.index;
          var e = c.mapOptionsToLevel;
          const h = c.parentColor,
            n = c.parentColorIndex,
            v = c.series;
          var u = c.colors;
          const l = c.siblings;
          var f = v.points,
            d = v.chart.options.chart;
          let m;
          var r;
          let y;
          if (a) {
            f = f[a.i];
            a = e[a.level] || {};
            if ((e = f && a.colorByPoint)) {
              m = f.index % (u ? u.length : d.colorCount);
              var B = u && u[m];
            }
            if (!v.chart.styledMode) {
              u = f && f.options.color;
              d = a && a.color;
              if ((r = h))
                r =
                  (r = a && a.colorVariation) &&
                  "brightness" === r.key &&
                  g &&
                  l
                    ? b
                        .parse(h)
                        .brighten((g / l) * r.to)
                        .get()
                    : h;
              r = k(u, d, B, r, v.color);
            }
            y = k(
              f && f.options.colorIndex,
              a && a.colorIndex,
              m,
              n,
              c.colorIndex
            );
          }
          return { color: r, colorIndex: y };
        },
        getLevelOptions: function (a) {
          let b = {},
            e,
            h,
            l;
          if (g(a)) {
            l = w(a.from) ? a.from : 1;
            var p = a.levels;
            h = {};
            e = g(a.defaults) ? a.defaults : {};
            t(p) &&
              (h = p.reduce((a, b) => {
                let c, f;
                g(b) &&
                  w(b.level) &&
                  ((f = n({}, b)),
                  (c = k(f.levelIsConstant, e.levelIsConstant)),
                  delete f.levelIsConstant,
                  delete f.level,
                  (b = b.level + (c ? 0 : l - 1)),
                  g(a[b]) ? n(!0, a[b], f) : (a[b] = f));
                return a;
              }, {}));
            p = w(a.to) ? a.to : 1;
            for (a = 0; a <= p; a++) b[a] = n({}, e, g(h[a]) ? h[a] : {});
          }
          return b;
        },
        setTreeValues: l,
        updateRootId: function (a) {
          if (g(a)) {
            var b = g(a.options) ? a.options : {};
            b = k(a.rootNode, b.rootId, "");
            g(a.userOptions) && (a.userOptions.rootId = b);
            a.rootNode = b;
          }
          return b;
        },
      };
    }
  );
  t(
    b,
    "Series/Sankey/SankeySeries.js",
    [
      b["Core/Color/Color.js"],
      b["Core/Globals.js"],
      b["Series/NodesComposition.js"],
      b["Series/Sankey/SankeyPoint.js"],
      b["Series/Sankey/SankeySeriesDefaults.js"],
      b["Core/Series/SeriesRegistry.js"],
      b["Series/Sankey/SankeyColumnComposition.js"],
      b["Series/TreeUtilities.js"],
      b["Core/Utilities.js"],
    ],
    function (b, h, l, e, t, w, g, n, k) {
      const {
          series: a,
          seriesTypes: { column: c },
        } = w,
        { getLevelOptions: q } = n,
        {
          extend: x,
          isObject: A,
          merge: p,
          pick: v,
          relativeLength: u,
          stableSort: z,
        } = k;
      class f extends c {
        constructor() {
          super(...arguments);
          this.translationFactor =
            this.points =
            this.options =
            this.nodeWidth =
            this.nodes =
            this.nodePadding =
            this.nodeLookup =
            this.group =
            this.data =
            this.colDistance =
              void 0;
        }
        static getDLOptions(a) {
          const d = A(a.optionsPoint) ? a.optionsPoint.dataLabels : {};
          a = A(a.level) ? a.level.dataLabels : {};
          return p({ style: {} }, a, d);
        }
        createNodeColumns() {
          const a = [];
          this.nodes.forEach(function (d) {
            d.setNodeColumn();
            a[d.column] || (a[d.column] = g.compose([], this));
            a[d.column].push(d);
          }, this);
          for (let d = 0; d < a.length; d++)
            "undefined" === typeof a[d] && (a[d] = g.compose([], this));
          return a;
        }
        order(a, b) {
          const d = this;
          "undefined" === typeof a.level &&
            ((a.level = b),
            a.linksFrom.forEach(function (a) {
              a.toNode && d.order(a.toNode, b + 1);
            }));
        }
        generatePoints() {
          l.generatePoints.apply(this, arguments);
          const a = this;
          this.orderNodes &&
            (this.nodes
              .filter(function (a) {
                return 0 === a.linksTo.length;
              })
              .forEach(function (d) {
                a.order(d, 0);
              }),
            z(this.nodes, function (a, d) {
              return a.level - d.level;
            }));
        }
        getNodePadding() {
          let a = this.options.nodePadding || 0;
          if (this.nodeColumns) {
            const d = this.nodeColumns.reduce(
              (a, d) => Math.max(a, d.length),
              0
            );
            d * a > this.chart.plotSizeY && (a = this.chart.plotSizeY / d);
          }
          return a;
        }
        hasData() {
          return !!this.processedXData.length;
        }
        pointAttribs(a, c) {
          if (!a) return {};
          const d = this,
            f =
              d.mapOptionsToLevel[
                (a.isNode ? a.level : a.fromNode.level) || 0
              ] || {},
            m = a.options,
            g = (f.states && f.states[c || ""]) || {};
          c = [
            "colorByPoint",
            "borderColor",
            "borderWidth",
            "linkOpacity",
            "opacity",
          ].reduce(function (a, b) {
            a[b] = v(g[b], m[b], f[b], d.options[b]);
            return a;
          }, {});
          const e = v(g.color, m.color, c.colorByPoint ? a.color : f.color);
          return a.isNode
            ? {
                fill: e,
                stroke: c.borderColor,
                "stroke-width": c.borderWidth,
                opacity: c.opacity,
              }
            : { fill: b.parse(e).setOpacity(c.linkOpacity).get() };
        }
        drawTracker() {
          c.prototype.drawTracker.call(this, this.points);
          c.prototype.drawTracker.call(this, this.nodes);
        }
        drawPoints() {
          c.prototype.drawPoints.call(this, this.points);
          c.prototype.drawPoints.call(this, this.nodes);
        }
        drawDataLabels() {
          c.prototype.drawDataLabels.call(this, this.points);
          c.prototype.drawDataLabels.call(this, this.nodes);
        }
        translate() {
          this.processedXData || this.processData();
          this.generatePoints();
          this.nodeColumns = this.createNodeColumns();
          this.nodeWidth = u(this.options.nodeWidth, this.chart.plotSizeX);
          const a = this,
            b = this.chart,
            c = this.options,
            f = this.nodeWidth,
            g = this.nodeColumns;
          this.nodePadding = this.getNodePadding();
          this.translationFactor = g.reduce(
            (b, d) => Math.min(b, d.sankeyColumn.getTranslationFactor(a)),
            Infinity
          );
          this.colDistance =
            (b.plotSizeX - f - c.borderWidth) / Math.max(1, g.length - 1);
          a.mapOptionsToLevel = q({
            from: 1,
            levels: c.levels,
            to: g.length - 1,
            defaults: {
              borderColor: c.borderColor,
              borderRadius: c.borderRadius,
              borderWidth: c.borderWidth,
              color: a.color,
              colorByPoint: c.colorByPoint,
              levelIsConstant: !0,
              linkColor: c.linkColor,
              linkLineWidth: c.linkLineWidth,
              linkOpacity: c.linkOpacity,
              states: c.states,
            },
          });
          g.forEach(function (b) {
            b.forEach(function (d) {
              a.translateNode(d, b);
            });
          }, this);
          this.nodes.forEach(function (b) {
            b.linksFrom.forEach(function (b) {
              (b.weight || b.isNull) &&
                b.to &&
                (a.translateLink(b), (b.allowShadow = !1));
            });
          });
        }
        translateLink(a) {
          var b = (b, c) => {
            c = b.offset(a, c) * g;
            return Math.min(
              b.nodeY + c,
              b.nodeY + ((b.shapeArgs && b.shapeArgs.height) || 0) - e
            );
          };
          let d = a.fromNode;
          var c = a.toNode;
          let f = this.chart,
            g = this.translationFactor,
            e = Math.max(a.weight * g, this.options.minLinkWidth);
          var k =
            (f.inverted ? -this.colDistance : this.colDistance) *
            this.options.curveFactor;
          let h = b(d, "linksFrom");
          b = b(c, "linksTo");
          let l = d.nodeX,
            n = this.nodeWidth;
          c = c.nodeX;
          var p = a.outgoing,
            q = c > l + n;
          f.inverted &&
            ((h = f.plotSizeY - h),
            (b = (f.plotSizeY || 0) - b),
            (n = -n),
            (e = -e),
            (q = l > c));
          a.shapeType = "path";
          a.linkBase = [h, h + e, b, b + e];
          if (q && "number" === typeof b)
            a.shapeArgs = {
              d: [
                ["M", l + n, h],
                ["C", l + n + k, h, c - k, b, c, b],
                ["L", c + (p ? n : 0), b + e / 2],
                ["L", c, b + e],
                ["C", c - k, b + e, l + n + k, h + e, l + n, h + e],
                ["Z"],
              ],
            };
          else if ("number" === typeof b) {
            k = c - 20 - e;
            p = c - 20;
            q = l + n;
            const d = q + 20,
              g = d + e,
              m = h,
              r = h + e,
              v = r + 20,
              u = v + (f.plotHeight - h - e),
              t = u + 20,
              y = t + e,
              C = b,
              w = C + e,
              E = w + 20,
              x = t + 0.7 * e,
              B = c - 0.7 * e,
              D = q + 0.7 * e;
            a.shapeArgs = {
              d: [
                ["M", q, m],
                ["C", D, m, g, r - 0.7 * e, g, v],
                ["L", g, u],
                ["C", g, x, D, y, q, y],
                ["L", c, y],
                ["C", B, y, k, x, k, u],
                ["L", k, E],
                ["C", k, w - 0.7 * e, B, C, c, C],
                ["L", c, w],
                ["C", p, w, p, w, p, E],
                ["L", p, u],
                ["C", p, t, p, t, c, t],
                ["L", q, t],
                ["C", d, t, d, t, d, u],
                ["L", d, v],
                ["C", d, r, d, r, q, r],
                ["Z"],
              ],
            };
          }
          a.dlBox = {
            x: l + (c - l + n) / 2,
            y: h + (b - h) / 2,
            height: e,
            width: 0,
          };
          a.tooltipPos = f.inverted
            ? [f.plotSizeY - a.dlBox.y - e / 2, f.plotSizeX - a.dlBox.x]
            : [a.dlBox.x, a.dlBox.y + e / 2];
          a.y = a.plotY = 1;
          a.x = a.plotX = 1;
          a.color || (a.color = d.color);
        }
        translateNode(a, b) {
          var c = this.translationFactor;
          const d = this.chart,
            e = this.options,
            { borderRadius: g, borderWidth: h = 0 } = e;
          var k = a.getSum();
          const m = Math.max(Math.round(k * c), this.options.minLinkWidth),
            n = Math.round(this.nodeWidth);
          var l = (Math.round(h) % 2) / 2,
            p = b.sankeyColumn.offset(a, c);
          b =
            Math.floor(
              v(p.absoluteTop, b.sankeyColumn.top(c) + p.relativeTop)
            ) + l;
          l =
            Math.floor(this.colDistance * a.column + h / 2) +
            u(a.options.offsetHorizontal || 0, n) +
            l;
          l = d.inverted ? d.plotSizeX - l : l;
          if ((a.sum = k)) {
            a.shapeType = "roundedRect";
            a.nodeX = l;
            a.nodeY = b;
            k = l;
            c = b;
            p = a.options.width || e.width || n;
            let h = a.options.height || e.height || m;
            const q = u("object" === typeof g ? g.radius : g || 0, p);
            d.inverted &&
              ((k = l - n),
              (c = d.plotSizeY - b - m),
              (p = a.options.height || e.height || n),
              (h = a.options.width || e.width || m));
            a.dlOptions = f.getDLOptions({
              level: this.mapOptionsToLevel[a.level],
              optionsPoint: a.options,
            });
            a.plotX = 1;
            a.plotY = 1;
            a.tooltipPos = d.inverted
              ? [d.plotSizeY - c - h / 2, d.plotSizeX - k - p / 2]
              : [k + p / 2, c + h / 2];
            a.shapeArgs = {
              x: k,
              y: c,
              width: p,
              height: h,
              r: q,
              display: a.hasShape() ? "" : "none",
            };
          } else a.dlOptions = { enabled: !1 };
        }
      }
      f.defaultOptions = p(c.defaultOptions, t);
      l.compose(e, f);
      x(f.prototype, {
        animate: a.prototype.animate,
        createNode: l.createNode,
        forceDL: !0,
        invertible: !0,
        isCartesian: !1,
        orderNodes: !0,
        noSharedTooltip: !0,
        pointArrayMap: ["from", "to", "weight"],
        pointClass: e,
        searchPoint: h.noop,
      });
      w.registerSeriesType("sankey", f);
      ("");
      return f;
    }
  );
  t(b, "masters/modules/sankey.src.js", [], function () {});
});
//# sourceMappingURL=sankey.js.map
