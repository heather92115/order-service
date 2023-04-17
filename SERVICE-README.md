# order-service

## Description

Description of order service

## Setup

This project uses some private packages. We publish some code as GitHub packages in order to make it easier to share code between our services.

First, you will need to [create a personal access token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token 'Creating a personal access token') in GitHub. It needs to have `read:packages` scope.

Next, we can configure an `.npmrc` to provide the auth token for all yarn and npm installs. Add the following to your local environment setup (`~/.bash_profile`, etc.):

```sh
export GITHUB_ACCESS_TOKEN="<token>"
echo //npm.pkg.github.com/:_authToken=$GITHUB_ACCESS_TOKEN > ~/.npmrc
```

Alternatively, you can use `npm login` to auth with GitHub as the private registry associated with our organization:

```sh
npm login --registry=https://npm.pkg.github.com
```

Your username is your GitHub username, all lower case. Enter your GitHub personal access token as the password and your Thirty Madison email address as your email, when prompted.

Following this, yarn and npm will know to resolve all of the `@thirtymadison` packages using GitHub (based off of the `.yarnrc`).

Next, copy the `.env.sample` to `.env`:

```sh
cp .env.sample .env
```

Then, set up the development database:

```sh
docker-compose -p treatment-service up -d postgres-12x
psql -U postgres -h localhost -c 'CREATE DATABASE order_service;' -p 5434

yarn install
yarn setup
```

### Known setup issues

You may run into an issue with this stack trace on first install:

```sh
gyp: No Xcode or CLT version detected!
gyp ERR! configure error
gyp ERR! stack Error: `gyp` failed with exit code: 1
gyp ERR! stack     at ChildProcess.onCpExit (/usr/local/lib/node_modules/npm/node_modules/node-gyp/lib/configure.js:351:16)
gyp ERR! stack     at ChildProcess.emit (events.js:321:20)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:275:12)
gyp ERR! System Darwin 19.6.0
gyp ERR! command \"/usr/local/bin/node\" \"/usr/local/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js\" \"rebuild\"
gyp ERR! cwd /Users/murtaza/Desktop/thirtymadison/toy-nestjs-service/node_modules/unix-dgram
```

If that is the case, run the following commands:

```sh
rm -rf $(xcode-select --print-path) # may need sudo
xcode-select --install
```

## Running the service

```sh
yarn start
```

To run the service in watch mode, run the following command:

```sh
yarn run start:dev
```

### Running the service in Docker

Running the service in Docker for the first time, you will need to create a database:

```sh
docker-compose -p treatment-service up -d postgres-12x
psql -U postgres -h localhost -c 'CREATE DATABASE order-service;'
```

Additionally, you will have to build the image locally. The local Dockerfile will also need to be parameterized with a GitHub personal access token:

```sh
docker build -t order-service:latest --build-arg GITHUB_ACCESS_TOKEN=$GITHUB_ACCESS_TOKEN .
```

Following this, and each time afterwards, to spin up the service using docker, run the following command:

```sh
docker-compose up -d
```

## Test

```sh
yarn run test
yarn run test:cov
```

### Running integration tests

To run the integration tests you need to add a `.env.test` file with:

```
DATABASE_CONNECTION_STRING="postgresql://postgres:postgres@localhost:5434/medication_treatment_service_test?schema=public"
```

Now you can run:

```sh
yarn run test:e2e
```

### Troubleshooting

#### Received: 404 without trace

You may receive a 404 without a useful error trace if you are missing a dependency (module, provider, etc..) that should be registered by the `createAppModule` factory of `App.testmodule.ts`. For example, you may have introduced schema changes but forgot to inject the new query or mutation providers.

Tip: Nest might (automagically) override an updated schema. This is likely a red herring that a dependency is missing. Check your working directory to see if `schema.gql`  has changed while running the tests. 


## Generating documentation

### `@compodoc/compodoc`

Nest.js provides some tools out of the box for [generating documentation](https://docs.nestjs.com/recipes/documentation 'Documentation').

To generate this documentation, run the following command:

```sh
yarn global add @compodoc/compodoc
compodoc -p tsconfig.json -s
```

This will result in some standard (JSDoc-like) project documentation, covering all of the Nest.js components included in your project.

`compodoc` will also serve the documentation via [http://localhost:8080](http://localhost:8080 'compodoc documentation').

### `dociql`

In order to generate [dociql](https://github.com/wayfair/dociql 'dociql') documentation the service needs to be running in the background.

```sh
yarn run start:dev
```

Then, the dociql development service can be started with the following commands:

```sh
yarn global add dociql
dociql -D -t documentation dociql-config.yml
```

This will serve the documentation via [http://localhost:4400](http://localhost:4400).

### `@2fd/graphdoc`

To generate `graphdoc` documentation, run the following commands:

```
yarn global add @2fd/graphdoc
graphdoc -s ./schema.gql -o ./documentation/schema
```

This will output documentation in the `documentation/schema` directory. An `index.html` file generated in that directory can be loaded in a browser to demonstrate.

### Prisma Studio

Prisma Studio can be initialized by running `yarn prisma studio`

For more information, please see the [Prisma Studio](https://github.com/prisma/studio 'Prisma Studio') GitHub repository.

## CI/CD

### Validating CircleCI Configuration

To validate the CircleCI configuration in this repository, run the following commands:

```sh
brew install circleci
circleci config validate
```

This will inform the user about any syntax errors in the `.circleci/config.yml` or invalid configuration options.

This tooling will not validate associated scripts or that the build passes.

### Testing CircleCI Locally

To run the CircleCI configuration locally for testing purposes, run the following commands:

```sh
brew install circleci
circleci local execute
```

## Terraform Related Work

If you are planning to do Terraform related work (inside of the `.infra/terraform` directory), there are some extra steps required to set up your environment, which will help you follow the Infrastructure Team's coding standards.

We use [pre-commit](https://pre-commit.com/) to run linting/formatting on all Terraform code. Instructions to set this up can be found [here](https://www.notion.so/thirtymadison/Terraform-Lints-Checks-30585ca030cb47fcbd7743863f276dc9).

If you're not working with Terraform, you do not need to set this up!

If you have any questions, please feel free to contact `@devops` or `#eng-guild-devops` on Slack.


## Telepresence
### Install dependencies
Follow the [Telepresence notion doc](https://www.notion.so/thirtymadison/Telepresence-Basics) to install and learn more about Telepresence

### Connecting Telepresence to a dev environment:

1. Open a Pull Request with "build_image" in the latest commit message
   1. This will create a dev environment on https://argocd.fortymadison.com/
   2. A comment will be posted to the pull request with a link to the new environment in ArgoCD
2. Connect to the `feature-staging` cluster
    1. `tm-kubectx feature-staging -a -y`
3. In a bash or zsh terminal, create an environment variable and set it to the dev env namespace (service-name-<GITHUB_PR_NUMBER>)
   1. `export NAMESPACE=service-name-246`
4. Set your default namespace to match the one generated for the dev environment
    1. `kubens $NAMESPACE`
    2. If you don't have `kubens`: `kubectl config set-context --current --namespace=$NAMESPACE`
5. Close out any previous telepresence session and starts a new one
    1. `telepresence quit && telepresence connect`

Your system can now Interact with the cluster using Kubernetes DNS as if laptop is a pod in that namespace:

### Intercepting traffic from dev environment

1. Set ${NAMESPACE} environment variable to match deployment
   1. `export NAMESPACE=service-name-123`
2. cp `.env.telepresence.sample` to `.env`
3. `yarn build` to build package locally
4. `yarn install` to install the build for running locally
5. `yarn start` to start up this recently built local version of the service
   1. the local service will be connected to resources in $NAMESPACE
6. Use `telepresence list` to show apps which can have their traffic intercepted.
7. Intercept live traffic from the deployed service and forward to our locally running service:
   1. `telepresence intercept $NAMESPACE-service-name --port 3000 --env-file telepresence.env`
   2. The local running service will now get requests sent to the dev env.

You can now continue development using the dev environment as if the deployed fulfillment-service has been swapped out for your local running instance.

### Ending a Telepresence session

1. Remove telepresence agents and stop existing intercepts:
   1. `telepresence quit`
