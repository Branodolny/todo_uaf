//@@viewOn:imports
import React from "react";
import createReactClass from "create-react-class";
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import Config from "./config/config.js";
import ListDetail from "../list/list-detail";
import Calls from "calls";
import NewList from "../list/new-list";

//@@viewOff:imports

export const List = createReactClass({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin, UU5.Common.LoadMixin, UU5.Common.ContentMixin,UU5.Common.ElementaryMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "List",
    classNames: {
      main: Config.CSS + "list"
    }, calls: {
      onLoad: "listList"
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  // propTypes: {
  //   name: Proptypes.string,
  //   id: Proptypes.string,
  //   lists: Proptypes.array
  // },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  componentWillMount() {
    this.setCalls(Calls);
  },
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _openItem(data){
    UU5.Environment.setRoute({component: <ListDetail list={data}/> ,  url: { useCase: "list-detail"}});
  },
  _newList(lists){
    UU5.Environment.setRoute({component: <NewList lists={lists}/>, url:{useCase:"new-list"}});
  },

  _getAllLists(dtoOut) {
    return (
      <UU5.Bricks.Container>
        <UU5.Bricks.Row>
          <UU5.Bricks.Button colorSchema="green"  bgStyle="outline"  onClick={() => this._newList(dtoOut.data.itemList)} ><UU5.Bricks.Icon icon="uu5-plus" />List</UU5.Bricks.Button>
        </UU5.Bricks.Row>
      <UU5.Bricks.Row>
        <UU5.Bricks.Column colWidth="xs-12 s-5">

        <UU5.Bricks.Section content="TODO List"/>
        <ol>
          {console.log(this.state.dtoOut)}
          {dtoOut.data.itemList.map((list, i) => {
           return  <li key={i}><UU5.Bricks.Div><UU5.Bricks.Button colorSchema="blue"  bgStyle="outline" style='width:100%;' onClick={() => this._openItem(list)} >{list.name}</UU5.Bricks.Button></UU5.Bricks.Div></li>
          })}

        </ol>
        </UU5.Bricks.Column>
      </UU5.Bricks.Row>
      </UU5.Bricks.Container>
    );
  },
  _getChild(dtoOut) {
    console.log(this.state.dtoOut);
    return <UU5.Bricks.Todo props={dtoOut}/>
  },
  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        {this.getLoadFeedbackChildren(this._getAllLists)}
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default List;
