# HQ - Analytic
This is a project to generate statistics about the game HQ - Trivia


### Requirements
Have installed:

1. [nvm](https://github.com/creationix/nvm).
2. [yarn](https://yarnpkg.com/lang/en/).

Integrated on your IDE:
1. [eslint](https://eslint.org/docs/user-guide/integrations)
2. [prettier](https://prettier.io/docs/en/editors.html/) 

Also you need to understand and apply the [Git Flow](https://danielkummer.github.io/git-flow-cheatsheet/) standard.


## Structure
The project has the following structure:
```
hq-analytic
  |-- packages
    |-- api
    |-- web   
```

Each package has its own documentation in the `root` with a `README.md` file

### nbd-api

This package has the all related with the logic and the data and is develop in [Express](http://expressjs.com/).

### ndb-web

This is the front of the project and is created with the starter [create-react-app](https://github.com/facebookincubator/create-react-app). 

### eslint

use `eslint` based in [Google](https://github.com/google/eslint-config-google) with `Prettier` plugin.

To make sure that your code is fine, you can run, these commands:

- `yarn lint:fix` in each package to verify and fix automatic some erros.

- `yarn lint` in each package to verify your code, this command will say the errors that you have in you code.

## Developing

### Making a commit

There is a mandatory format for all commits that work in packages.

```
[package] content of commit
```

Some examples:

```sh
[api] develop to handle the new model
[web] adding a new component
```

Consider:

- Use lowercase and avoid special characters
- Be precise and communicative
- Do not let accumulate many files

### Pull Request

Verify that it is accurate and very easy to check for approval to be effective.
 
Apart from that keep in mind the following:

- Files have no conflicts.
- The code should not have errors.
- the branch may don't be un update from the `develop` branch