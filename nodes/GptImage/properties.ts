import type { INodeProperties } from 'n8n-workflow';
export const properties: INodeProperties[] = [
  {
    "displayName": "Resource",
    "name": "resource",
    "type": "options",
    "default": "image",
    "options": [
      {
        "name": "Image",
        "value": "image"
      },
      {
        "name": "Task",
        "value": "task"
      }
    ],
    "noDataExpression": true
  },
  {
    "displayName": "Operation",
    "name": "operation",
    "type": "options",
    "default": "generate",
    "displayOptions": {
      "show": {
        "resource": [
          "image"
        ]
      }
    },
    "options": [
      {
        "name": "Edit",
        "value": "edit",
        "description": "Edit or combine reference images",
        "action": "Edit an image"
      },
      {
        "name": "Generate",
        "value": "generate",
        "description": "Generate images from a prompt",
        "action": "Generate an image"
      }
    ],
    "noDataExpression": true
  },
  {
    "displayName": "Operation",
    "name": "operation",
    "type": "options",
    "default": "get",
    "displayOptions": {
      "show": {
        "resource": [
          "task"
        ]
      }
    },
    "options": [
      {
        "name": "Get",
        "value": "get",
        "description": "Retrieve one existing task",
        "action": "Get a task"
      },
      {
        "name": "Get Many",
        "value": "getMany",
        "description": "Retrieve up to 50 specific task IDs",
        "action": "Get many tasks"
      }
    ],
    "noDataExpression": true
  },
  {
    "displayName": "Task ID",
    "name": "taskId",
    "type": "string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "task"
        ],
        "operation": [
          "get"
        ]
      }
    },
    "required": true,
    "description": "The task ID returned by a generation operation"
  },
  {
    "displayName": "Task IDs",
    "name": "taskIds",
    "type": "string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "task"
        ],
        "operation": [
          "getMany"
        ]
      }
    },
    "required": true,
    "description": "Up to 50 comma-separated task IDs"
  },
  {
    "displayName": "Prompt",
    "name": "prompt",
    "type": "string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "image"
        ]
      }
    },
    "required": true,
    "typeOptions": {
      "rows": 4
    },
    "description": "Describe the result you want to create"
  },
  {
    "displayName": "Model",
    "name": "model",
    "type": "options",
    "default": "gpt-image-2",
    "displayOptions": {
      "show": {
        "resource": [
          "image"
        ]
      }
    },
    "options": [
      {
        "name": "gpt-image-1",
        "value": "gpt-image-1"
      },
      {
        "name": "gpt-image-1.5",
        "value": "gpt-image-1.5"
      },
      {
        "name": "gpt-image-2",
        "value": "gpt-image-2"
      },
      {
        "name": "gpt-image-2:official",
        "value": "gpt-image-2:official"
      },
      {
        "name": "gpt-image-2.5-flare",
        "value": "gpt-image-2.5-flare"
      },
      {
        "name": "gpt-image-2.5-flare:official",
        "value": "gpt-image-2.5-flare:official"
      },
      {
        "name": "gpt-image-2.5-sunburst",
        "value": "gpt-image-2.5-sunburst"
      },
      {
        "name": "gpt-image-2.5-sunburst:official",
        "value": "gpt-image-2.5-sunburst:official"
      }
    ]
  },
  {
    "displayName": "Image URLs",
    "name": "imageUrls",
    "type": "string",
    "default": "",
    "displayOptions": {
      "show": {
        "resource": [
          "image"
        ],
        "operation": [
          "edit"
        ]
      }
    },
    "required": true,
    "typeOptions": {
      "rows": 3
    },
    "description": "One publicly accessible HTTP or HTTPS image URL per line, up to 16"
  },
  {
    "displayName": "Size",
    "name": "size",
    "type": "string",
    "default": "1024x1024",
    "displayOptions": {
      "show": {
        "resource": [
          "image"
        ]
      }
    },
    "description": "Auto or WIDTHxHEIGHT, for example 1024x1024 or 1536x1024"
  },
  {
    "displayName": "Quality",
    "name": "quality",
    "type": "options",
    "default": "auto",
    "displayOptions": {
      "show": {
        "resource": [
          "image"
        ]
      }
    },
    "options": [
      {
        "name": "Auto",
        "value": "auto"
      },
      {
        "name": "High",
        "value": "high"
      },
      {
        "name": "Low",
        "value": "low"
      },
      {
        "name": "Medium",
        "value": "medium"
      }
    ]
  },
  {
    "displayName": "Number of Images",
    "name": "count",
    "type": "number",
    "default": 1,
    "displayOptions": {
      "show": {
        "resource": [
          "image"
        ]
      }
    },
    "typeOptions": {
      "minValue": 1,
      "maxValue": 10,
      "numberPrecision": 0
    }
  },
  {
    "displayName": "Response Format",
    "name": "responseFormat",
    "type": "options",
    "default": "url",
    "displayOptions": {
      "show": {
        "resource": [
          "image"
        ]
      }
    },
    "options": [
      {
        "name": "Base64 JSON",
        "value": "b64_json"
      },
      {
        "name": "Image URL",
        "value": "url"
      }
    ]
  },
  {
    "displayName": "Options",
    "name": "options",
    "type": "collection",
    "default": {},
    "displayOptions": {
      "show": {
        "resource": [
          "image"
        ]
      }
    },
    "placeholder": "Add Option",
    "options": [
      {
        "displayName": "Background",
        "name": "background",
        "type": "options",
        "default": "auto",
        "options": [
          {
            "name": "Auto",
            "value": "auto"
          },
          {
            "name": "Opaque",
            "value": "opaque"
          },
          {
            "name": "Transparent",
            "value": "transparent"
          }
        ]
      },
      {
        "displayName": "Callback URL",
        "name": "callbackUrl",
        "type": "string",
        "default": "",
        "description": "Optional HTTPS webhook to receive the final result"
      },
      {
        "displayName": "Input Fidelity",
        "name": "inputFidelity",
        "type": "options",
        "default": "high",
        "options": [
          {
            "name": "High",
            "value": "high"
          },
          {
            "name": "Low",
            "value": "low"
          }
        ],
        "description": "Reference preservation for image editing"
      },
      {
        "displayName": "Output Compression",
        "name": "outputCompression",
        "type": "number",
        "default": 100,
        "typeOptions": {
          "minValue": 0,
          "maxValue": 100,
          "numberPrecision": 0
        }
      },
      {
        "displayName": "Output Format",
        "name": "outputFormat",
        "type": "options",
        "default": "png",
        "options": [
          {
            "name": "jpeg",
            "value": "jpeg"
          },
          {
            "name": "png",
            "value": "png"
          },
          {
            "name": "webp",
            "value": "webp"
          }
        ]
      }
    ]
  },
  {
    "displayName": "Simplify",
    "name": "simplify",
    "type": "boolean",
    "default": true,
    "description": "Whether to return essential fields instead of the raw API response"
  }
];
