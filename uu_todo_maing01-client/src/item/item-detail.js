//@@viewOn:imports
import React from "react";
import createReactClass from "create-react-class";
import Proptypes from "prop-types";
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Calls from "calls";


import "./item-detail.less";
import DeleteItem from "./delete-item";
import EditItem from "./edit-item";
// import NewItem from "../item/new-item";
//@@viewOff:imports

export const ItemDetail = createReactClass({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin, UU5.Common.LoadMixin, UU5.Common.ContentMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "ItemDetail",
    classNames: {
      main: Config.CSS + "ItemDetail"
    }, calls: {
      onLoad: "itemGet",
      itemDelete: "itemDelete",
      itemUpdate: "itemUpdate",
      itemComplete: "itemComplete"
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    item: Proptypes.object,
    list: Proptypes.object
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle

  componentWillMount() {
    this.setCalls(Calls);
  },
  getOnLoadData_(props) {
    return {id: props.item.id};
  },

  onLoadSuccess_(dtoOut) {
    this.setState({
      completed: dtoOut.data.item.completed || false,
      data: dtoOut.data,
      loadFeedback: "ready"
    });
  },

  onLoadError_(dtoOut) {
    this.setState({error: "Something is wrong", loadFeedback: "error"});
  },
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private


  _edit() {
    UU5.Environment.setRoute({component: <EditItem list={this.props.list} item={this.props.item}/>});
  },
  _delete() {
    UU5.Environment.setRoute({component: <DeleteItem list={this.props.list} item={this.props.item}/>});
  },

  _itemControll() {
    return (
      <UU5.Bricks.Row>
        {console.log(this.state)}
        <UU5.Bricks.Button colorSchema="green" onClick={this._edit}>Edit todo item</UU5.Bricks.Button>
        <UU5.Bricks.Button colorSchema="pink" onClick={this._delete}>Delete dodo item</UU5.Bricks.Button>
        <UU5.Bricks.Button colorSchema="blue"
                           onClick={this._complete}>
          {this.state.completed
            ? <UU5.Bricks.Icon icon="uu5-ok"/>
            : <UU5.Bricks.Icon icon="uu5-cross"/>
          } Set todo complete status</UU5.Bricks.Button>
      </UU5.Bricks.Row>

    );
  },
  _complete() {
    let completed = this.state.completed;
    completed = !completed;
    this.setState({
      completed: completed
    });
    let call = this.getCall("itemComplete");
    let dtoIn = {
      data: {
        complete: completed,
        item: this.state.data.item.id,
        list: this.props.list.id,
        text: this.state.data.item.text
      },
      done: this._handlesaveDone,
      fail: this._handlesaveFail
    };
    call(dtoIn);
  },

  _handlesaveDone() {
  },
  _handlesaveFail() {
  },


  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Bricks.Container>
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="xs-12 s-8">
              <h4> List: {this.props.list.name}</h4>
              <h2>TODO text: {this.props.item.text}</h2>
              <h3>is completed :
                {this.state.completed
                  ? <UU5.Bricks.Icon icon="uu5-ok"/>
                  : <UU5.Bricks.Icon icon="uu5-cross"/>
                }
              </h3>
              {this._itemControll()}
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>
          <hr/>

        </UU5.Bricks.Container>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default ItemDetail;
