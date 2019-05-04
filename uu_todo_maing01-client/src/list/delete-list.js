//@@viewOn:imports
import React from "react";
import createReactClass from "create-react-class";
import Proptypes from "prop-types";
import * as UU5 from "uu5g04";
import "uu5g04-forms";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Calls from "calls";


import "./delete-list.less";
import ListDetail from "./list-detail";
//@@viewOff:imports

export const DeleteList = createReactClass({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin, UU5.Common.CallsMixin, UU5.Forms.FormMixin, UU5.Common.ContentMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "DeleteList",
    classNames: {
      main: Config.CSS + "deleteList"
    }, calls: {
      deleteList: "deleteList",
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

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private


  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Bricks.Container>
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="xs-12 s-8">
              <h2>Delete list {this.props.list.name}?</h2>
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>
          <hr/>
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="xs-12 s-8">
              <UU5.Forms.Form
                progressIndicator={<UU5.Bricks.Loading/>}
                onCancel={
                  (opt) => {
                    UU5.Environment.setRoute({component: <ListDetail list={this.props.list}/>})
                  }
                }
                onSave={(opt) => {

                  Calls.deleteList({
                    data: {
                      id: this.props.list.id,
                      forceDelete: opt.values.forceDelete
                    },
                    done: opt.component.saveDone,
                    fail: opt.component.saveFail
                  });
                }}
                onSaveDone={(opt) => {
                  opt.component.getAlertBus().setAlert({
                    content: "List " + this.props.list.name+ " was deleted.",
                    colorSchema: "success"
                  });
                  opt.component.reset();
                  UU5.Environment.setRoute("list");
                }}
                onSaveFail={(opt) => {
                  console.log(opt);
                  opt.component.getAlertBus().setAlert({
                    content: opt.dtoOut.message,
                    colorSchema: "danger"
                  });
                }}
              >
                <UU5.Forms.Checkbox
                  name="forceDelete"
                  value={false}
                  label="Delete all item's in this TODO list!"
                  size="l"
                />
                <UU5.Forms.Controls
                  buttonSubmitProps={{colorSchema:"pink", content:"DELETE!"}} buttonCancelProps={{colorSchema:"green", content:"Abort"}}
                />
              </UU5.Forms.Form>
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>
        </UU5.Bricks.Container>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default DeleteList;
