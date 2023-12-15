import * as github from '@actions/github'



export default async function(gitHubToken: string) {
    const octokit = github.getOctokit(gitHubToken)

    const owner = github.context.payload.repository?.owner.login ?? '';
    const repositoryName = github.context.payload.repository?.name ?? '';
    const ref = github.context.payload.ref.replace('refs/', '')

    console.log(owner, repositoryName, ref)

    const refs = await octokit.rest.git.listMatchingRefs({
        owner,
        repo: repositoryName,
        ref
    })

    if (!refs || !refs.data || !refs.data[0]) {
        return;
    }

    const tag = refs.data[0];

    return await octokit.rest.git.getTag({
        owner,
        repo: repositoryName,
        tag_sha: tag.object.sha
    })
}