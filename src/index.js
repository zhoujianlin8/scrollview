import React from 'react';
export default class ScrollView extends React.Component {
    static defaultProps = {
        delay: 200,
        diff: 20,
        onBottom: null,
        onTop: null,
        disabled: false,
        style: {
            'overflowY': 'auto',
        },
        height: '100%'
    };
    constructor(props) {
        super(props);
        this.state = {
            height: props.height || null
        }
    }
    reset(){
        this._end = null;
        this._handle = null;
    }
    scrollHandler = e => {
        if (this._handle) {
            clearTimeout(this._handle);
        }
        const that = this;
        const {target} = e;
        const {scrollHeight, scrollTop,offsetHeight} = target;
        const {delay,diff, onBottom, onTop} = this.props;
        if(this._end) return;
        this._handle = setTimeout(() => {
            clearTimeout(this._handle);
            this._handle = null;
            if (scrollTop === 0 && onTop) {
               wrap(onTop);
            }else if(onBottom && (scrollHeight - (scrollTop + offsetHeight) <= diff)){
                wrap(onBottom);
            }
        }, delay);
        function wrap(fn) {
            that._end = ()=>{
                //截流
                setTimeout(function () {
                    that._end = null
                },delay)
            };
            const res = fn(that._end);
            if(res === true){
                that._end && that._end();
            }else if(res && typeof res.then==='function' ){
                res.then(function () {
                    that._end && that._end();
                })
            }
        }
    };
    componentDidMount() {
        const {height='auto'} = this.props;
        // 将容器初始渲染高度设置为容器可视高度
        if(height==='auto'||height === '100%'){
            this.setState({
                height: this.refs.c.offsetHeight
            });
        }
    }
    componentWillReceiveProps(next){
        const height = next.height;
        if(height && height !== this.props.height){
            this.setState({
                height: (height === 'auto' || height === '100%') ? this.refs.c.offsetHeight : height
            });
        }
    }
    render() {
        const {children, style = {}, className = '',disabled} = this.props;
        const ClassName = 'wm-scrollview ' + className;
        const {height} = this.state;
        return (
            <div ref="c"  style={{...style,height}} onScroll={disabled? null:this.scrollHandler} className={ClassName}>
                {children}
            </div>
        );
    }
};
