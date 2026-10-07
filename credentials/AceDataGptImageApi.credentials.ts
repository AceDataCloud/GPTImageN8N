import type {
  IAuthenticateGeneric,
  ICredentialTestRequest,
  ICredentialType,
  INodeProperties,
} from "n8n-workflow";

export class AceDataGptImageApi implements ICredentialType {
  name = "aceDataGptImageApi";
  displayName = "GPT Image by AceDataCloud API";
  documentationUrl = "https://github.com/AceDataCloud/GPTImageN8N#credentials";
  icon = "file:../nodes/GptImage/icon.png" as const;
  properties: INodeProperties[] = [
    {
      displayName: "API Token",
      name: "apiToken",
      type: "string",
      typeOptions: { password: true },
      default: "",
      required: true,
      description: "Your AceDataCloud application API token",
    },
  ];
  authenticate: IAuthenticateGeneric = {
    type: "generic",
    properties: {
      headers: { Authorization: "=Bearer {{$credentials.apiToken}}" },
    },
  };
  test: ICredentialTestRequest = {
    request: {
      baseURL: "https://api.acedata.cloud",
      url: "/openai/tasks",
      method: "POST",
      body: { action: "retrieve_batch", ids: [] },
    },
  };
}
