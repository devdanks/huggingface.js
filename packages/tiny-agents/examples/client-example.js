#!/usr/bin/env node

/**
 * Example script showing how to use a tiny-agent server
 *
 * This demonstrates connecting to a tiny-agents server running in "serve" mode
 * and making requests to it using the OpenAI-compatible API.
 *
 * Prerequisites:
 * 1. Start a tiny-agent server in another terminal:
 *    npx @huggingface/tiny-agents serve ./examples/local-openai-endpoint
 *
 * 2. Run this script:
 *    node examples/client-example.js
 */

import { chatCompletionStream } from "@huggingface/inference";

const ENDPOINT_URL = "http://localhost:9999/v1/chat/completions";

async function main() {
	console.log("Connecting to tiny-agents server at", ENDPOINT_URL);
	console.log("Make sure you have started the server first!\n");

	console.log("=== Example 1: Simple Question ===\n");

	try {
		for await (const chunk of chatCompletionStream({
			endpointUrl: ENDPOINT_URL,
			model: "", // Model is ignored, uses the one from agent.json
			messages: [{ role: "user", content: "What is 2+2?" }],
		})) {
			const content = chunk.choices[0]?.delta.content;
			if (content) {
				process.stdout.write(content);
			}
		}
		console.log("\n");
	} catch (error) {
		if (error.message.includes("ECONNREFUSED")) {
			console.error("\n❌ Error: Could not connect to server.");
			console.error("Please start the server first with:");
			console.error("  npx @huggingface/tiny-agents serve ./examples/local-openai-endpoint\n");
			process.exit(1);
		}
		throw error;
	}

	console.log("\n=== Example 2: Using MCP Tools ===\n");

	for await (const chunk of chatCompletionStream({
		endpointUrl: ENDPOINT_URL,
		model: "",
		messages: [
			{
				role: "user",
				content: "List all files in the current directory and tell me how many there are.",
			},
		],
	})) {
		const content = chunk.choices[0]?.delta.content;
		if (content) {
			process.stdout.write(content);
		}
	}
	console.log("\n");

	console.log("\n=== Example 3: Multi-turn Conversation ===\n");

	const messages = [
		{ role: "user", content: "What's the weather like?" },
		{
			role: "assistant",
			content: "I don't have access to real-time weather data, but I can help you find that information!",
		},
		{ role: "user", content: "That's okay, can you list the files in this directory instead?" },
	];

	for await (const chunk of chatCompletionStream({
		endpointUrl: ENDPOINT_URL,
		model: "",
		messages,
	})) {
		const content = chunk.choices[0]?.delta.content;
		if (content) {
			process.stdout.write(content);
		}
	}
	console.log("\n");

	console.log("✅ All examples completed successfully!");
}

main().catch(console.error);
