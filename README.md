![GPT Image for n8n](https://raw.githubusercontent.com/AceDataCloud/GPTImageN8N/main/assets/banner.png)

# GPT Image by AceDataCloud — n8n community node

Generate and edit GPT Image visuals with reference images, size and quality controls, and asynchronous task tracking in n8n via AceDataCloud.

[![npm](https://img.shields.io/npm/v/@acedatacloud/n8n-nodes-gpt-image)](https://www.npmjs.com/package/@acedatacloud/n8n-nodes-gpt-image) [![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Package:** `@acedatacloud/n8n-nodes-gpt-image` · **License:** MIT · **Node:** GPT Image by AceDataCloud

Maintained by **Ace Data Cloud**, connecting to **AceDataCloud's API**. This is not an official package from the model developer. A direct provider subscription does not supply an AceDataCloud API credential.

## What you can build

- Create marketing artwork and product imagery with GPT Image models.
- Edit up to 16 reference images with explicit size and quality settings.
- Create PNG, JPEG or WebP assets for downstream content pipelines.

## Installation

In self-hosted n8n, open **Settings → Community nodes → Install**, enter `@acedatacloud/n8n-nodes-gpt-image`, review the package and install. To reproduce this release exactly, use `@acedatacloud/n8n-nodes-gpt-image@0.1.0`.

See [n8n's installation guide](https://docs.n8n.io/integrations/community-nodes/installation-and-management/). n8n Cloud requires verified community nodes. npm publication and verification are separate; check the n8n node panel for current Cloud availability.

## Operations

| Resource | Operation | Result |
| --- | --- | --- |
| Image | Generate | Create images from text with size, quality and output controls |
| Image | Edit | Edit one or more public image URLs, up to 16 references |
| Task | Get | Retrieve one task's state, result, error and reported cost |
| Task | Get Many | Retrieve up to 50 explicit task IDs as separate n8n items |

## Credentials

1. Open [AceDataCloud applications](https://platform.acedata.cloud/console/applications), sign in and create or select an application.
2. Copy the application's API token. One AceDataCloud application token can access the platform services available to your account.
3. In n8n, create a **GPT Image by AceDataCloud API** credential, paste the API Token, save it and confirm the credential test passes.
4. Select that credential on each GPT Image node in your workflow.

The token is masked and stored in n8n's credential store. The node sends Bearer authentication only to `https://api.acedata.cloud`. Its credential test queries an empty task batch and does not generate media. Do not use a platform management token.

## Quick start and examples

Import [Generate and wait](examples/generate-and-wait.json), assign credentials to **Create** and **Get Task**, and edit the generation parameters. One manual execution submits once, then queries every 15 seconds. The loop has a 30-minute deadline and explicit failure handling. A deadline stops waiting; it does not cancel a submitted service task.

Import [AI Agent task tool](examples/ai-agent-task-tool.json) to use the node as a read-only tool. Replace the sample task ID, configure the chat model and select the service credential. The agent queries a task once; it does not create media.

Additional examples are in [examples/](examples/). They contain no credentials and no pinned or fabricated output.

## Example output

Generated through this node with `gpt-image-2` during live validation:

![Generated example](https://cdn.acedata2.cloud/gpt-image/7eb90fb5966b26f60751907778ec7ecbfe7358193edebed3acc9c1fd40cdd1f7.png)

## Parameters and limits

- Models: GPT Image 1/1.5, GPT Image 2, GPT Image 2.5 Flare and GPT Image 2.5 Sunburst, with the exposed `:official` variants.
- GPT Image 2 size: `auto` or `WIDTHxHEIGHT`, multiples of 16; at most 3840 per side, 655360–8294400 pixels, aspect ratio at most 3:1. Older models use the three common 1024/1536 presets.
- Image count: 1–10; Base64 JSON output requires exactly one image.
- Editing in this version accepts public HTTP(S) URLs. Local binary uploads and alpha-mask uploads are not included.
- `Input Fidelity` applies to editing. Model support for individual output options may differ; check current API documentation.

## Output and task states

With **Simplify** enabled:

- Generation returns `taskId`, `status: "submitted"`, `finished: false`, `successful: null` and `traceId`.
- Task queries return `taskId`, `status` (`processing`, `succeeded` or `failed`), `finished`, `successful`, `data`, `error`, `traceId` and `cost`.
- Final media URLs are inside `data`. Fish TTS responses with a top-level `audio_url` are exposed as `data.audio_url`.
- A submission acknowledgment is not a finished result. Continue only when `finished` is true and `successful` is true.

Disable **Simplify** to receive the API response unchanged. Batch queries emit one item per task, preserving the relationship to the originating n8n input item.

## Billing, retries and errors

Generation uses your AceDataCloud balance. Check [current API documentation and pricing](https://platform.acedata.cloud/documents/openai-images-generations) before execution. `cost.amount` is in Credits, not USD; the conversion depends on your current package rate.

Each incoming n8n item sends one generation request. Creation is not retried automatically and the node does not substitute a different model. Re-running Create, enabling retry-on-fail, or restarting the workflow can create another paid task. After a timeout, retrieve the existing task where possible.

HTTP/authentication/parameter errors fail the node with the API's error context. Completed failed tasks are represented as `finished: true`, `successful: false` and an `error`, so downstream nodes can handle them. n8n's continue-on-fail option emits an error item and proceeds with later input items.

## Data handling and compatibility

Only configured text, model choices, media references and query parameters are sent to AceDataCloud. Input URLs must be accessible to the API. The node has no filesystem access, environment-variable access or telemetry, and no runtime dependencies beyond n8n's workflow API.

Built with the official `@n8n/node-cli`, strict community-package rules and Node.js 24. CI loads the package in n8n **2.42.3**. Older n8n versions are not part of this release's compatibility test matrix. Icons are bundled from the existing Studio/service catalog; see [asset provenance](assets/README.md).

## Development

```sh
pnpm install --frozen-lockfile
pnpm run build
pnpm run lint
pnpm test
```

Programmatic nodes validate conditional media payloads, normalize asynchronous task responses and preserve input-item links. All service requests use n8n's authenticated HTTP helper. Unit tests mock the HTTP boundary; they do not incur generation charges.

Releases are built from merged source through GitHub Actions with `npm publish --provenance`. Publication runs build, lint and tests. Keep published versions immutable and update [CHANGELOG.md](CHANGELOG.md) for new releases.

## Resources and support

- [API documentation](https://platform.acedata.cloud/documents/openai-images-generations)
- [AceDataCloud Studio](https://studio.acedata.cloud)
- [Report an issue](https://github.com/AceDataCloud/GPTImageN8N/issues)
- [n8n community-node documentation](https://docs.n8n.io/integrations/community-nodes/)

Include the package version, n8n version, operation and a redacted error when reporting issues. Never include API tokens or private media.
