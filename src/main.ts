import * as core from '@actions/core'
import * as github from '@actions/github'

async function main() {
  try {
    if (github.context.eventName === 'push') {
      const pushPayload = github.context.payload
      core.info(`The head commit is: ${pushPayload.head_commit}`)
    }

  } catch (error) {
    core.setFailed(error.message)
  }
}

main();