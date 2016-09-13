var React = require('react');
var ReactDOM = require('react-dom');
var resetMethod;

export class ConfirmTip {

  constructor(onConfirm,onCancel){
    this.confirmMethod = onConfirm;
    this.cancelMethod = onCancel;
  }

  show(e){
    var AppComponent = this.createElement(e);
    var container = document.getElementById('confirmTip');
    var left = this.getElementLeft(e.target);
    var top = this.getElementTop(e.target) - document.body.scrollTop;
    if(container){
      container.style = 'left:' + (left - 210) + 'px;top:' + (top - 38) + 'px;';
    }else{
      container = document.createElement('div');
      container.className ='confirm-tip-container';
      container.id = 'confirmTip';
      container.style = 'left:' + (left - 210) + 'px;top:' + (top - 38) + 'px';
      document.body.appendChild(container);
      ReactDOM.render(
        <AppComponent
          onConfirm={this.confirm}
          onCancel={this.cancel}
          self={this}
        />,
        document.querySelector('#confirmTip')
      );
    }
    var self = this;
    document.onclick = function(e) {
      e.stopPropagation();
      var target = e.target;
      if(target.querySelector('#confirmTip')){
        self.hide();
      }
    };

    window.onscroll = function () {
      self.hide();
    };
  }

  hide(){
    var container = document.getElementById('confirmTip');
    if(container){
      container.style.display = "none";
      document.onclick = null;
      window.onscroll = null;
      if(resetMethod && typeof resetMethod=='function'){
        resetMethod();
      }
    }
  }

  getElementLeft(element){
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;
    while (current !== null){
      actualLeft += current.offsetLeft;
      current = current.offsetParent;
    }
    return actualLeft;
  }

  getElementTop(element){
    var actualTop = element.offsetTop;
    var current = element.offsetParent;
    while (current !== null){
      actualTop += current.offsetTop;
      current = current.offsetParent;
    }
    return actualTop;
  }

  createElement(){
    return React.createClass({

      getInitialState(){
        return {
          showLoading:false
        }
      },

      onConfirmClick(){
        this.setState({
          showLoading:true
        });
        this.props.onConfirm.call(this.props.self,()=>{
          this.setState({
            showLoading:false
          })
        });
      },

      render(){
        const {showLoading} = this.state;
        return (
          <div>
            <div style={{height:"35px",textAlign:"center",lineHeight:"35px",borderBottom:"1px solid #ddd"}}>
              确认删除？
            </div>
            <div style={showLoading?{display:"none"}:{display:"flex",alignItems:"center",justifyContent:"center",height:"64px"}}>
              <button
                className="btn btn-default"
                style={{marginRight:"10px"}}
                onClick={this.props.onCancel.bind(this.props.self)}
              >
                取消
              </button>
              <button
                className="btn btn-primary"
                onClick={this.onConfirmClick}
              >
                确认
              </button>
            </div>
            <div style={showLoading?{display:"flex",alignItems:"center",justifyContent:"center",height:"64px"}:{display:"none"}}>
              <img src="dist/img/loading.gif" alt=""/>
            </div>
          </div>
        )
      }
    });
  }

  confirm(reset){
    resetMethod = reset;
    if(this.confirmMethod && typeof this.confirmMethod == 'function'){
      this.confirmMethod();
    }
  }

  cancel(){
    this.hide();
    if(this.cancelMethod && typeof this.cancelMethod == 'function'){
      this.cancelMethod();
    }
  }
}
