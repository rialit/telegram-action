import * as core from '@actions/core'
import * as github from '@actions/github'

async function main() {
  try {
    if (github.context.eventName === 'push') {
      const pushPayload = github.context.payload
      console.log(pushPayload)
      core.info(`The head commit is: ${pushPayload.head_commit}`)
    }

  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

main();