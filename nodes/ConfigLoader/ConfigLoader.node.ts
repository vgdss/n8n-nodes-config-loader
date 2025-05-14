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
    const items = this.getInputData();

    for (let i = 0; i < items.length; i++) {
      // Load the JSON credential
      const auth = await this.getCredentials("configLoaderAuth", i);
      const allVars = jsonParse<Record<string, any>>(
        (auth.json as string) || "{}",
        { errorMessage: "Invalid Config Loader JSON" }
      );

      // Inject variables at the root level of the item JSON
      items[i].json = {
        ...items[i].json,
        ...allVars,
      };
    }

    return [items];
  }
}
