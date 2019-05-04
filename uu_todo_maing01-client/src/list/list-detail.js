//@@viewOn:imports
import React from "react";
import createReactClass from "create-react-class";
import Proptypes from "prop-types";
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Calls from "calls";


import "./list-detail.less";
import DeleteList from "./delete-list";
import EditList from "./edit-list";
//@@viewOff:imports

export const ListDetail = createReactClass({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin, UU5.Common.LoadMixin, UU5.Common.ContentMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "ListDetail",
    classNames: {
      main: Config.CSS + "listDetail"
    }, calls: {
      onLoad: "itemList",
      listDelete : "listDelete",
      listUpdate : "listUpdate"
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    list: Proptypes.object,

  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  componentWillMount() {
    this.setCalls(Calls);
  },
  //@@viewOff:reactLifeCycle
  getOnLoadData_(props) {
    return { list: props.list.id }; // only for demonstrative purposes
  },

  onLoadSuccess_(dtoOut) {
    this.setState({ data: dtoOut.data, loadFeedback: "ready" });
  },

  onLoadError_(dtoOut) {
    this.setState({ error: "Something is wrong", loadFeedback: "error" });
  },
  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private

  // _loadData() {
  //   this.setState({ callState: "loading" }, () => {
  //     let call = this.getCall("onLoad")({
  //       // list: "5cca032c7a869e016c64c0f4"
  //       list : this.props.list
  //     });
  //     call({
  //       done: (dtoOut) => {
  //         this.setState({ callState: "ready", data: dtoOut.data });
  //       },
  //       fail: (dtoOut) => {
  //         this.setState({ callState: "error", error: "Something was wrong..." });
  //       }
  //     })
  //   });
  // },
  _edit(){
    UU5.Environment.setRoute({component: <EditList list={this.props.list}/>});
  },
  _delete(){
    UU5.Environment.setRoute({component: <DeleteList list={this.props.list}/>});
  },
  _listControll(){
    return(
      <UU5.Bricks.Row>
        <UU5.Bricks.Button colorSchema="green"    onClick={this._edit}>Edit {this.props.list.name}</UU5.Bricks.Button>
        <UU5.Bricks.Button colorSchema="pink"   onClick={this._delete}>Delete {this.props.list.name}</UU5.Bricks.Button>
      </UU5.Bricks.Row>

    );
  },
  _getAllItem() {
    return (
      <UU5.Bricks.Container>
        <UU5.Bricks.Row>

          <UU5.Bricks.Column colWidth="xs-12 s-5">

            <UU5.Bricks.Section content="TODO"/>
            <ol>
              {this.state.data.itemList.map((item, i) => {
                return  <li key={i}><UU5.Bricks.Div><UU5.Bricks.Button colorSchema="blue"  bgStyle="outline" style='width:100%;' onClick={this._loadData}>{item.text}</UU5.Bricks.Button></UU5.Bricks.Div></li>
              })}

            </ol>

          </UU5.Bricks.Column>
        </UU5.Bricks.Row>
      </UU5.Bricks.Container>
    );
  },
  _getChildren() {
    let content;

    switch (this.getLoadFeedback()) {
      case "loading":
        content = <UU5.Bricks.Loading />;
        break;
      case "ready":
        content = (
          <UU5.Bricks.Blockquote colorSchema="success" background>
            {this.state.data}
          </UU5.Bricks.Blockquote>
        );
        break;
      case "error":
        content = <UU5.Bricks.Error content={this.state.error} />;
        break;
    }

    return content;
  },

  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Bricks.Container>
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="xs-12 s-8">
                <h2>{this.props.list.name}</h2>
              {this.getLoadFeedbackChildren(this._listControll)}
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>
          <hr/>
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="xs-12 s-8">
              {this.getLoadFeedbackChildren(this._getAllItem)}
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>
        </UU5.Bricks.Container>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default ListDetail;
