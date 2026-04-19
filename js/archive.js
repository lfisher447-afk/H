/**
 * @file archive.js
 * @module archive
 * @description A module for creating .zip archives in the browser using JSZip.
 *
 * @requires JSZip - The core JSZip library, which must be included in the HTML.
 */

if (typeof JSZip === 'undefined') {
    throw new Error('JSZip library not found. Please ensure the CDN link is correct and has loaded.');
}

/**
 * Creates a .zip archive from a combined playbook object.
 *
 * @param {Object} combinedPlaybook - The combined playbook data.
 * @param {string} combinedPlaybook.name - The name for the main playbook JSON file.
 * @param {Array} combinedPlaybook.steps - The combined steps.
 * @param {Array<Object>} combinedPlaybook.scripts - An array of script objects with 'name' and 'content' properties.
 * @returns {Promise<Blob>} A promise that resolves to a Blob representing the .zip archive.
 */
export async function createArchive(combinedPlaybook) {
    const zip = new JSZip();

    // 1. Add the main playbook JSON file
    const playbookContent = JSON.stringify({
        name: combinedPlaybook.name,
        steps: combinedPlaybook.steps,
    }, null, 2);
    zip.file('playbook.json', playbookContent);

    // 2. Add all the scripts into a 'scripts' folder
    const scriptsFolder = zip.folder('scripts');
    for (const script of combinedPlaybook.scripts) {
        // Ensure the script name is just the filename, not a path
        const filename = script.name.split('/').pop().split('\\').pop();
        scriptsFolder.file(filename, script.content);
    }

    // 3. Generate the .zip file as a Blob
    return zip.generateAsync({ type: 'blob' });
}
