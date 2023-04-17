# order-service
[![CircleCI](https://dl.circleci.com/status-badge/img/gh/ThirtyMadison/medication-treatment-service/tree/main.svg?style=shield&circle-token=f85499773384def86dadf2923e51b6abe4f17c1a)](https://dl.circleci.com/status-badge/redirect/gh/ThirtyMadison/medication-treatment-service/tree/main)
[![Coverage Status](https://coveralls.io/repos/github/ThirtyMadison/medication-treatment-service/badge.svg?t=PIzqES)](https://coveralls.io/github/ThirtyMadison/medication-treatment-service)

## How to create a new service:
Use [fido2](https://github.com/thirtymadison/fido2#readme) to generate a new service, then use the rest of the README to complete the process

1. Create Vault secrets for:
   - staging:
     - Go to [this link](https://vault.fortymadison.com/ui/vault/secrets/kv/create)
     - Fill in "Path for this secret" to be `medication_treatment_service_staging`
     - Add the key `DATABASE_NAME` with value `medication-treatment`
2. Setup CircleCI with your new repo:
   - Go [here](https://app.circleci.com/projects/project-dashboard/github/ThirtyMadison/), find your new repo, hit "Set Up Project"
   - Keep the default of using the `.circleci/config.yml` in your repo
   - Hit "Set Up Project"

=== You can now use feature-staging! ===

3. Configure Slack notifications
   - [Go here](https://api.slack.com/apps?new_app=1)
   - Create a new app from scratch
   - Name it `medication-treatment Service Slack Notifier` (Slack has 35 char name limit.  Modify as needed, name is not important)
   - Ensure it's added to the ThirtyMadison workspace
   - In the left bar go to `OAuth & Permissions`
   - Under "Scopes" --> "Bot Token Scope" add the following scopes:
      - `chat:write`
      - `chat:write.public`
      - `files:write`
   - Under "OAuth Tokens for Your Workspace" hit "Install to Workspace" and hit "Allow"
   - Under "OAuth Tokens for Your Workspace" copy that "Bot User OAuth Token"
   - Put that token in the CircleCI Environment Variables
      - [Go here](https://app.circleci.com/settings/project/github/ThirtyMadison/medication-treatment-service/environment-variables)
      - Add an environment variable with key `SLACK_ACCESS_TOKEN` and value the created token
      - Add an environment variable with key `SLACK_DEFAULT_CHANNEL` and place the ID of the channel you want to get service-relevant notifications in
         - To get the ID for your Slack channel, right-click the channel in Slack and choose Copy Link. The ID will be visible at the end of the URL and will be in this format: C034R26AM36.
4. Federate on the gateway
   - [Here's](https://github.com/ThirtyMadison/graphql-gateway/pull/393/files) an example PR from the labs service that should be replicated for your new service
5. Get rid of the Example resolver and it's respective Model, Module, and invocation in `src/App.module.ts`
6. Go to [this link](https://github.com/ThirtyMadison/medication-treatment-service/compare/pr-for-atlantis?expand=1) and create a PR.
   - Why?
     - There are things you have to update in that file
     - You need a PR to run your `atlantis plan` and `atlantis apply` to create the infrastructure you need to run your new service in demo and prod. Feel free to do that now.
     - Don't know what it means to "run atlantis plan"? 
        - checkout out [these docs](https://www.runatlantis.io/)
        - TL;DR we run Terraform through comments on PRs via a service called Atlantis. So commenting `atlantis plan` on this PR will create the terraform plan. Commenting `atlantis apply` will similarly apply the plan. 
