import { parsePlaybook } from './playbook.js';
import { applyAlgorithms } from './algorithms.js';
import { createArchive } from './archive.js'; // Import the new archive module

export async function combinePlaybooks(files, log) {
    let playbooks = [];
    for (const file of files) {
        log(`Parsing ${file.name}...`);
        try {
            playbooks.push(await parsePlaybook(file));
        } catch (error) {
            log(`Error parsing ${file.name}: ${error.message}`);
            // Optionally, skip this file and continue
        }
    }

    if (playbooks.length === 0) {
        throw new Error("No valid playbooks could be parsed.");
    }

    log('Combining playbooks...');
    let combined = {
        name: 'Combined Playbook',
        steps: [],
        scripts: [],
    };

    for (const playbook of playbooks) {
        if (playbook.data.steps) {
            combined.steps.push(...playbook.data.steps);
        }
        if (playbook.scripts) {
            combined.scripts.push(...playbook.scripts);
        }
    }

    // Apply advanced algorithms (e.g., deduplication)
    combined = applyAlgorithms(combined, log);

    log('Creating final playbook archive...');
    // Generate the final .zip file as a Blob
    const archiveBlob = await createArchive(combined);
    log('Archive created successfully!');

    return archiveBlob;
}
