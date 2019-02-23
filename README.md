# pull-request-reviewer
A simple example of using Azure Functions to implement a GitHub webhook. 

## What does it do?

It checks to see how many files were modified in the PR, and leaves a comment if it hits a configured threshold.

## Setup

### Access token
You'll need to [generate a personal access token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line) and config the app to use it during deployment. Make sure that you give the token the appropriate scope. For example if you're going to hook this up to a public repo you'll need to grant the token the public repo scope.

The function code tries to use this token by looking for the `GITHUB_ACCESS_TOKEN` app setting. If you're deploying this using the included ARM Template (azure.deploy.json) it should prompt you for the token there.

### Webhook

After deploying the function app, go to the functions portal and get the function URL for the `Review` function. It should include an API key. Then go to the github repo where you want to hook this up and add a webhook and paste in that URL.

### Modify to your needs

You probably don't want a webhook that comments on every PR that touches two or more files. Modify accordingly :)



