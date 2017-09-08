'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollView = function (_React$Component) {
    _inherits(ScrollView, _React$Component);

    function ScrollView(props) {
        _classCallCheck(this, ScrollView);

        var _this = _possibleConstructorReturn(this, (ScrollView.__proto__ || Object.getPrototypeOf(ScrollView)).call(this, props));

        _this.scrollHandler = function (e) {
            if (_this._handle) {
                clearTimeout(_this._handle);
            }
            var that = _this;
            var target = e.target;
            var scrollHeight = target.scrollHeight,
                scrollTop = target.scrollTop,
                offsetHeight = target.offsetHeight;
            var _this$props = _this.props,
                delay = _this$props.delay,
                diff = _this$props.diff,
                onBottom = _this$props.onBottom,
                onTop = _this$props.onTop;

            if (_this._end) return;
            _this._handle = setTimeout(function () {
                clearTimeout(_this._handle);
                _this._handle = null;
                if (scrollTop === 0 && onTop) {
                    wrap(onTop);
                } else if (onBottom && scrollHeight - (scrollTop + offsetHeight) <= diff) {
                    wrap(onBottom);
                }
            }, delay);
            function wrap(fn) {
                that._end = function () {
                    //截流
                    setTimeout(function () {
                        that._end = null;
                    }, delay);
                };
                var res = fn(that._end);
                if (res === true) {
                    that._end && that._end();
                } else if (res && typeof res.then === 'function') {
                    res.then(function () {
                        that._end && that._end();
                    });
                }
            }
        };

        _this.state = {
            height: props.height || null
        };
        return _this;
    }

    _createClass(ScrollView, [{
        key: 'reset',
        value: function reset() {
            this._end = null;
            this._handle = null;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props$height = this.props.height,
                height = _props$height === undefined ? 'auto' : _props$height;
            // 将容器初始渲染高度设置为容器可视高度

            if (height === 'auto' || height === '100%') {
                this.setState({
                    height: this.refs.c.offsetHeight
                });
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(next) {
            var height = next.height;
            if (height && height !== this.props.height) {
                this.setState({
                    height: height === 'auto' || height === '100%' ? this.refs.c.offsetHeight : height
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                _props$style = _props.style,
                style = _props$style === undefined ? {} : _props$style,
                _props$className = _props.className,
                className = _props$className === undefined ? '' : _props$className,
                disabled = _props.disabled;

            var ClassName = 'wm-scrollview ' + className;
            var height = this.state.height;

            return _react2.default.createElement(
                'div',
                { ref: 'c', style: _extends({}, style, { height: height }), onScroll: disabled ? null : this.scrollHandler, className: ClassName },
                children
            );
        }
    }]);

    return ScrollView;
}(_react2.default.Component);

ScrollView.defaultProps = {
    delay: 200,
    diff: 20,
    onBottom: null,
    onTop: null,
    disabled: false,
    style: {
        'overflowY': 'auto'
    },
    height: '100%'
};
exports.default = ScrollView;
;