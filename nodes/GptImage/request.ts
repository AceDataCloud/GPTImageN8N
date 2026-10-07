import type { IDataObject, IExecuteFunctions } from "n8n-workflow";
import {
  callback,
  choice,
  integer,
  object,
  requiredText,
  imageUrls,
} from "./helpers";
export function buildRequest(
  context: IExecuteFunctions,
  index: number,
): { endpoint: string; body: IDataObject; headers?: IDataObject } {
  const get = (name: string, fallback?: unknown) =>
    context.getNodeParameter(name, index, fallback as IDataObject);
  const operation = String(get("operation"));
  const options = object(get("options", {}));

  const action = choice(operation, "Operation", ["generate", "edit"]);
  const model = choice(get("model"), "Model", [
    "gpt-image-1",
    "gpt-image-1.5",
    "gpt-image-2",
    "gpt-image-2:official",
    "gpt-image-2.5-flare",
    "gpt-image-2.5-flare:official",
    "gpt-image-2.5-sunburst",
    "gpt-image-2.5-sunburst:official",
  ]);
  const prompt = requiredText(get("prompt"), "Prompt");
  if (prompt.length > 32000)
    throw new Error("Prompt must contain at most 32000 characters");
  const size = requiredText(get("size", "1024x1024"), "Size");
  if (size !== "auto") {
    if (!/^\d+x\d+$/.test(size))
      throw new Error("Size must be auto or WIDTHxHEIGHT");
    const [width, height] = size.split("x").map(Number);
    if (model.startsWith("gpt-image-2")) {
      if (
        width % 16 ||
        height % 16 ||
        Math.max(width, height) > 3840 ||
        width * height < 655360 ||
        width * height > 8294400 ||
        Math.max(width, height) / Math.min(width, height) > 3
      )
        throw new Error(
          "Size must use multiples of 16, at most 3840 per side, 655360–8294400 pixels and at most a 3:1 aspect ratio",
        );
    } else if (!["1024x1024", "1536x1024", "1024x1536"].includes(size))
      throw new Error("This model supports 1024x1024, 1536x1024 or 1024x1536");
  }
  const count = integer(get("count", 1), "Number of Images", 1, 10);
  const format = choice(get("responseFormat", "url"), "Response Format", [
    "url",
    "b64_json",
  ]);
  if (format === "b64_json" && count !== 1)
    throw new Error("Base64 JSON supports only one image per request");
  const body: IDataObject = {
    model,
    prompt,
    size,
    n: count,
    quality: choice(get("quality", "auto"), "Quality", [
      "auto",
      "low",
      "medium",
      "high",
    ]),
    response_format: format,
    async: true,
  };
  if (action === "edit") body.image = imageUrls(get("imageUrls"), 1, 16);
  if (options.background)
    body.background = choice(options.background, "Background", [
      "auto",
      "opaque",
      "transparent",
    ]);
  if (options.outputFormat)
    body.output_format = choice(options.outputFormat, "Output Format", [
      "png",
      "jpeg",
      "webp",
    ]);
  if (options.outputCompression !== undefined)
    body.output_compression = integer(
      options.outputCompression,
      "Output Compression",
      0,
      100,
    );
  if (action === "edit" && options.inputFidelity)
    body.input_fidelity = choice(options.inputFidelity, "Input Fidelity", [
      "high",
      "low",
    ]);
  callback(options, body);
  return {
    endpoint:
      action === "edit" ? "/openai/images/edits" : "/openai/images/generations",
    body,
  };
}
