import Config from "../../config/config.js";

export default {
  ...Config,

  TAG: Config.TAG + "list.",
  CSS: Config.CSS + "list-"
};
