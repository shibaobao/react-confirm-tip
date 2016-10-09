const $q = require('q');
const _ = require('lodash');
const React = require('react');
const ReactDOM = require('react-dom');

module.exports = (()=>{
  // private
  var instance;
  var container;

  function init(){
    var defaultOption = {
      position : "right",
      event : null
    };

    function createEle() {

    }

    function getElementLeft(option){
      var element = option.event.target, position = option.position;
      var targetWidth = element.offsetWidth;
      var actualLeft = element.offsetLeft;
      var current = element.offsetParent;
      while (current !== null){
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
      }

      switch (position) {
        case 'left':
          actualLeft = actualLeft - 220;
          break;

        case 'right':
        actualLeft = actualLeft + targetWidth + 20;
          break;

        default:
          actualLeft = actualLeft - (200 - targetWidth)/2 ;
      }

      return actualLeft;
    }

    function getElementTop(option){
      var element = option.event.target, position = option.position;
      var targetHeight = element.offsetHeight;
      var actualTop = element.offsetTop;
      var current = element.offsetParent;
      while (current !== null){
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }


      switch (position) {
        case 'top':
          actualTop = actualTop - targetHeight - 90 ;
          break;

        case 'bottom':
          actualTop = actualTop + targetHeight + 20 ;
          break;

        default:
          actualTop = actualTop - 33 ;
      }

      return actualTop;
    }

    function createElement(){
      return React.createClass({

        getInitialState(){
          return {
          }
        },

        onConfirm(){

        },

        onCancel(){

        },

        render(){
          const {showLoading} = this.state;
          return (
            <div>
              <div style={{height:"35px",textAlign:"center",lineHeight:"35px",borderBottom:"1px solid #ddd"}}>
                {this.props.title ? this.props.title:"确认删除？"}
              </div>
              <div>
                <button
                  className="btn btn-default"
                  style={{marginRight:"10px"}}
                  onClick={this.props.onCancel}
                >
                  取消
                </button>
                <button
                  className="btn btn-primary"
                  onClick={this.onConfirm}
                >
                  确认
                </button>
              </div>
            </div>
          )
        }
      });
    }

    return {
      show(userOption){
        var option = _.assign({},defaultOption,userOption);
        var left = getElementLeft(option);
        var top = getElementTop(option);
        if(!container){
          container = document.createElement('div');
          container.id = 'confirmTip';
        }
        container.className ='confirm-tip-container fix-' + option.position;
        container.setAttribute("style", 'left:' + left + 'px;top:' + top + 'px');
        document.body.appendChild(container);
        var AppComponent = createElement();
        ReactDOM.render(
          <AppComponent

          />,
          document.querySelector('#confirmTip')
        );
      },
      hide(){

      }
    }
  }

  return {
    getInstance(){
      if(!instance){
        instance = init();
      }
      return instance;
    }
  }

})()
