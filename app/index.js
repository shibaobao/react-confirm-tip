var React = require('react');
var ReactDOM = require('react-dom');
import { ConfirmTip } from './ConfirmTipService.js';

var TestComponent = React.createClass({
  getInitialState(){
    return {}
  },
  onConfirm(ev){
    var tip = new ConfirmTip(()=>{
      setTimeout(()=>{
        alert('完成');
        tip.hide();
      },2000);
    },()=>{

    });
    tip.show(ev);
  },
  render(){
    return (
      <div style={{textAlign:"center",padding:"100px"}}>
        <button className="btn btn-primary" onClick={this.onConfirm} >确认提示</button>
      </div>
    )
  }
});

ReactDOM.render(
  <TestComponent />,
  document.body.appendChild(document.createElement('div'))
);
