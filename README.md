###scrollview安装
package.json

`````
 '@wm/scrollview': 'git@github.com:zhoujianlin8/scrollview.git'
`````
### scrollview使用

````
import ScrollView from '@wm/scrollview'

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
        cb && cb();// cb（）｜ return true | new Promise //继续触发滚动
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
````
### FDE 工具
```
npm install fde-cli -g
```

### 使用文档
* [fde-cli](https://www.npmjs.com/package/fde-cli)


