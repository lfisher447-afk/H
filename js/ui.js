import { combinePlaybooks } from './combine.js';

export function initUI() {
    const fileInput = document.getElementById('playbook-files');
    const combineBtn = document.getElementById('combine-btn');
    const outputLog = document.getElementById('output-log');
    const downloadLink = document.getElementById('download-link');

    combineBtn.addEventListener('click', async () => {
        const files = fileInput.files;
        if (files.length < 2) {
            log('Please select at least two .apbx files to combine.');
            return;
        }

        log('Starting combination process...');
        try {
            const combinedPlaybook = await combinePlaybooks(files, log);
            log('Combination complete!');
            
            const blob = new Blob([JSON.stringify(combinedPlaybook, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = 'combined_playbook.json';
            downloadLink.style.display = 'block';
        } catch (error) {
            log(`Error: ${error.message}`);
        }
    });

    function log(message) {
        outputLog.textContent += message + '\n';
    }
}
