//@@viewOn:imports
import React from "react";
import createReactClass from "create-react-class";
import Proptypes from "prop-types";
import * as UU5 from "uu5g04";
import "uu5g04-forms";
import "uu5g04-bricks";
import Config from "./config/config.js";
import Calls from "calls";


import "./new-list.less";
import ListDetail from "./list-detail";
//@@viewOff:imports

export const NewList = createReactClass({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin, UU5.Common.RouteMixin, UU5.Common.CallsMixin, UU5.Forms.FormMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "NewList",
    classNames: {
      main: Config.CSS + "newList"
    }, calls: {
      listCreate: "listCreate",
    }
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    lists: Proptypes.array,
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  getInitialState() {
    return {
      lists: this.props.lists || 0
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
    console.log(opt);
    console.log(this.state.lists);
    this.state.lists.map((list) => {
      console.log(list);
      console.log(list.name);
      console.log(opt.value);
      if (list.name == opt.value) {
        return {
          feedback: "error",
          message: "List with name " + list.name + " exist!"
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
            <UU5.Bricks.Column colWidth="xs-12 s-8">
              <h2>Create new list</h2>
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>
          <hr/>
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="xs-12 s-8">
              <UU5.Forms.Form
                progressIndicator={<UU5.Bricks.Loading/>}
                onCancel={
                  (opt) => {
                    UU5.Environment.setRoute('list');
                  }
                }
                onSave={(opt) => {
                  console.log(opt);
                  this.setState({
                      listname: opt.values.name
                    }
                  );
                  // if (opt.isValid()) {

                    Calls.listCreate({
                      data: {
                        name: opt.values.name
                      },
                      done: opt.component.saveDone,
                      fail: opt.component.saveFail
                    });
                  // };
                }}
                onSaveDone={(opt) => {
                  opt.component.getAlertBus().setAlert({
                    content: "List " + this.state.listname + " was created.",
                    colorSchema: "success"
                  });
                  opt.component.reset();
                  UU5.Environment.setRoute("list");
                }}
                onSaveFail={(opt) => {
                  opt.component.getAlertBus().setAlert({
                    content: "Creating of list failed.",
                    colorSchema: "danger"
                  });
                }}
              >
                <UU5.Forms.Text name="name"
                                label="List name"
                                placeholder="type name here ..."
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
        {console.log('data')}
        {console.log(this.props)}
        {console.log(this.state)}
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default NewList;
