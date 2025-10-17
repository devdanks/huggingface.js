# OpenAI Custom Endpoint Example

This example demonstrates how to use the tiny-agents package with OpenAI's API through a custom endpoint.

## Configuration

The `agent.json` file configures:
- **Model**: `gpt-4o` (OpenAI's latest model)
- **Endpoint**: `https://api.openai.com/v1` (OpenAI's API endpoint)
- **API Key**: Loaded via input prompt or `OPENAI_API_KEY` environment variable
- **MCP Tools**: Multiple powerful MCP servers for enhanced capabilities

## MCP Servers Included

1. **Filesystem Server** (`@modelcontextprotocol/server-filesystem`)
   - Read and write files
   - Navigate directory structures
   - File management operations

2. **Playwright Server** (`@playwright/mcp`)
   - Web browser automation
   - Web scraping
   - UI testing capabilities

3. **Fetch Server** (`@modelcontextprotocol/server-fetch`)
   - HTTP requests
   - API interactions
   - Web content fetching

## Usage

### Run in CLI mode

```bash
# From the repository root
npx @huggingface/tiny-agents run ./packages/tiny-agents/examples/openai-endpoint

# Or if installed globally
tiny-agents run ./packages/tiny-agents/examples/openai-endpoint
```

You'll be prompted to enter your OpenAI API key if not already set in the environment.

### Run as OpenAI-compatible Server

```bash
npx @huggingface/tiny-agents serve ./packages/tiny-agents/examples/openai-endpoint
```

This starts an HTTP server on `http://localhost:9999` that's compatible with OpenAI's API format.

You can then use it with any OpenAI-compatible client:

```typescript
import { chatCompletionStream } from "@huggingface/inference";

for await (const chunk of chatCompletionStream({
  endpointUrl: "http://localhost:9999/v1/chat/completions",
  model: "", // model is ignored, uses the one configured in agent.json
  messages: [{ role: "user", content: "What files are in this directory?" }],
})) {
  console.log(chunk.choices[0]?.delta.content);
}
```

## Environment Variables

You can also set your API key via environment variable:

```bash
export OPENAI_API_KEY="sk-..."
npx @huggingface/tiny-agents run ./packages/tiny-agents/examples/openai-endpoint
```

## Customization

You can customize this configuration by:

1. **Changing the model**: Replace `"gpt-4o"` with any OpenAI model (e.g., `"gpt-4"`, `"gpt-3.5-turbo"`)
2. **Adding more MCP servers**: Add additional server configurations to the `servers` array
3. **Using different endpoints**: Change `endpointUrl` to use OpenAI-compatible services like:
   - Azure OpenAI: `https://YOUR-RESOURCE.openai.azure.com/openai/deployments/YOUR-DEPLOYMENT`
   - Local models with OpenAI-compatible servers (e.g., LM Studio, Ollama with OpenAI compatibility)

## Custom Prompt

You can add a `PROMPT.md` or `AGENTS.md` file in this directory to override the default agent prompt with custom instructions.
