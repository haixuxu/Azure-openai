import "dotenv/config";
import { AzureOpenAI } from "openai";

export async function main() {
    // You will need to set these environment variables or edit the following values
    const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
    const apiKey = process.env["AZURE_OPENAI_API_KEY"];
    const apiVersion = process.env.AZURE_OPENAI_API_VERSION;
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT; //The deployment name for your completions API model. The instruct model is the only new model that supports the legacy API.

    console.log(endpoint);
    console.log(apiKey);
    console.log(apiVersion);
    console.log(deployment);
    const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });
    const result = await client.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant. You will talk like a pirate.",
            },
            { role: "user", content: "Can you help me?" },
        ],
        model: "",
    });

    for (const choice of result.choices) {
        console.log(choice.message);
    }
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
