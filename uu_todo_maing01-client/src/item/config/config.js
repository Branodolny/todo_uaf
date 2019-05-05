import Config from "../../config/config.js";

export default {
  ...Config,

  TAG: Config.TAG + "Item.",
  CSS: Config.CSS + "item-"
};
