import {closeConnection} from "./config.js";
import * as path from "node:path";
import * as fs from "node:fs";

async function main() {
    const taskName = process.argv[2];
    if (!taskName) {
        console.error('Usage: npm start <taskName>');
        process.exit(1);
    }

    const tasksDir = path.resolve('src', 'tasks');
    const taskFiles = fs.readdirSync(tasksDir).filter(f => f.endsWith('.js'));
    const tasks = {};
    for (const file of taskFiles) {
        const mod = await import(`./tasks/${file}`);
        tasks[mod.name] = mod;
    }

    const task = tasks[taskName];
    if (!task) {
        console.error(`Unknown task: ${taskName}`);
        console.log('Available tasks:', Object.keys(tasks).join(', '));
        process.exit(1);
    }

    console.log(`Running task: ${taskName} — ${task.description}`);
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