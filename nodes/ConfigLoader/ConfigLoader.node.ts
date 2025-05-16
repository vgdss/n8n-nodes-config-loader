/* eslint-disable n8n-nodes-base/node-class-description-credentials-name-unsuffixed */

import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
  jsonParse,
} from "n8n-workflow";

export class ConfigLoader implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Config Loader",
    name: "configLoader",
    icon: "file:configloader.svg",
    group: ["transform"],
    version: 1,
    description:
      "Loads and injects variables defined in the Config Loader Auth JSON credential",
    defaults: {
      name: "Config Loader",
    },
    // @ts-ignore
    inputs: ["main"],
    // @ts-ignore
    outputs: ["main"],
    credentials: [
      {
        name: "configLoaderAuth",
        required: true,
      },
    ],
    properties: [],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const auth = await this.getCredentials("configLoaderAuth", 0);
    const allVars = jsonParse<Record<string, any>>(
      (auth.json as string) || "{}",
      { errorMessage: "Invalid Config Loader JSON" }
    );

    return [ this.helpers.returnJsonArray(allVars) ];
  }
}
