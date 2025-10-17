# Remote MCP Tools Example

This example demonstrates how to use tiny-agents with remote MCP servers over HTTP/SSE protocols, in addition to local stdio-based tools.

## Configuration

The `agent.json` file shows how to:
- Use **HTTP-based MCP servers** for remote tool access
- Use **SSE-based MCP servers** for streaming tool interactions
- Combine remote and local MCP servers
- Pass authentication headers to remote servers

## Server Types

### HTTP MCP Server

```json
{
  "type": "http",
  "url": "https://example.com/mcp",
  "headers": {
    "Authorization": "Bearer YOUR_TOKEN"
  }
}
```

Good for: Request-response style tool interactions

### SSE MCP Server

```json
{
  "type": "sse",
  "url": "https://example.com/mcp/sse",
  "headers": {
    "Authorization": "Bearer YOUR_TOKEN"
  }
}
```

Good for: Streaming responses and long-running operations

### Stdio MCP Server

```json
{
  "type": "stdio",
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-fetch"]
}
```

Good for: Local tools that run as child processes

## Use Cases

### 1. Accessing Private APIs

Remote MCP servers can expose authenticated APIs as tools:

```json
{
  "type": "http",
  "url": "https://your-company.com/internal-tools-mcp",
  "headers": {
    "Authorization": "Bearer ${input:company-api-key}",
    "X-Custom-Header": "value"
  }
}
```

### 2. Shared Team Tools

Deploy MCP servers centrally for team-wide tool sharing:

- Database access tools
- Internal service integrations
- Compliance-checked operations

### 3. Managed MCP Services

Use third-party MCP server providers:

```json
{
  "type": "sse",
  "url": "https://mcp-provider.com/services/advanced-tools",
  "headers": {
    "X-API-Key": "${input:service-api-key}"
  }
}
```

## Security Considerations

1. **Use HTTPS**: Always use secure connections for remote servers
2. **Token Management**: Store sensitive tokens in environment variables
3. **Access Control**: Implement proper authentication on remote MCP servers
4. **Input Validation**: Sanitize inputs on the server side
5. **Rate Limiting**: Implement rate limits to prevent abuse

## Creating Your Own Remote MCP Server

You can create an HTTP/SSE MCP server using the `@modelcontextprotocol/sdk`:

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { createServer } from 'http';

const server = new Server({
  name: 'my-remote-tools',
  version: '1.0.0'
}, {
  capabilities: {
    tools: {}
  }
});

// Add your tools
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'my_tool',
        description: 'Does something useful',
        inputSchema: {
          type: 'object',
          properties: {
            input: { type: 'string' }
          }
        }
      }
    ]
  };
});

server.setRequestHandler('tools/call', async (request) => {
  // Implement your tool logic
  return {
    content: [
      {
        type: 'text',
        text: 'Tool result'
      }
    ]
  };
});

// Start HTTP server
const httpServer = createServer((req, res) => {
  const transport = new StreamableHTTPServerTransport({
    endpoint: '/mcp',
    req,
    res
  });
  server.connect(transport);
});

httpServer.listen(3000);
```

## Usage

Update the URLs in `agent.json` to point to your actual remote MCP servers, then:

```bash
npx @huggingface/tiny-agents run ./packages/tiny-agents/examples/remote-mcp-tools
```

## Advantages of Remote MCP Tools

1. **Centralized Management**: Update tools without client updates
2. **Resource Intensive Operations**: Offload heavy computation to servers
3. **Shared State**: Tools can maintain persistent state
4. **Enterprise Integration**: Connect to internal systems securely
5. **Scalability**: Scale tool execution independently

## Example Remote Tools

- **Code execution environments** (sandboxed)
- **Database query tools** (with access controls)
- **Document processing** (OCR, parsing)
- **Video/Audio processing** (transcription, analysis)
- **ML model inference** (specialized models)
