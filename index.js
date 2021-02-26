const fs = require('fs');

const TEMPLATE = `/*
  Basic-Auth: AUTH_USER:AUTH_PASS
`;

const CONTEXT_DEPLOY_PREVIEW = 'deploy-preview';
const CONTEXT_BRANCH_DEPLOY = 'branch-deploy';
const CONTEXT_PRODUCTION = 'production';

module.exports = {
  onPostBuild({ inputs }) {
    const {
      branches: _branches,
      pullRequest = true,
      userEnvKey = 'AUTH_USER',
      passEnvKey = 'AUTH_PASS',
    } = inputs;

    const user = process.env[userEnvKey];
    const pass = process.env[passEnvKey];

    if (!user || !pass) {
      console.log('Username and/or password not found. Skip.');

      return;
    }

    if (process.env.CONTEXT === CONTEXT_PRODUCTION) {
      console.log('Production build. Skip.');

      return;
    }

    if (
      process.env.CONTEXT === CONTEXT_DEPLOY_PREVIEW &&
      (!process.env.PULL_REQUEST || !pullRequest)
    ) {
      console.log(
        `Disabled for ${process.env.CONTEXT_DEPLOY_PREVIEW}. Do nothing.`
      );

      return;
    }

    const branches = _branches.split(',');

    if (
      process.env.CONTEXT === CONTEXT_BRANCH_DEPLOY &&
      branches.length &&
      !branches.includes(process.env.BRANCH)
    ) {
      console.log(
        `The ${process.env.BRANCH} is not in the list of branches to be secured. Do nothing.`
      );

      return;
    }

    console.log('Securing this deployment.');

    fs.appendFileSync(
      `${process.cwd()}/public/_headers`,
      TEMPLATE.replace('AUTH_USER', process.env.AUTH_USER).replace(
        'AUTH_PASS',
        process.env.AUTH_PASS
      ),
      'utf-8'
    );
  },
};
