# Tiny Agents Examples

This directory contains example configurations for using tiny-agents with various setups.

## Available Examples

### [OpenAI Endpoint](./openai-endpoint)

Use OpenAI's official API with the full suite of MCP tools.

**Features:**
- OpenAI's GPT-4o model
- Filesystem operations
- Browser automation (Playwright)
- HTTP fetch capabilities
- Secure API key handling

**Best for:** Production applications using OpenAI's hosted models

---

### [Local OpenAI Endpoint](./local-openai-endpoint)

Run tiny-agents with a local OpenAI-compatible server like LM Studio or Ollama.

**Features:**
- Local model inference
- Privacy-focused (no data leaves your machine)
- No API costs
- Offline capability
- All standard MCP tools included

**Best for:** Privacy-sensitive applications, development, and cost-conscious usage

---

### [Remote MCP Tools](./remote-mcp-tools)

Advanced configuration showing how to use remote MCP servers over HTTP/SSE.

**Features:**
- HTTP and SSE protocol support
- Authentication header passing
- Mixing local and remote tools
- Enterprise integration patterns

**Best for:** Team environments, enterprise deployments, and accessing centralized tool services

---

## Quick Start

Each example directory contains:
- `agent.json` - Complete agent configuration
- `README.md` - Detailed usage instructions and customization options

To run an example:

```bash
# Run in CLI mode
npx @huggingface/tiny-agents run ./examples/[example-name]

# Run as OpenAI-compatible server
npx @huggingface/tiny-agents serve ./examples/[example-name]
```

## Creating Your Own Configuration

Use these examples as templates for your own agent configurations:

1. Copy an example directory
2. Modify `agent.json` to suit your needs
3. Optionally add a `PROMPT.md` or `AGENTS.md` file for custom instructions
4. Run with `tiny-agents run ./your-agent-dir`

## MCP Server Types

### Stdio Servers
Run as child processes, best for local tools.

```json
{
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
}
```

### HTTP Servers
Remote servers accessed over HTTP.

```json
{
  "type": "http",
  "url": "https://example.com/mcp",
  "headers": {
    "Authorization": "Bearer TOKEN"
  }
}
```

### SSE Servers
Remote servers with streaming support.

```json
{
  "type": "sse",
  "url": "https://example.com/mcp/sse",
  "headers": {
    "Authorization": "Bearer TOKEN"
  }
}
```

## Popular MCP Servers

Here are some useful MCP servers you can include in your configurations:

### Official MCP Servers

- `@modelcontextprotocol/server-filesystem` - File operations
- `@modelcontextprotocol/server-fetch` - HTTP requests
- `@modelcontextprotocol/server-brave-search` - Web search
- `@modelcontextprotocol/server-sqlite` - SQLite database access
- `@modelcontextprotocol/server-github` - GitHub API integration
- `@modelcontextprotocol/server-gdrive` - Google Drive access
- `@modelcontextprotocol/server-memory` - Persistent memory for agents

### Community MCP Servers

- `@playwright/mcp` - Browser automation
- Various community-contributed servers available on npm

## Environment Variables

All examples support loading configuration from environment variables:

- `HF_TOKEN` - Hugging Face API token
- `API_KEY` - Generic API key
- `OPENAI_API_KEY` - OpenAI API key
- `BRAVE_API_KEY` - Brave Search API key

You can also define custom inputs in your `agent.json` to prompt for values or load from environment variables.

## Need Help?

- Check the individual example READMEs for detailed instructions
- See the main [tiny-agents README](../README.md) for general usage
- Visit the [MCP documentation](https://modelcontextprotocol.io/) for more on MCP servers
