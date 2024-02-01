import path = require('path');
import * as core from '@actions/core';
import * as fs from 'fs'

export interface LatestUpdate {
    version: string,
    changed: string[],
}

const pathChangelog = path.join(core.getInput('path'), 'CHANGELOG.md');
const versionReg = /^##\sv([0-9\.]+)\s/;

export default function(): LatestUpdate {
    const latestUpdate: LatestUpdate = {
        version: '',
        changed: [],
    };

    if (!fs.existsSync(pathChangelog)) {
        core.setFailed('CHANGELOG.md not found');
        return latestUpdate;
    }

    const file = fs.readFileSync(pathChangelog, 'utf-8');
    const lines = file.split('\r\n');

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const line: string = lines[lineIndex];
        const versionFound = line.match(versionReg);
    
        if (versionFound && versionFound[1]) {
            if (!latestUpdate.version) {
                latestUpdate.version = versionFound[1];
                continue;
            } else {
                break;
            }
        }
    
        if (latestUpdate.version) {
            latestUpdate.changed.push(line.replace('###', '').trim());
        }
    }

    return latestUpdate;
}