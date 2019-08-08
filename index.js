const Octokit = require('@octokit/rest')
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN, // https://github.com/settings/tokens/new
  previews: ['application/vnd.github.baptiste-preview+json']
})

const OWNER = "_github_username_"

// Archive all repos
octokit.repos.listForUser({username: OWNER, per_page: 100, page: 1}).then((res) => {
  res.data.forEach((x) => {
    octokit.repos.update({
      owner: OWNER,
      repo: x.name,
      archived: true
      }).then((res) => console.log("SUCCESS: ", res))
    .catch((err) => console.log("ERROR: ", err))
  })
}).catch((err) => console.log("LIST ERROR: ", err))
