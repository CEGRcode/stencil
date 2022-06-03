---
sidebar_position: 1
id: codingguidelines
title: Coding Guidelines
sidebar_label: Coding Guidelines
---

---

## Contributing
STENCIL welcomes new development! This document briefly describes best practices for contributing to the STENCIL repository.

## Before you Begin
If you have an idea for a feature to add or an approach for a bugfix, it is best to communicate with STENCIL developers early. The primary venue for this is the GitHub issue tracker. Browse through existing GitHub issues and if one seems related, comment on it.

## Reporting a new issue
If no existing STENCIL issue seems appropriate, a new issue can be opened using this form.

## How to Contribute
All changes to the STENCIL repository should be made through pull requests (with just two exceptions outlined below).

If you are new to Git, the Software Carpentry's Version Control with Git tutorial is a good place to start. More learning resources are listed at https://help.github.com/en/github/getting-started-with-github/git-and-github-learning-resources

1. Make sure you have a free GitHub account. To increase the security of your account, we strongly recommend that you configure two-factor authentication. Additionally, you may want to sign your commits.

2. Fork the PEGR repository on GitHub to make your changes. To keep your copy up to date with respect to the main repository, you need to frequently sync your fork:

```
git remote add upstream https://github.com/CEGRcode/stencil
git fetch upstream
git checkout dev
git merge upstream/dev
```

3. Choose the correct branch to develop your changes against.
- The **master** branch is kept in sync with the latest tagged release, but should not be used as the base (i.e. target) branch of a pull request.
- Additions of new features to the codebase should be based off the dev branch (git checkout -b feature_branch dev), with few exceptions.
- Most bug fixes should target the oldest supported release exhibiting the issue (git checkout -b bugfix_branch release_XX.XX).
- Serious security problems should not be fixed via pull request.

4. If your changes modify code please ensure the resulting files conform to the code conventions Google Style Guide for MongoDB, React, JavaScript, and HTML respectively.

5. Please run any existing tests that seem relevant. And if possible, also try to add new tests for the features added or bugs fixed by your pull request.

  Developers reviewing your pull request will be happy to help you add or run the relevant tests as part of the pull request review process.

6. Write a useful and properly formatted commit message. Follow these guidelines and template, in particular start your message with a short imperative sentence on a single line, possibly followed by a blank line and a more detailed explanation.

  In the detailed explanation it's good to include relevant external references (e.g. GitHub issue fixed) using full URLs, and errors or tracebacks the commit is supposed to fix. You can use the Markdown syntax for lists and code highlighting, wrapping the explanation text at 72 characters when possible.

7. Commit and push your changes to your fork.

8. Open a pull request with these changes. Your pull request message ideally should include:
- Why you made the changes (e.g. references to GitHub issues being fixed).
- A description of the implementation of the changes.
- How to test the changes, if you haven't included specific tests already.

9. The pull request should pass all the continuous integration tests which are automatically started by GitHub using e.g. Travis CI.

10. If, before your pull request is merged, conflicts arise between your branch and the target branch (because other commits were pushed to the target branch), you need to either:
- rebase your branch on top of the target branch, or
- merge the target branch into your branch.

  We recommend the first approach (i.e. rebasing) because it produces cleaner git histories, which are easier to bisect. If your branch is called feature_branch and your target branch is dev, you can rebase your branch with the following commands:

```
git checkout feature_branch
git pull
git fetch upstream
git rebase upstream/dev
```

  Once you have resolved the conflicts in all commits of your branch, you can force-push the rebased branch to update the pull request:

```
git push --force
```

## Attribution & Acknowledgements
These coding guidelines are based on the Galaxy community coding guidelines.
