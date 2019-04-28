//@@viewOn:imports
import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5g04-forms";

import Config from "./config/config.js";

import "./form.less";
import LSI from "./form-lsi.js";
//@@viewOff:imports

export const Form = createReactClass({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Form",
    classNames: {
      main: Config.CSS + "form"
    },
    lsi: LSI
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    listData: PropTypes.array
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
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

        <UU5.Forms.Text inputAttrs={{ maxLength: 255 }} name="name" label={this.getLsiComponent("name")} required value={this.props.listData.name}/>
      </UU5.Bricks.Div>
    );
  }
  //@@viewOff:render
});

export default Form;
