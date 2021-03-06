//@@viewOn:imports
import React from "react";
import createReactClass from "create-react-class";
import Proptypes from "prop-types";
import * as UU5 from "uu5g04";
import "uu5g04-forms";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Calls from "calls";


import "./new-item.less";
import ListDetail from "../list/list-detail";
import ItemDetail from "./item-detail";
//@@viewOff:imports

export const NewItem = createReactClass({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin, UU5.Common.CallsMixin, UU5.Forms.FormMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "NewItem",
    classNames: {
      main: Config.CSS + "newItem"
    }, calls: {
      listCreate: "itemCreate",
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    items: Proptypes.array,
    list: Proptypes.object,
    closeModal : Proptypes.func,
    handleCreate: Proptypes.func
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  getInitialState() {
    return {
      items: this.props.items
    };
  },
  componentWillMount() {
    this.setCalls(Calls);
  },
  //@@viewOff:reactLifeCycle

  //@@viewOn:interface
  //@@viewOff:interface

  //@@viewOn:overriding
  //@@viewOff:overriding

  //@@viewOn:private
  _validateName(opt) {
    this.state.items.map((item) => {
      if (item.name == opt.value) {
        return {
          feedback: "error",
          message: "Item with name " + item.name + " exist!"
        };
      }
    })
  },

  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Bricks.Container>
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="xs-12 s-12">
              <h2>Create new item</h2>
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>
          <hr/>
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="xs-12 s-12">
              <UU5.Forms.Form
                progressIndicator={<UU5.Bricks.Loading/>}
                onCancel={
                  (opt) => {
                   this.props.closeModal();
                  }
                }
                onSave={(opt) => {

                  // if (opt.isValid()) {

                    Calls.itemCreate({
                      data: {
                        list: this.props.list.id,
                        text: opt.values.text
                      },
                      done: opt.component.saveDone,
                      fail: opt.component.saveFail
                    });
                  // };
                }}
                onSaveDone={(opt) => {
                  // opt.component.getAlertBus().setAlert({
                  //   content: "Item  was created.",
                  //   colorSchema: "success"
                  // });
                  opt.component.reset();
                  this.props.handleCreate(opt);
                  this.props.closeModal();
                }}
                onSaveFail={(opt) => {
                  opt.component.getAlertBus().setAlert({
                    content: "Creating of item failed.",
                    colorSchema: "danger"
                  });
                }}
              >
                <UU5.Forms.Text name="text"
                                label="Item text"
                                placeholder="type text here ..."
                                required
                                shouldValidateRequired={true}
                                onValidate={this._validateName}/>
                <UU5.Forms.Controls
                  buttonValidate={true}
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

export default NewItem;
