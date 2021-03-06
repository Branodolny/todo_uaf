/**
 * Server calls of application client.
 */
import {Uri} from "uu_appg01_core";
import * as UU5 from "uu5g04";
import {Client} from "uu_appg01";
import Plus4U5 from "uu_plus4u5g01";

let Calls = {
  /** URL containing app base, e.g. "https://uuos9.plus4u.net/vnd-app/tid-awid/". */
  APP_BASE_URI: location.protocol + "//" + location.host + UU5.Environment.getAppBasePath(),

  // call(method, url, dtoIn, clientOptions) {
  //   return Plus4U5.Common.Calls.call(method, url, dtoIn, clientOptions);
  // },
  call(method, url, dtoIn, clientOptions) {
    Client[method](url, dtoIn.data, clientOptions).then(
      response => typeof dtoIn.done === "function" && dtoIn.done(response || {}),
      response => typeof dtoIn.fail === "function" && dtoIn.fail(response || {})
    );
  },
  // loadDemoContent(dtoIn) {
  //   let commandUri = Calls.getCommandUri("loadDemoContent");
  //   Calls.call("get", commandUri, dtoIn);
  // },
  getList(dtoIn) {
    let commandUri = Calls.getCommandUri("list/get");
    Calls.call("get", commandUri, dtoIn);
  },
  listList(dtoIn) {
    let commandUri = Calls.getCommandUri("list/list");
    Calls.call("get", commandUri, dtoIn);
  },
  listCreate(dtoIn) {
    let commandUri = Calls.getCommandUri("list/create");
    Calls.call("post", commandUri, dtoIn);
  },
  editList(dtoIn) {
    let commandUri = Calls.getCommandUri("list/update");
    Calls.call("post", commandUri, dtoIn);
  },
  deleteList(dtoIn) {
    let commandUri = Calls.getCommandUri("list/delete");
    Calls.call("post", commandUri, dtoIn);
  },
  itemList(dtoIn) {
    let commandUri = Calls.getCommandUri("item/list");
    Calls.call("get", commandUri, dtoIn);
  },
  itemGet(dtoIn) {
    let commandUri = Calls.getCommandUri("item/get");
    Calls.call("get", commandUri, dtoIn);
  },
  itemCreate(dtoIn) {
    let commandUri = Calls.getCommandUri("item/create");
    Calls.call("post", commandUri, dtoIn);
  },
  itemUpdate(dtoIn) {
    let commandUri = Calls.getCommandUri("item/update");
    Calls.call("post", commandUri, dtoIn);
  },
  itemDelete(dtoIn) {
    let commandUri = Calls.getCommandUri("item/delete");
    Calls.call("post", commandUri, dtoIn);
  },
  itemComplete(dtoIn) {
    let commandUri = Calls.getCommandUri("item/complete");
    Calls.call("post", commandUri, dtoIn);
  },
  /*
  For calling command on specific server, in case of developing client site with already deployed
  server in uuCloud etc. You can specify url of this application (or part of url) in development
  configuration in *-client/env/development.json, for example:
   {
     ...
     "uu5Environment": {
       "gatewayUri": "https://uuos9.plus4u.net",
       "tid": "84723877990072695",
       "awid": "b9164294f78e4cd51590010882445ae5",
       "vendor": "uu",
       "app": "demoappg01",
       "subApp": "main"
     }
   }
   */
  getCommandUri(aUseCase) {
    // useCase <=> e.g. "getSomething" or "sys/getSomething"
    // add useCase to the application base URI
    let targetUriStr = Calls.APP_BASE_URI + aUseCase.replace(/^\/+/, "");

    // override tid / awid if it's present in environment (use also its gateway in such case)
    if (process.env.NODE_ENV !== "production") {
      let env = UU5.Environment;
      if (env.tid || env.awid || env.vendor || env.app) {
        let uriBuilder = Uri.UriBuilder.parse(targetUriStr);
        if (env.tid || env.awid) {
          if (env.gatewayUri) uriBuilder.setGateway(env.gatewayUri);
          if (env.tid) uriBuilder.setTid(env.tid);
          if (env.awid) uriBuilder.setAwid(env.awid);
        }
        if (env.vendor || env.app) {
          if (env.vendor) uriBuilder.setVendor(env.vendor);
          if (env.app) uriBuilder.setApp(env.app);
          if (env.subApp) uriBuilder.setSubApp(env.subApp);
        }
        targetUriStr = uriBuilder.toUri().toString();
      }
    }

    return targetUriStr;
  }
};

export default Calls;
