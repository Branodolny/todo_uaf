//@@viewOn:imports
import React from "react";
import createReactClass from "create-react-class";
import PropTypes from "prop-types";
import * as UU5 from "uu5g04";
import "uu5g04-bricks";
import "uu5g04-forms";
import Form from "../list/form";

import Config from "./config/config.js";

import "./tablerow.less";
//@@viewOff:imports

export const Tablerow = createReactClass({
  //@@viewOn:mixins
  mixins: [UU5.Common.BaseMixin],
  //@@viewOff:mixins

  //@@viewOn:statics
  statics: {
    tagName: Config.TAG + "Tablerow",
    classNames: {
      main: Config.CSS + "tablerow"
    },
  },
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    listData: PropTypes.object
  },
  //@@viewOff:propTypes

  //@@viewOn:getDefaultProps
  //@@viewOff:getDefaultProps

  //@@viewOn:reactLifeCycle
  componentWillMount() {
    console.log(this.props)
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

        <UU5.Bricks.Table.Tr key={this.props.listData.id}>
          <UU5.Bricks.Table.Td content={this.props.listData.name}/>
          <UU5.Bricks.Table.Td>
            <UU5.Bricks.Button onClick={this._handleUpdate}><UU5.Bricks.Icon
              icon="mdi-pencil"/></UU5.Bricks.Button>
          </UU5.Bricks.Table.Td>
          <UU5.Bricks.Table.Td>
            <UU5.Bricks.Button><UU5.Bricks.Icon icon="uu5-cross"/></UU5.Bricks.Button>
          </UU5.Bricks.Table.Td>
        </UU5.Bricks.Table.Tr>
    );
  }
  //@@viewOff:render
});

export default Tablerow;
