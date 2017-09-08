
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import ScrollView from '../src/index';
class Demo extends React.Component{
    constructor(){
        super();
        this.state = {
            list: [1,3,4,5]
        };
        this.index = 0;
    }
    componentDidMount(){
        setTimeout(()=>{
            this.onBottom();
        },200)
    }
    onBottom(cb){
        this.index++;
        if(this.index > 5){
             return false;
        }
        this.setState({
            list: [1,2,...this.state.list]
        });
        cb && cb();
        /*return new Promise((resolve)=>{
            this.setState({
                list: [1,2,...this.state.list]
            });
            resolve();
        });*/
    }
    render(){
        const {list = []} = this.state;
        return <ScrollView onBottom = {this.onBottom.bind(this)}>
            {
                list.map(function (item,index) {
                    return <div className="row" key = {index}> row {index}</div>
                })
            }
        </ScrollView>
    }
}
ReactDOM.render(<Demo />, document.getElementById('container'));
