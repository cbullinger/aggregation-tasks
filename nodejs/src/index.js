import {closeConnection} from "./config.js";
import * as path from "node:path";
import * as fs from "node:fs";

async function main() {
    const taskName = process.argv[2];
    if (!taskName) {
        console.error('Usage: npm run task <taskName>');
        process.exit(1);
    }

    const tasksDir = 'tasks';
    const tasksPath = path.resolve('src', 'tasks');
    const taskFiles = fs.readdirSync(tasksPath).filter(f => f.endsWith('.js'));
    const tasks = {};
    for (const file of taskFiles) {
        const mod = await import(`./${tasksDir}/${file}`);
        tasks[mod.name] = mod;
    }

    const task = tasks[taskName];
    if (!task) {
        console.error(`Unknown task: ${taskName}`);
        console.log('Available tasks:', Object.keys(tasks).join(', '));
        process.exit(1);
    }

    console.log(`Running Task ${taskName} — ${task.description}`);
    const timeout = 10000; // ms

    try {
        await Promise.race([
            task.run(),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Task timed out')), timeout)
            )
        ]);
    } catch (err) {
        console.error('Task error:', err);
        process.exitCode = 1;
    } finally {
        await closeConnection();
    }
}

main();