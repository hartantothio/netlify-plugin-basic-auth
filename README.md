# Netlify Build Plugin: Secured Site with Basic Auth

Secure the site with Basic Auth.

## Usage

### Installing from your project's code

Install manually by adding the following lines to the project's `netlify.toml` file.

Reference for the `netlify.toml` can be found [here](https://docs.netlify.com/configure-builds/file-based-configuration/)

```toml
[[plugins]]
  package = "../netlify-build-plugins/netlify-plugin-gatsby-cache"

  [plugins.inputs]
    userEnvKey = 'AUTH_USER' # optional
    passEnvKey = 'AUTH_PASS' # optional
    branches = 'staging,stage' # optional
    pullRequest = true # optional. Default is true.
```

### Inputs

`userEnvKey` - specify the environment key for the username (optional)

`passEnvKey` - specify the environment key for the password (optional)

`branches` - comma-separated string of branches to be secured

`pullRequest` - secure the [deploy-preview](https://docs.netlify.com/configure-builds/file-based-configuration/#deploy-contexts) build
