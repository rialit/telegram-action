import * as core from '@actions/core'
import * as github from '@actions/github'

async function main() {
  try {
    if (github.context.eventName === 'push') {
      const to = core.getInput('to');
      const token = core.getInput('token');
      const pushPayload = github.context.payload
      const commits = pushPayload.commits.map((commit: {message: string}) => commit.message).join('<br>');

      console.log(pushPayload.commits)

      fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${to}&parse_mode=html&text=${commits}`, {
        method: 'POST',
      })
    }

  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

main();