/* eslint-disable n8n-nodes-base/cred-class-field-name-unsuffixed */
/* eslint-disable n8n-nodes-base/cred-class-name-unsuffixed */
import type { ICredentialType, INodeProperties, Icon } from "n8n-workflow";

export class ConfigLoaderAuth implements ICredentialType {
  name = "configLoaderAuth";
  displayName = "Config Loader Auth";
  documentationUrl = "https://docs.n8n.io/nodes/n8n-nodes-base.httpRequest/";
  genericAuth = true;
  icon: Icon = "node:n8n-nodes-base.httpRequest";
  properties: INodeProperties[] = [
    {
      displayName: "Configuration JSON",
      name: "json",
      type: "json",
      required: true,
      description:
        "Paste a JSON object representing your configuration variables or credentials.",
      placeholder: `{
  "serviceA": {
    "host": "api.servicea.com",
    "apiKey": "YOUR_API_KEY"
  },
  "serviceB": [
    {
      "id": "dev",
      "endpoint": "dev.example.com",
      "token": "DEV_TOKEN"
    },
    {
      "id": "prod",
      "endpoint": "api.example.com",
      "token": "PROD_TOKEN"
    }
  ]
}`,
      default: "",
    },
  ];
}