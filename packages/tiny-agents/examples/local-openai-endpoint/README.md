# Local OpenAI-Compatible Endpoint Example

This example shows how to use tiny-agents with a local OpenAI-compatible server like LM Studio, Ollama, or any other local inference server.

## Configuration

The `agent.json` file configures:
- **Model**: `qwen2.5:32b` (configurable based on your local setup)
- **Endpoint**: `http://localhost:1234/v1` (default for LM Studio, adjust as needed)
- **No API Key Required**: Local endpoints typically don't need authentication
- **Enhanced MCP Tools**: Includes filesystem, browser automation, fetch, and search capabilities

## MCP Servers Included

1. **Filesystem Server** - File and directory operations
2. **Playwright Server** - Browser automation and web scraping
3. **Fetch Server** - HTTP requests and API calls
4. **Brave Search** - Web search capabilities (requires API key)

## Compatible Local Servers

### LM Studio
- Default endpoint: `http://localhost:1234/v1`
- Download from: https://lmstudio.ai/
- Load any GGUF model and start the local server

### Ollama (with OpenAI compatibility)
- Run with: `ollama serve`
- Endpoint: `http://localhost:11434/v1`
- Update `endpointUrl` in `agent.json` accordingly

### LocalAI
- Endpoint: `http://localhost:8080/v1`
- GitHub: https://github.com/mudler/LocalAI

### vLLM
- Endpoint: Configurable (default `http://localhost:8000/v1`)
- GitHub: https://github.com/vllm-project/vllm

## Usage

### Prerequisites

1. Start your local OpenAI-compatible server (e.g., LM Studio)
2. Ensure it's running on the endpoint specified in `agent.json`
3. Update the `model` field to match your loaded model name

### Run in CLI mode

```bash
npx @huggingface/tiny-agents run ./packages/tiny-agents/examples/local-openai-endpoint
```

### Run as Server

```bash
npx @huggingface/tiny-agents serve ./packages/tiny-agents/examples/local-openai-endpoint
```

This creates an OpenAI-compatible server that wraps your local model with MCP tools!

## Customization

### Change the endpoint URL

Edit `agent.json` and update the `endpointUrl`:

```json
{
  "endpointUrl": "http://localhost:11434/v1"
}
```

### Change the model

Update the `model` field to match your local model:

```json
{
  "model": "llama3.1:70b"
}
```

### Add more tools

Add additional MCP servers to the `servers` array. Popular options:

- **SQLite**: `@modelcontextprotocol/server-sqlite`
- **GitHub**: `@modelcontextprotocol/server-github`
- **Google Drive**: `@modelcontextprotocol/server-gdrive`
- **Memory**: `@modelcontextprotocol/server-memory`

Example:

```json
{
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-sqlite", "/path/to/database.db"]
}
```

## Performance Tips

1. **Choose appropriate models**: Smaller models (7B-13B) are faster but less capable
2. **Use quantized models**: GGUF Q4_K_M or Q5_K_M offer good balance of quality and speed
3. **Adjust context length**: Longer contexts use more memory
4. **GPU acceleration**: Enable CUDA/Metal for better performance

## Benefits of Local Setup

- **Privacy**: All data stays on your machine
- **No API costs**: Free unlimited usage
- **Offline capable**: Works without internet
- **Customizable**: Full control over model and parameters
- **Low latency**: No network roundtrip to external APIs
