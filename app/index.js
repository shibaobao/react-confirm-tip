var React = require('react');
var ReactDOM = require('react-dom');
var Tip = require('./TipService.js');

var TestComponent = React.createClass({
  getInitialState(){
    return {}
  },
  onConfirm(ev){
    var TipInstance = Tip.getInstance();
    TipInstance.show({
      position:"left",
      event:ev
    })
  },
  render(){
    return (
      <div style={{textAlign:"center",padding:"200px"}}>
        <button className="btn btn-primary" onClick={this.onConfirm} >确认提示</button>
      </div>
    )
  }
});

ReactDOM.render(
  <TestComponent />,
  document.body.appendChild(document.createElement('div'))
);
