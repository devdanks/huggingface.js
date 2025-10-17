import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";
import { PROVIDERS_OR_POLICIES } from "@huggingface/inference";
import { ServerConfigSchema, InputConfigSchema } from "../src/lib/types";

const EXAMPLES_DIR = join(__dirname, "..", "examples");

const ConfigSchema = z
	.object({
		model: z.string(),
		provider: z.enum(PROVIDERS_OR_POLICIES).optional(),
		endpointUrl: z.string().optional(),
		apiKey: z.string().optional(),
		inputs: z.array(InputConfigSchema).optional(),
		servers: z.array(ServerConfigSchema),
	})
	.refine((data) => data.provider !== undefined || data.endpointUrl !== undefined, {
		message: "At least one of 'provider' or 'endpointUrl' is required",
	});

describe("Example Configurations", () => {
	const examples = ["openai-endpoint", "local-openai-endpoint", "remote-mcp-tools"];

	for (const exampleName of examples) {
		it(`should have valid agent.json for ${exampleName}`, () => {
			const configPath = join(EXAMPLES_DIR, exampleName, "agent.json");
			const configJson = readFileSync(configPath, "utf8");
			const config = JSON.parse(configJson);

			// Validate against schema
			const result = ConfigSchema.safeParse(config);
			if (!result.success) {
				console.error("Validation errors:", result.error.errors);
			}
			expect(result.success).toBe(true);

			// Additional checks
			expect(config.model).toBeTruthy();
			expect(config.servers).toBeInstanceOf(Array);
			expect(config.servers.length).toBeGreaterThan(0);
		});
	}

	it("should have consistent server configurations", () => {
		const configPath = join(EXAMPLES_DIR, "openai-endpoint", "agent.json");
		const config = JSON.parse(readFileSync(configPath, "utf8"));

		// Check that all stdio servers have required fields
		for (const server of config.servers) {
			if (server.type === "stdio") {
				expect(server.command).toBeTruthy();
				expect(server.args).toBeInstanceOf(Array);
			}
		}
	});

	it("should use proper input variable syntax", () => {
		const configPath = join(EXAMPLES_DIR, "openai-endpoint", "agent.json");
		const config = JSON.parse(readFileSync(configPath, "utf8"));

		// Check that apiKey uses input variable syntax if defined
		if (config.apiKey && config.apiKey.includes("${input:")) {
			expect(config.apiKey).toMatch(/\$\{input:[a-z0-9-]+\}/);
		}
	});

	it("should have README.md for each example", () => {
		for (const exampleName of examples) {
			const readmePath = join(EXAMPLES_DIR, exampleName, "README.md");
			expect(() => readFileSync(readmePath, "utf8")).not.toThrow();
		}
	});
});
