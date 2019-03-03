"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var events_1 = require("events"); //es2015
var j;
(function (j) {
    var Observer = /** @class */ (function (_super) {
        __extends(Observer, _super);
        function Observer(context) {
            var _this = _super.call(this) || this;
            _this.context = context;
            return _this;
        }
        Observer.prototype.get = function (path) {
            var identifiers = path.split('.');
            return this._get(identifiers);
        };
        Observer.prototype._get = function (identifiers) {
            var element = this.context;
            for (var _i = 0, identifiers_1 = identifiers; _i < identifiers_1.length; _i++) {
                var identifier = identifiers_1[_i];
                element = element[identifier];
            }
            return element;
        };
        Observer.prototype.set = function (path, value) {
            var identifiers = path.split('.');
            var lastIndex = identifiers.length - 1;
            var element = this._get(identifiers.slice(0, lastIndex));
            element[identifiers[lastIndex]] = value;
            //Observer-pattern的core
            for (var i = identifiers.length; i > 0; i--) {
                var path_1 = identifiers.slice(0, i).join('.');
                this.emit(path_1);
            }
        };
        return Observer;
    }(events_1.EventEmitter));
    var test = {
        connected: false,
        loaded: false,
        foo: "abc",
        bar: { biu: { biuu: 123 } }
    };
    var testObserver = new Observer(test);
    // testObserver.set('bar.biu', 456)
    testObserver.on("bar.biu", function () {
        // console.log("bar.biu被改了")
    });
    // console.log(testObserver.get('bar.biu'))
    var a = '';
    var handler = {
        get: function (obj, prop) {
            a += prop + '.';
            return typeof obj[prop] == 'number' || 'string' ? obj[prop] : new Proxy(obj[prop], handler);
        }
    };
    test = new Proxy(test, handler);
    // console.log(test.bar.biu.biuu)
    // console.log(a)
    // console.log(Proxy instanceof test )
    // console.log(Proxy instanceof test.bar)
})(j || (j = {}));
