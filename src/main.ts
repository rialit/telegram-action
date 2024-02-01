import * as core from '@actions/core'
import getPackage, { PackageJson } from './getPackage';
import getLatestUpdate, { LatestUpdate } from './getLatestUpdate';
import findTag from './findTag';
import changeChangeLog from './changeChangeLog';
import createTag from './createTag';


function getHeaderMessageHtml(packageJson: PackageJson): string {
    return  `<code><strong>${packageJson.name}: ${packageJson.version}</strong></code>`;
}

function getCommitMessageHtml(message: string): string {
    return  `<code>${message}</code>`;
}

async function sendMessageTelegram(to: string, token: string, message: string) {
    return fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${to}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            parse_mode: 'html',
            text: message
        })
    }).then(data => data.json())
}

async function main() {
  try {
        const to = core.getInput('to');
        const token = core.getInput('token');
        const gitHubToken = core.getInput('git_token');

        const latestUpdate = getLatestUpdate();

        console.log('start', latestUpdate)

        if (!latestUpdate.version) {
            return;
        }

        // const tag = await findTag(gitHubToken);
        // const tagMessage = (tag?.data.message ?? '').trim();

        // if (!tagMessage) {
        //     return;
        // }

        createTag(gitHubToken)

        const packageJson = getPackage();
        
        const telegramMessageArray = [
            '#newVersion',
            getHeaderMessageHtml(packageJson), 
            '',
            ...latestUpdate.changed.map(getCommitMessageHtml),
        ];

        console.log(telegramMessageArray);

        changeChangeLog();

        sendMessageTelegram(to, token, telegramMessageArray.join('\n'))
        .then((response) => {
            if (!response.ok) {
                core.setFailed(response);
            }
        });

  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

main();