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
import NewItem from "../item/new-item";
import ItemDetail from "../item/item-detail";
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
        listDelete: "listDelete",
        listUpdate: "listUpdate"
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
    getInitialState() {
      return {
        list: this.props.list
      };
    },

    componentWillMount() {
      this.setCalls(Calls);
    },

    //@@viewOff:reactLifeCycle
    getOnLoadData_(props) {
      return {list: props.list.id};
    },

    onLoadSuccess_(dtoOut) {
      this.setState({itemList: dtoOut.data.itemList, loadFeedback: "ready"});
    },

    onLoadError_(dtoOut) {
      this.setState({error: "Something is wrong", loadFeedback: "error"});
    },
    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:overriding
    //@@viewOff:overriding

    //@@viewOn:private

    _handleCreate(opt) {
      let lists = this.state.itemList;
      lists.push(opt.dtoOut.data);
      this.setState({
        itemList: lists
      });
    },
    _closeModal() {
      ListDetail.modal.close();
    },
    _edit() {
      UU5.Environment.setRoute({
        component: <EditList list={this.state.list}/>
      });
    },
    _delete() {
      UU5.Environment.setRoute({
        component: <DeleteList list={this.state.list}/>

      });

    },
    _itemDetail(item) {
      UU5.Environment.setRoute({
        component: <ItemDetail list={this.state.list} item={item}/>

      });
    }
    ,
    _listControll() {
      return (
        <UU5.Bricks.Row>
          <UU5.Bricks.Button colorSchema="green" onClick={this._edit}>Edit {this.state.list.name}</UU5.Bricks.Button>
          <UU5.Bricks.Button colorSchema="pink" onClick={this._delete}>Delete {this.state.list.name}</UU5.Bricks.Button>
        </UU5.Bricks.Row>

      );
    },

    _newItem12() {
      return (
        <UU5.Bricks.Button
          colorSchema="green" bgStyle="outline"
          onClick={() => ListDetail.modal.open({
            header: "Create new Item",
            content: <NewItem items={this.state.itemList} list={this.props.list} closeModal={this._closeModal}
                              handleCreate={this._handleCreate}/>
          })}
        ><UU5.Bricks.Icon icon="uu5-plus"/>Item</UU5.Bricks.Button>
      );
    }
    ,
    _getAllItem() {
      return (
        <UU5.Bricks.Container>
          <UU5.Bricks.Row>

            <UU5.Bricks.Column colWidth="xs-12 s-5">

              <UU5.Bricks.Section content="TODO"/>
              <ol>
                {this.state.itemList.map((item, i) => {
                  let itemText = item.text;
                  if (itemText.length > 10) {
                    itemText = itemText.substring(0, 10);
                    itemText = itemText + "...";
                  }
                  return <li key={i}><UU5.Bricks.Div><UU5.Bricks.Button colorSchema="blue" bgStyle="outline"
                                                                        style='width:100%;'
                                                                        onClick={() => this._itemDetail(item)}>{itemText}</UU5.Bricks.Button></UU5.Bricks.Div>
                  </li>
                })}

              </ol>

            </UU5.Bricks.Column>
          </UU5.Bricks.Row>
        </UU5.Bricks.Container>
      );
    }
    ,


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
              {/*<UU5.Bricks.Button colorSchema="green" bgStyle="outline" onClick={() => this._newItem()}><UU5.Bricks.Icon*/}
              {/*  icon="uu5-plus"/>Item</UU5.Bricks.Button>*/}
              {this.getLoadFeedbackChildren(this._newItem12)}
            </UU5.Bricks.Row>
            <hr/>
            <UU5.Bricks.Row>
              <UU5.Bricks.Column colWidth="xs-12 s-8">
                {this.getLoadFeedbackChildren(this._getAllItem)}
              </UU5.Bricks.Column>
            </UU5.Bricks.Row>
            <UU5.Bricks.Modal ref_={modal => ListDetail.modal = modal}/>
          </UU5.Bricks.Container>
        </UU5.Bricks.Div>
      );
    }
//@@viewOff:render
  })
;

export default ListDetail;
