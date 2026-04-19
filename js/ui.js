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

        // Reset previous results
        outputLog.textContent = '';
        downloadLink.style.display = 'none';
        log('Starting combination process...');

        try {
            // This now returns a Blob object
            const archiveBlob = await combinePlaybooks(Array.from(files), log);

            // Create a URL from the Blob
            const url = URL.createObjectURL(archiveBlob);

            // Set up the download link
            downloadLink.href = url;
            downloadLink.download = 'combined_playbook.apbx'; // Set the desired filename
            downloadLink.style.display = 'block';
            log('Your combined playbook is ready for download.');

        } catch (error) {
            log(`Error: ${error.message}`);
            console.error(error); // Also log the full error to the console for debugging
        }
    });

    function log(message) {
        outputLog.textContent += message + '\n';
        // Auto-scroll to the bottom
        outputLog.scrollTop = outputLog.scrollHeight;
    }
}
