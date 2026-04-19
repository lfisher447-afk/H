export function applyAlgorithms(playbook, log) {
    log('Applying advanced algorithms...');

    // 1. Deduplication
    playbook.scripts = deduplicate(playbook.scripts, 'content');
    log('Deduplicated scripts.');

    // Add more algorithm calls here...

    return playbook;
}

function deduplicate(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()];
}
