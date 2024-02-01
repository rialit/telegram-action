import * as github from '@actions/github'

// const REFS_PATCH = 'refs/';

export default function(gitHubToken: string) {
    const octokit = github.getOctokit(gitHubToken)
    const owner = github.context.payload.repository?.owner.login;
    const repo = github.context.payload.repository?.name;
    // const ref = github.context.payload.ref.replace(REFS_PATCH, '')

    if (!owner || !repo || !process.env.GITHUB_SHA) {
        return;
    }

    octokit.rest.git.createTag({
        owner,
        repo,
        type: 'commit',
        tag: 'v1.0.0',
        message: 'message tag',
        object: process.env.GITHUB_SHA
    })
}