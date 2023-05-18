/*
 Highcharts JS v10.2.0 (2022-07-05)

 Sankey diagram module

 (c) 2010-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (c) {
  "object" === typeof module && module.exports
    ? ((c["default"] = c), (module.exports = c))
    : "function" === typeof define && define.amd
    ? define("highcharts/modules/sankey", ["highcharts"], function (q) {
        c(q);
        c.Highcharts = q;
        return c;
      })
    : c("undefined" !== typeof Highcharts ? Highcharts : void 0);
})(function (c) {
  function q(c, f, m, k) {
    c.hasOwnProperty(f) ||
      ((c[f] = k.apply(null, m)),
      "function" === typeof CustomEvent &&
        window.dispatchEvent(
          new CustomEvent("HighchartsModuleLoaded", {
            detail: { path: f, module: c[f] },
          })
        ));
  }
  c = c ? c._modules : {};
  q(
    c,
    "Series/NodesComposition.js",
    [c["Core/Series/SeriesRegistry.js"], c["Core/Utilities.js"]],
    function (c, f) {
      c = c.series;
      var m = c.prototype,
        k = c.prototype.pointClass.prototype,
        w = f.defined,
        z = f.extend,
        g = f.find,
        d = f.merge,
        n = f.pick,
        a;
      (function (a) {
        function e() {
          this.data = [].concat(this.points || [], this.nodes);
          return m.destroy.apply(this, arguments);
        }
        function c() {
          this.nodes &&
            (this.nodes.forEach(function (a) {
              a.destroy();
            }),
            (this.nodes.length = 0));
          m.setData.apply(this, arguments);
        }
        function v(a) {
          var d = arguments,
            h = this.isNode
              ? this.linksTo.concat(this.linksFrom)
              : [this.fromNode, this.toNode];
          "select" !== a &&
            h.forEach(function (b) {
              b &&
                b.series &&
                (k.setState.apply(b, d),
                b.isNode ||
                  (b.fromNode.graphic && k.setState.apply(b.fromNode, d),
                  b.toNode &&
                    b.toNode.graphic &&
                    k.setState.apply(b.toNode, d)));
            });
          k.setState.apply(this, d);
        }
        function t(a, e, h, b) {
          var l = this,
            A = this.series.options.nodes,
            y = this.series.options.data,
            c = (y && y.length) || 0,
            r = y && y[this.index];
          k.update.call(this, a, this.isNode ? !1 : e, h, b);
          this.isNode &&
            ((a = (A || []).reduce(function (b, a, d) {
              return l.id === a.id ? d : b;
            }, -1)),
            (b = d((A && A[a]) || {}, (y && y[this.index]) || {})),
            y && (r ? (y[this.index] = r) : (y.length = c)),
            A
              ? 0 <= a
                ? (A[a] = b)
                : A.push(b)
              : (this.series.options.nodes = [b]),
            n(e, !0) && this.series.chart.redraw(h));
        }
        var p = [];
        a.compose = function (a, d) {
          -1 === p.indexOf(a) &&
            (p.push(a),
            (a = a.prototype),
            (a.setNodeState = v),
            (a.setState = v),
            (a.update = t));
          -1 === p.indexOf(d) &&
            (p.push(d), (a = d.prototype), (a.destroy = e), (a.setData = c));
          return d;
        };
        a.createNode = function (a) {
          var d = this.pointClass,
            h = function (b, a) {
              return g(b, function (b) {
                return b.id === a;
              });
            },
            b = h(this.nodes, a);
          if (!b) {
            h = this.options.nodes && h(this.options.nodes, a);
            var l = new d().init(
              this,
              z({ className: "highcharts-node", isNode: !0, id: a, y: 1 }, h)
            );
            l.linksTo = [];
            l.linksFrom = [];
            l.getSum = function () {
              var b = 0,
                a = 0;
              l.linksTo.forEach(function (a) {
                b += a.weight || 0;
              });
              l.linksFrom.forEach(function (b) {
                a += b.weight || 0;
              });
              return Math.max(b, a);
            };
            l.offset = function (b, a) {
              for (var d = 0, h = 0; h < l[a].length; h++) {
                if (l[a][h] === b) return d;
                d += l[a][h].weight;
              }
            };
            l.hasShape = function () {
              var b = 0;
              l.linksTo.forEach(function (a) {
                a.outgoing && b++;
              });
              return !l.linksTo.length || b !== l.linksTo.length;
            };
            l.index = this.nodes.push(l) - 1;
            b = l;
          }
          b.formatPrefix = "node";
          b.name = b.name || b.options.id || "";
          b.mass = n(
            b.options.mass,
            b.options.marker && b.options.marker.radius,
            this.options.marker && this.options.marker.radius,
            4
          );
          return b;
        };
        a.destroy = e;
        a.generatePoints = function () {
          var a = this,
            d = this.chart,
            h = {};
          m.generatePoints.call(this);
          this.nodes || (this.nodes = []);
          this.colorCounter = 0;
          this.nodes.forEach(function (b) {
            b.linksFrom.length = 0;
            b.linksTo.length = 0;
            b.level = b.options.level;
          });
          this.points.forEach(function (b) {
            w(b.from) &&
              (h[b.from] || (h[b.from] = a.createNode(b.from)),
              h[b.from].linksFrom.push(b),
              (b.fromNode = h[b.from]),
              d.styledMode
                ? (b.colorIndex = n(b.options.colorIndex, h[b.from].colorIndex))
                : (b.color = b.options.color || h[b.from].color));
            w(b.to) &&
              (h[b.to] || (h[b.to] = a.createNode(b.to)),
              h[b.to].linksTo.push(b),
              (b.toNode = h[b.to]));
            b.name = b.name || b.id;
          }, this);
          this.nodeLookup = h;
        };
        a.setNodeState = v;
        a.updateNode = t;
      })(a || (a = {}));
      return a;
    }
  );
  q(
    c,
    "Series/Sankey/SankeyPoint.js",
    [
      c["Core/Series/Point.js"],
      c["Core/Series/SeriesRegistry.js"],
      c["Core/Utilities.js"],
    ],
    function (c, f, m) {
      var k =
          (this && this.__extends) ||
          (function () {
            var c = function (g, d) {
              c =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (d, a) {
                    d.__proto__ = a;
                  }) ||
                function (d, a) {
                  for (var e in a) a.hasOwnProperty(e) && (d[e] = a[e]);
                };
              return c(g, d);
            };
            return function (g, d) {
              function n() {
                this.constructor = g;
              }
              c(g, d);
              g.prototype =
                null === d
                  ? Object.create(d)
                  : ((n.prototype = d.prototype), new n());
            };
          })(),
        w = m.defined;
      return (function (f) {
        function g() {
          var d = (null !== f && f.apply(this, arguments)) || this;
          d.className = void 0;
          d.fromNode = void 0;
          d.level = void 0;
          d.linkBase = void 0;
          d.linksFrom = void 0;
          d.linksTo = void 0;
          d.mass = void 0;
          d.nodeX = void 0;
          d.nodeY = void 0;
          d.options = void 0;
          d.series = void 0;
          d.toNode = void 0;
          return d;
        }
        k(g, f);
        g.prototype.applyOptions = function (d, n) {
          c.prototype.applyOptions.call(this, d, n);
          w(this.options.level) &&
            (this.options.column = this.column = this.options.level);
          return this;
        };
        g.prototype.getClassName = function () {
          return (
            (this.isNode ? "highcharts-node " : "highcharts-link ") +
            c.prototype.getClassName.call(this)
          );
        };
        g.prototype.getFromNode = function () {
          for (var d = -1, c, a = 0; a < this.linksTo.length; a++) {
            var e = this.linksTo[a];
            e.fromNode.column > d &&
              e.fromNode !== this &&
              ((c = e.fromNode), (d = c.column));
          }
          return { fromNode: c, fromColumn: d };
        };
        g.prototype.setNodeColumn = function () {
          w(this.options.column) ||
            (this.column =
              0 === this.linksTo.length
                ? 0
                : this.getFromNode().fromColumn + 1);
        };
        g.prototype.isValid = function () {
          return this.isNode || "number" === typeof this.weight;
        };
        return g;
      })(f.seriesTypes.column.prototype.pointClass);
    }
  );
  q(
    c,
    "Series/Sankey/SankeyColumnComposition.js",
    [c["Core/Utilities.js"]],
    function (c) {
      var f = c.defined,
        m = c.relativeLength,
        k;
      (function (c) {
        c.compose = function (c, d) {
          c.sankeyColumn = new k(c, d);
          return c;
        };
        var k = (function () {
          function c(d, c) {
            this.points = d;
            this.series = c;
          }
          c.prototype.getTranslationFactor = function (d) {
            for (
              var c = this.points,
                a = c.slice(),
                e = d.options.minLinkWidth || 0,
                g = 0,
                u,
                f =
                  (d.chart.plotSizeY || 0) -
                  (d.options.borderWidth || 0) -
                  (c.length - 1) * d.nodePadding;
              c.length;

            ) {
              g = f / c.sankeyColumn.sum();
              d = !1;
              for (u = c.length; u--; )
                c[u].getSum() * g < e && (c.splice(u, 1), (f -= e), (d = !0));
              if (!d) break;
            }
            c.length = 0;
            a.forEach(function (a) {
              c.push(a);
            });
            return g;
          };
          c.prototype.top = function (d) {
            var c = this.series,
              a = c.nodePadding,
              e = this.points.reduce(function (e, g) {
                0 < e && (e += a);
                g = Math.max(g.getSum() * d, c.options.minLinkWidth || 0);
                return e + g;
              }, 0);
            return ((c.chart.plotSizeY || 0) - e) / 2;
          };
          c.prototype.left = function (d) {
            var c = this.series,
              a = c.chart,
              e = c.options.equalNodes,
              g = a.inverted ? a.plotHeight : a.plotWidth,
              f = c.nodePadding,
              v = this.points.reduce(function (a, p) {
                0 < a && (a += f);
                p = e
                  ? g / p.series.nodes.length - f
                  : Math.max(p.getSum() * d, c.options.minLinkWidth || 0);
                return a + p;
              }, 0);
            return ((a.plotSizeX || 0) - Math.round(v)) / 2;
          };
          c.prototype.sum = function () {
            return this.points.reduce(function (c, g) {
              return c + g.getSum();
            }, 0);
          };
          c.prototype.offset = function (c, g) {
            var a = this.points,
              d = this.series,
              k = d.nodePadding,
              u = 0;
            if (d.is("organization") && c.hangsFrom)
              return { absoluteTop: c.hangsFrom.nodeY };
            for (var v = 0; v < a.length; v++) {
              var t = a[v].getSum();
              var p = Math.max(t * g, d.options.minLinkWidth || 0),
                r =
                  c.options[
                    d.chart.inverted ? "offsetHorizontal" : "offsetVertical"
                  ],
                x = c.options.offset || 0;
              t = t ? p + k : 0;
              if (a[v] === c)
                return { relativeTop: u + (f(r) ? m(r, p) : m(x, t)) };
              u += t;
            }
          };
          return c;
        })();
        c.SankeyColumnAdditions = k;
      })(k || (k = {}));
      return k;
    }
  );
  q(
    c,
    "Series/TreeUtilities.js",
    [c["Core/Color/Color.js"], c["Core/Utilities.js"]],
    function (c, f) {
      function m(a, c) {
        var d = c.before,
          e = c.idRoot,
          g = c.mapIdToNode[e],
          f = c.points[a.i],
          p = (f && f.options) || {},
          r = [],
          x = 0;
        a.levelDynamic = a.level - (!1 !== c.levelIsConstant ? 0 : g.level);
        a.name = n(f && f.name, "");
        a.visible = e === a.id || !0 === c.visible;
        "function" === typeof d && (a = d(a, c));
        a.children.forEach(function (d, b) {
          var l = k({}, c);
          k(l, { index: b, siblings: a.children.length, visible: a.visible });
          d = m(d, l);
          r.push(d);
          d.visible && (x += d.val);
        });
        d = n(p.value, x);
        a.visible = 0 <= d && (0 < x || a.visible);
        a.children = r;
        a.childrenTotal = x;
        a.isLeaf = a.visible && !x;
        a.val = d;
        return a;
      }
      var k = f.extend,
        w = f.isArray,
        q = f.isNumber,
        g = f.isObject,
        d = f.merge,
        n = f.pick;
      return {
        getColor: function (a, d) {
          var g = d.index,
            e = d.mapOptionsToLevel,
            f = d.parentColor,
            k = d.parentColorIndex,
            p = d.series,
            r = d.colors,
            x = d.siblings,
            h = p.points,
            b = p.chart.options.chart,
            l;
          if (a) {
            h = h[a.i];
            a = e[a.level] || {};
            if ((e = h && a.colorByPoint)) {
              var A = h.index % (r ? r.length : b.colorCount);
              var y = r && r[A];
            }
            if (!p.chart.styledMode) {
              r = h && h.options.color;
              b = a && a.color;
              if ((l = f))
                l =
                  (l = a && a.colorVariation) &&
                  "brightness" === l.key &&
                  g &&
                  x
                    ? c
                        .parse(f)
                        .brighten((g / x) * l.to)
                        .get()
                    : f;
              l = n(r, b, y, l, p.color);
            }
            var J = n(
              h && h.options.colorIndex,
              a && a.colorIndex,
              A,
              k,
              d.colorIndex
            );
          }
          return { color: l, colorIndex: J };
        },
        getLevelOptions: function (a) {
          var c = null;
          if (g(a)) {
            c = {};
            var f = q(a.from) ? a.from : 1;
            var k = a.levels;
            var m = {};
            var t = g(a.defaults) ? a.defaults : {};
            w(k) &&
              (m = k.reduce(function (a, c) {
                if (g(c) && q(c.level)) {
                  var e = d({}, c);
                  var h = n(e.levelIsConstant, t.levelIsConstant);
                  delete e.levelIsConstant;
                  delete e.level;
                  c = c.level + (h ? 0 : f - 1);
                  g(a[c]) ? d(!0, a[c], e) : (a[c] = e);
                }
                return a;
              }, {}));
            k = q(a.to) ? a.to : 1;
            for (a = 0; a <= k; a++) c[a] = d({}, t, g(m[a]) ? m[a] : {});
          }
          return c;
        },
        setTreeValues: m,
        updateRootId: function (a) {
          if (g(a)) {
            var c = g(a.options) ? a.options : {};
            c = n(a.rootNode, c.rootId, "");
            g(a.userOptions) && (a.userOptions.rootId = c);
            a.rootNode = c;
          }
          return c;
        },
      };
    }
  );
  q(
    c,
    "Series/Sankey/SankeySeries.js",
    [
      c["Core/Color/Color.js"],
      c["Core/Globals.js"],
      c["Series/NodesComposition.js"],
      c["Series/Sankey/SankeyPoint.js"],
      c["Core/Series/SeriesRegistry.js"],
      c["Series/Sankey/SankeyColumnComposition.js"],
      c["Series/TreeUtilities.js"],
      c["Core/Utilities.js"],
    ],
    function (c, f, m, k, q, z, g, d) {
      var n =
          (this && this.__extends) ||
          (function () {
            var a = function (c, b) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (b, a) {
                    b.__proto__ = a;
                  }) ||
                function (b, a) {
                  for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
                };
              return a(c, b);
            };
            return function (c, b) {
              function d() {
                this.constructor = c;
              }
              a(c, b);
              c.prototype =
                null === b
                  ? Object.create(b)
                  : ((d.prototype = b.prototype), new d());
            };
          })(),
        a = q.series,
        e = q.seriesTypes.column,
        w = g.getLevelOptions;
      g = d.extend;
      var u = d.isObject,
        v = d.merge,
        t = d.pick,
        p = d.relativeLength,
        r = d.stableSort;
      d = (function (a) {
        function d() {
          var b = (null !== a && a.apply(this, arguments)) || this;
          b.colDistance = void 0;
          b.data = void 0;
          b.group = void 0;
          b.nodeLookup = void 0;
          b.nodePadding = void 0;
          b.nodes = void 0;
          b.nodeWidth = void 0;
          b.options = void 0;
          b.points = void 0;
          b.translationFactor = void 0;
          return b;
        }
        n(d, a);
        d.getDLOptions = function (b) {
          var a = u(b.optionsPoint) ? b.optionsPoint.dataLabels : {};
          b = u(b.level) ? b.level.dataLabels : {};
          return v({ style: {} }, b, a);
        };
        d.prototype.createNodeColumns = function () {
          var b = [];
          this.nodes.forEach(function (a) {
            a.setNodeColumn();
            b[a.column] || (b[a.column] = z.compose([], this));
            b[a.column].push(a);
          }, this);
          for (var a = 0; a < b.length; a++)
            "undefined" === typeof b[a] && (b[a] = z.compose([], this));
          return b;
        };
        d.prototype.generatePoints = function () {
          function b(a, c) {
            "undefined" === typeof a.level &&
              ((a.level = c),
              a.linksFrom.forEach(function (a) {
                a.toNode && b(a.toNode, c + 1);
              }));
          }
          m.generatePoints.apply(this, arguments);
          this.orderNodes &&
            (this.nodes
              .filter(function (b) {
                return 0 === b.linksTo.length;
              })
              .forEach(function (a) {
                b(a, 0);
              }),
            r(this.nodes, function (b, a) {
              return b.level - a.level;
            }));
        };
        d.prototype.getNodePadding = function () {
          var b = this.options.nodePadding || 0;
          if (this.nodeColumns) {
            var a = this.nodeColumns.reduce(function (b, a) {
              return Math.max(b, a.length);
            }, 0);
            a * b > this.chart.plotSizeY && (b = this.chart.plotSizeY / a);
          }
          return b;
        };
        d.prototype.hasData = function () {
          return !!this.processedXData.length;
        };
        d.prototype.pointAttribs = function (b, a) {
          if (!b) return {};
          var d = this,
            l =
              d.mapOptionsToLevel[
                (b.isNode ? b.level : b.fromNode.level) || 0
              ] || {},
            g = b.options,
            f = (l.states && l.states[a || ""]) || {};
          a = [
            "colorByPoint",
            "borderColor",
            "borderWidth",
            "linkOpacity",
            "opacity",
          ].reduce(function (a, b) {
            a[b] = t(f[b], g[b], l[b], d.options[b]);
            return a;
          }, {});
          var E = t(f.color, g.color, a.colorByPoint ? b.color : l.color);
          return b.isNode
            ? {
                fill: E,
                stroke: a.borderColor,
                "stroke-width": a.borderWidth,
                opacity: a.opacity,
              }
            : { fill: c.parse(E).setOpacity(a.linkOpacity).get() };
        };
        d.prototype.render = function () {
          var a = this.points;
          this.points = this.points.concat(this.nodes || []);
          e.prototype.render.call(this);
          this.points = a;
        };
        d.prototype.translate = function () {
          this.processedXData || this.processData();
          this.generatePoints();
          this.nodeColumns = this.createNodeColumns();
          this.nodeWidth = p(this.options.nodeWidth, this.chart.plotSizeX);
          var a = this,
            c = this.chart,
            d = this.options,
            g = this.nodeWidth,
            f = this.nodeColumns;
          this.nodePadding = this.getNodePadding();
          this.translationFactor = f.reduce(function (b, c) {
            return Math.min(b, c.sankeyColumn.getTranslationFactor(a));
          }, Infinity);
          this.colDistance =
            (c.plotSizeX - g - d.borderWidth) / Math.max(1, f.length - 1);
          a.mapOptionsToLevel = w({
            from: 1,
            levels: d.levels,
            to: f.length - 1,
            defaults: {
              borderColor: d.borderColor,
              borderRadius: d.borderRadius,
              borderWidth: d.borderWidth,
              color: a.color,
              colorByPoint: d.colorByPoint,
              levelIsConstant: !0,
              linkColor: d.linkColor,
              linkLineWidth: d.linkLineWidth,
              linkOpacity: d.linkOpacity,
              states: d.states,
            },
          });
          f.forEach(function (b) {
            b.forEach(function (c) {
              a.translateNode(c, b);
            });
          }, this);
          this.nodes.forEach(function (b) {
            b.linksFrom.forEach(function (b) {
              (b.weight || b.isNull) &&
                b.to &&
                (a.translateLink(b), (b.allowShadow = !1));
            });
          });
        };
        d.prototype.translateLink = function (a) {
          var b = function (b, d) {
              d = b.offset(a, d) * g;
              return Math.min(
                b.nodeY + d,
                b.nodeY + ((b.shapeArgs && b.shapeArgs.height) || 0) - e
              );
            },
            c = a.fromNode,
            d = a.toNode,
            f = this.chart,
            g = this.translationFactor,
            e = Math.max(a.weight * g, this.options.minLinkWidth),
            h =
              (f.inverted ? -this.colDistance : this.colDistance) *
              this.options.curveFactor,
            k = b(c, "linksFrom");
          b = b(d, "linksTo");
          var p = c.nodeX,
            m = this.nodeWidth;
          d = d.nodeX;
          var q = a.outgoing,
            n = d > p + m;
          f.inverted &&
            ((k = f.plotSizeY - k),
            (b = (f.plotSizeY || 0) - b),
            (m = -m),
            (e = -e),
            (n = p > d));
          a.shapeType = "path";
          a.linkBase = [k, k + e, b, b + e];
          if (n && "number" === typeof b)
            a.shapeArgs = {
              d: [
                ["M", p + m, k],
                ["C", p + m + h, k, d - h, b, d, b],
                ["L", d + (q ? m : 0), b + e / 2],
                ["L", d, b + e],
                ["C", d - h, b + e, p + m + h, k + e, p + m, k + e],
                ["Z"],
              ],
            };
          else if ("number" === typeof b) {
            h = d - 20 - e;
            q = d - 20;
            n = p + m;
            var r = n + 20,
              t = r + e,
              v = k,
              u = k + e,
              x = u + 20,
              w = x + (f.plotHeight - k - e),
              B = w + 20,
              z = B + e,
              D = b,
              C = D + e,
              F = C + 20,
              G = B + 0.7 * e,
              H = d - 0.7 * e,
              I = n + 0.7 * e;
            a.shapeArgs = {
              d: [
                ["M", n, v],
                ["C", I, v, t, u - 0.7 * e, t, x],
                ["L", t, w],
                ["C", t, G, I, z, n, z],
                ["L", d, z],
                ["C", H, z, h, G, h, w],
                ["L", h, F],
                ["C", h, C - 0.7 * e, H, D, d, D],
                ["L", d, C],
                ["C", q, C, q, C, q, F],
                ["L", q, w],
                ["C", q, B, q, B, d, B],
                ["L", n, B],
                ["C", r, B, r, B, r, w],
                ["L", r, x],
                ["C", r, u, r, u, n, u],
                ["Z"],
              ],
            };
          }
          a.dlBox = {
            x: p + (d - p + m) / 2,
            y: k + (b - k) / 2,
            height: e,
            width: 0,
          };
          a.tooltipPos = f.inverted
            ? [f.plotSizeY - a.dlBox.y - e / 2, f.plotSizeX - a.dlBox.x]
            : [a.dlBox.x, a.dlBox.y + e / 2];
          a.y = a.plotY = 1;
          a.x = a.plotX = 1;
          a.color || (a.color = c.color);
        };
        d.prototype.translateNode = function (a, c) {
          var b = this.translationFactor,
            e = this.chart,
            f = this.options,
            g = a.getSum(),
            h = Math.max(Math.round(g * b), this.options.minLinkWidth),
            k = Math.round(this.nodeWidth),
            l = (Math.round(f.borderWidth) % 2) / 2,
            m = c.sankeyColumn.offset(a, b);
          c =
            Math.floor(
              t(m.absoluteTop, c.sankeyColumn.top(b) + m.relativeTop)
            ) + l;
          l =
            Math.floor(this.colDistance * a.column + f.borderWidth / 2) +
            p(a.options.offsetHorizontal || 0, k) +
            l;
          l = e.inverted ? e.plotSizeX - l : l;
          if ((a.sum = g)) {
            a.shapeType = "rect";
            a.nodeX = l;
            a.nodeY = c;
            g = l;
            b = c;
            m = a.options.width || f.width || k;
            var n = a.options.height || f.height || h;
            e.inverted &&
              ((g = l - k),
              (b = e.plotSizeY - c - h),
              (m = a.options.height || f.height || k),
              (n = a.options.width || f.width || h));
            a.dlOptions = d.getDLOptions({
              level: this.mapOptionsToLevel[a.level],
              optionsPoint: a.options,
            });
            a.plotX = 1;
            a.plotY = 1;
            a.tooltipPos = e.inverted
              ? [e.plotSizeY - b - n / 2, e.plotSizeX - g - m / 2]
              : [g + m / 2, b + n / 2];
            a.shapeArgs = {
              x: g,
              y: b,
              width: m,
              height: n,
              display: a.hasShape() ? "" : "none",
            };
          } else a.dlOptions = { enabled: !1 };
        };
        d.defaultOptions = v(e.defaultOptions, {
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
              '<span style="font-size: 10px">{series.name}</span><br/>',
            pointFormat:
              "{point.fromNode.name} \u2192 {point.toNode.name}: <b>{point.weight}</b><br/>",
            nodeFormat: "{point.name}: <b>{point.sum}</b><br/>",
          },
        });
        return d;
      })(e);
      m.compose(k, d);
      g(d.prototype, {
        animate: a.prototype.animate,
        createNode: m.createNode,
        forceDL: !0,
        invertible: !0,
        isCartesian: !1,
        orderNodes: !0,
        noSharedTooltip: !0,
        pointArrayMap: ["from", "to", "weight"],
        pointClass: k,
        searchPoint: f.noop,
      });
      q.registerSeriesType("sankey", d);
      ("");
      ("");
      return d;
    }
  );
  q(c, "masters/modules/sankey.src.js", [], function () {});
});
//# sourceMappingURL=sankey.js.map
