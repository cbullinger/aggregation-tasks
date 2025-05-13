// Verify tasks return the correct results using the same logic as index.js, but include a verification assert

import {closeConnection} from "./config.js";
import * as path from "node:path";
import * as fs from "node:fs";
import assert from "node:assert/strict";

async function main() {
    const taskName = process.argv[2];
    if (!taskName) {
        console.error('Usage: npm run verify <taskName>');
        process.exit(1);
    }

    const tasksDir = 'tasks';
    const tasksPath = path.resolve('src', tasksDir);
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

    // Expected results for task 1 (example, update as needed)
    console.log(`Verifying Task ${taskName} — ${task.description} with expected results`);
    const expectedResults = {
        "1": [
            { name: 'Neko Sushi', city: 'Santa Barbara', reputationScore: 4841 },
            { name: 'Luna Pizzeria', city: 'San Diego', reputationScore: 4008 },
            { name: 'The Ramen Bar', city: 'San Diego', reputationScore: 3782 },
            { name: 'Pasta + Co.', city: 'Long Beach', reputationScore: 2962 },
            { name: "Mama's Kitchen", city: 'San Diego', reputationScore: 2496 }
        ]
    };

    try {
        const results = [];
        // Monkey-patch console.table to capture output
        const origTable = console.table;
        console.table = (rows) => results.push(...rows);

        await task.run();

        console.table = origTable;

        if (expectedResults[taskName]) {
            assert.deepEqual(
                results,
                expectedResults[taskName],
                `Task ${taskName} results do not match expected output`
            );
            console.log(`Verification passed for task ${taskName}`);
        } else {
            console.warn(`No expected results defined for task ${taskName}`);
        }
    } catch (err) {
        console.error('Verification error:', err);
        process.exitCode = 1;
    } finally {
        await closeConnection();
    }
}

main();

