import * as github from '@actions/github'

// const REFS_PATCH = 'refs/';

const tagName = 'v1.0.25';

export default async function(gitHubToken: string) {
    const octokit = github.getOctokit(gitHubToken)
    const owner = github.context.payload.repository?.owner.login;
    const repo = github.context.payload.repository?.name;
    // const ref = github.context.payload.ref.replace(REFS_PATCH, '')

    if (!owner || !repo || !process.env.GITHUB_SHA) {
        return;
    }

    const createdTag = await octokit.rest.git.createTag({
        owner,
        repo,
        type: 'commit',
        tag: tagName,
        message: 'this tag create in api',
        object: process.env.GITHUB_SHA
    })

    console.log('createdTag', createdTag)

    const createdRef = await octokit.rest.git.createRef({
        owner,
        repo,
        ref: 'refs/tags/' + tagName,
        sha: createdTag.data.sha
    })

    console.log('createdRef', createdRef)
}