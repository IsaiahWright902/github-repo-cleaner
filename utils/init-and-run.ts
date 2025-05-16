import { existsSync, readFileSync, writeFileSync } from "fs";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });

async function main() {
    await initAndRun();
}


async function initAndRun() {
    if (existsSync(".env.local")) {
        console.log(".env.local file already exists. Skipping");
        return;
    }

    if (!existsSync(".env.default")) {
        console.error(".env.default file not found :(");
    }

    const fileContents = readFileSync(".env.default", { encoding: "utf-8" })
        .split("\n")
        .filter((x) => x.length > 1 && !x.startsWith("#"))
        .map((x) => x.trim().split("="))
        .map(([key, ...vals]) => [key, vals.join("=")]);

    const rl = createInterface({ input, output });
    const contentToWrite = [];

    console.log(
        "Setup env.local: Enter values or press enter to use default value."
    );

    for (const [key, defaultValue] of fileContents) {
        const answer = await rl.question(
            `${key}=(default:${defaultValue ? defaultValue : "none"}) ? `
        );
        const val = answer ? answer : defaultValue;
        contentToWrite.push(`${key}=${val}`);
    }

    console.log("Creating local .env file")

    writeFileSync(
        ".env.local",
        Buffer.from(contentToWrite.join("\r\n"), "utf-8")
    );

    console.log("Environment file created successfully!");

}