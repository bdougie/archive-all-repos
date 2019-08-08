# archive-all-repos
this is a script to archive all my repos for my extra account

## purpose
I have an extra account [fakeAssBrian](https://github.com/fakeAssBrian) to test things without cluttering my main account [bdougie](https://github.com/bdougie).

I created hundreds of test repos from various tutorials and needed a way automagically archive all the repos. Note: I did not want to delete them, in case I am referencing the repo in a blog or tutorial externally. 

## steps to use

```sh
git clone https://github.com/bdougie/archive-all-repos
cd archive-all-repos
npm install
node index.js
```

## code 
```js
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

```
