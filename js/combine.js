import { parsePlaybook } from './playbook.js';
import { applyAlgorithms } from './algorithms.js';

export async function combinePlaybooks(files, log) {
    let playbooks = [];
    for (const file of files) {
        log(`Parsing ${file.name}...`);
        playbooks.push(await parsePlaybook(file));
    }

    log('Combining playbooks...');
    let combined = {
        name: 'Combined Playbook',
        steps: [],
        scripts: [],
    };

    for (const playbook of playbooks) {
        combined.steps.push(...playbook.data.steps);
        combined.scripts.push(...playbook.scripts);
    }

    // Apply advanced algorithms
    combined = applyAlgorithms(combined, log);

    return combined;
}
