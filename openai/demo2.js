import "dotenv/config";
import { AzureOpenAI } from "openai";
import readline from "readline";

export async function main() {
    // Set these environment variables or edit the following values
    const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
    const apiKey = process.env["AZURE_OPENAI_API_KEY"];
    const apiVersion = process.env.AZURE_OPENAI_API_VERSION;
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT; //The deployment name for your completions API model. The instruct model is the only new model that supports the legacy API.

    console.log(endpoint);
    console.log(apiKey);
    console.log(apiVersion);
    console.log(deployment);

    const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    async function getResponse(prompt) {
        const result = await client.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "你是一个乐于助人的助手。你将使用中文与用户交流。",
                    // content: "You are an AI assistant that helps people find information.",
                },
                { role: "user", content: prompt },
            ],
            temperature: 0.7,
            top_p: 0.95,
            max_tokens: 1024,
            model: "gpt-3.5-turbo", // You need to specify the model name
        });

        for (const choice of result.choices) {
            console.log(choice.message.content);
        }
    }

    function askQuestion() {
        rl.question("You: ", async (prompt) => {
            await getResponse(prompt);
            askQuestion(); // Ask for the next input
        });
    }

    askQuestion(); // Start the interaction
}

main().catch((err) => {
    console.error("The sample encountered an error:", err);
});
