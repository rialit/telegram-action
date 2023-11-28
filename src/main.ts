import * as core from '@actions/core'
import * as github from '@actions/github'
import { request } from 'http'

async function main() {
  try {
    if (github.context.eventName === 'push') {
      const to = core.getInput('to');
      const token = core.getInput('token');
      const pushPayload = github.context.payload
      const commits = pushPayload.commits.map((commit: {message: string}) => commit.message).join('\n');
      console.log(commits)
      core.info(`The head commit is: ${pushPayload.head_commit}`)
      request(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${to}&parse_mode=html&text=${commits}`)
    }

  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

main();