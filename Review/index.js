var github = require('octonode');

// TODO: Set this to a more reasonable value!
let warningThreshold = 2;

module.exports = async function (context, req) {

    var token = process.env.GITHUB_ACCESS_TOKEN;

    if(!token) {    
        // For more information on personal access tokens see:
        // https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line
        context.log.error("No access token found. Please generate a personal access token in github with the repo scope and add a GITHUB_ACCESS_TOKEN app setting with this value.");
        context.res = { status: 500 }; 
        return; 
    }

    var client = github.client(token);        
    var pr = req.body.pull_request;

    if(pr) {
        var repo = req.body.repository;        
        var changedFiles = pr.changed_files;
        context.log(`Recieved hook for PR #${pr.number} on repo ${repo.full_name} with ${changedFiles} changed file(s).`);        

        if(changedFiles >= warningThreshold) {
            var issue = client.issue(repo.full_name, pr.number);
            
            await issue.createComment({
                body: `Whoa, this PR touches ${changedFiles} files. That is quite a few, look carefully!`
            });                           
        }        
    }    

    context.res = { status: 200 };  
};