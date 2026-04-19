import { decompress } from './sevenzip.js';

export async function parsePlaybook(file) {
    const contents = await decompress(file);
    // This assumes a 'playbook.json' file inside the archive. The actual structure may vary.
    const playbookData = JSON.parse(contents['playbook.json']);
    return {
        name: file.name,
        data: playbookData,
        scripts: Object.keys(contents)
                     .filter(name => name.endsWith('.ps1'))
                     .map(name => ({ name, content: contents[name] })),
    };
}
