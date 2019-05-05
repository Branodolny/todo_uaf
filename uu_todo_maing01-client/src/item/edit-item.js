//@@viewOn:imports
import React from "react";
import createReactClass from "create-react-class";
import Proptypes from "prop-types";
import * as UU5 from "uu5g04";
import "uu5g04-forms";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Calls from "calls";


import "./edit-item.less";
import ItemDetail from "./item-detail";
//@@viewOff:imports

export const EditItem = createReactClass({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin, UU5.Common.CallsMixin, UU5.Forms.FormMixin, UU5.Common.ContentMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "EditItem",
    classNames: {
      main: Config.CSS + "editItem"
    }, calls: {
      editItem: "editItem",
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    item: Proptypes.object,
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
  _validateLength(opt){
    if(opt.value.length > 1000){
      return {
        feedback: "error",
        message: "Text is too long!"
      };
    }
  },

  //@@viewOff:private

  //@@viewOn:render
  render() {
    return (
      <UU5.Bricks.Div {...this.getMainPropsToPass()}>
        <UU5.Bricks.Container>
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="xs-12 s-8">
              <h2>Edit item {this.props.item.text}?</h2>
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>
          <hr/>
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="xs-12 s-8">
              <UU5.Forms.Form
                progressIndicator={<UU5.Bricks.Loading/>}
                onCancel={
                  (opt) => {
                    UU5.Environment.setRoute({component: <ItemDetail item={this.props.item} list={this.props.list}/>, url:{useCase:"detail-item"}})
                  }
                }
                onSave={(opt) => {

                  Calls.itemUpdate({
                    data: {
                      item:this.props.item.id,
                      list: this.props.list.id,
                      text: opt.values.text
                    },
                    done: opt.component.saveDone,
                    fail: opt.component.saveFail
                  });
                }}
                onSaveDone={(opt) => {

                  console.log(opt);
                  opt.component.getAlertBus().setAlert({
                    content: "Item  was renamed ",
                    colorSchema: "success"
                  });
                  opt.component.reset();
                  UU5.Environment.setRoute({component: <ItemDetail item={opt.dtoOut.data.item} list={this.props.list}/>, url:{useCase:"detail-item"}});
                }}
                onSaveFail={(opt) => {
                  opt.component.getAlertBus().setAlert({
                    content: opt.dtoOut.message,
                    colorSchema: "danger"
                  });
                }}
              >

                <UU5.Forms.TextArea name="text"
                                label="New item text"
                                required
                                value={this.props.item.text}
                                shouldValidateRequired={true}
                                onValidate={this._validateLength}/>
                <UU5.Forms.Controls/>
              </UU5.Forms.Form>
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>
        </UU5.Bricks.Container>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default EditItem;
