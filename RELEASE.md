# Release Process

## Glade declaration types for TypeScript

This repository publishes `@owebeeone/glade-decl`. The shared declaration
contract and the Python and Rust renderings remain separate repositories;
they do not need simultaneous releases for this npm package.

Use Node 24 and pnpm 10.24.0 for release checks, matching GitHub Actions.
Gearu runs the frozen dependency install, the declaration corpus tests,
the TypeScript build, and a package-content dry run. GitHub Actions also
installs the packed tarball in an isolated consumer and checks its runtime
export and TypeScript declarations before publishing.

### Version selection

Version **0.1.0 is already published on npm**. Do not attempt to replace it.
The next patch release is **0.1.1**; the package manifest stays at 0.1.0 until
an explicitly requested release advances it.

```sh
gearu plan 0.1.1
```

Commit the setup before running `gearu release`. When operating inside a GWZ
workspace, follow the root's workspace-wide commit and push instructions.
Gearu's optional member-only push requires explicit authorization for that
publication scope; the generic examples below do not override workspace rules.

### npm trusted publisher

The saved connection for `@owebeeone/glade-decl` is:

- Provider: GitHub Actions
- Organization or user: `owebeeone`
- Repository: `glade-decl-ts`
- Workflow filename: `publish.yml`
- Environment name: empty, matching the publish job
- Allowed actions: direct publishing and staging; no separate dist-tag management

The publish job uses `id-token: write` and a current npm CLI, without an npm
publishing token. The initial package was bootstrapped locally before Gearu
was installed; subsequent registry publication belongs in this workflow.

At setup, npm marked the connection **pending validation** and required its
first successful automated publish before **2026-10-19 14:52 UTC**
(20 October at 1:52 am in Sydney). Check the current npm settings before
release; an expired connection must be recreated. A workflow run that skips
an already-published version does not perform the validating publication.

<!-- gearu:release:start -->
## Gearu Release Process

Gearu prepares and verifies the repository, creates an immutable tag, and can
create the GitHub Release that starts this repository's publication workflow.
It does not publish directly to package registries.

Full documentation: <https://owebeeone.github.io/gearu/>

### Install

Install the released tool with:

```sh
uv tool install gearu
```

Upgrade an existing installation with:

```sh
uv tool upgrade gearu
```

To test the unreleased `main` branch, install it directly from its repository:

```sh
uv tool install git+https://github.com/owebeeone/gearu.git
```

Verify the installation with `gearu --version`.

### Preconditions

- Read `gearu.toml` and this repository's release workflow.
- Choose an explicit release version or an explicit major, minor, or patch bump.
  Gearu does not infer release intent from commits.
- Use a clean checkout on the branch configured by `project.branch`.
- Synchronize configured release and source branches with their remote.
- Release required cross-repository dependencies first.
- Install and authenticate `gh` before requesting GitHub Release creation.

### Plan

Always inspect the read-only plan first:

```sh
gearu plan VERSION
```

Or ask Gearu to select the next version:

```sh
gearu plan --bump patch
gearu plan --bump minor
gearu plan --bump major
```

Gearu compares configured package versions with valid local and remote release
tags, then bumps the highest version. It reads remote tags directly and does not
fetch or create local tags while planning.

For a release candidate, use a numbered version such as `1.2.3-rc.1`.

Override a configured dependency tag only when the release intentionally uses a
different version:

```sh
gearu plan VERSION --dependency-tag DEPENDENCY=TAG
```

### Prepare the Local Release

After reviewing the plan:

```sh
gearu release VERSION
```

The release command can select the version itself:

```sh
gearu release --bump minor
```

This recalculates the next version at release time. To lock the version reviewed
in a prior bump plan, pass that plan's reported `VERSION` explicitly.

Gearu builds and tests in a temporary worktree. Only a successful candidate is
applied to the local release branch and tagged. This step does not change a
remote repository.

### Push and Create the GitHub Release

Push the exact release commit and tag atomically:

```sh
gearu release VERSION --push
```

Create the GitHub Release after that push:

```sh
gearu release VERSION --push --github-release
```

The final command starts workflows listening for `release.published`, including
package publication and documentation deployment where configured.

### Recovery

- If candidate checks fail, fix the problem and rerun; the normal checkout is
  left unchanged.
- If local preparation succeeds, rerun the same version with `--push`.
- If the push succeeds but GitHub Release creation fails, rerun with
  `--push --github-release`.
- If released contents must change, use a new patch or release-candidate version.
  Never move or replace the existing tag.
- If only a publication workflow fails, repair and rerun that workflow for the
  same GitHub Release.
<!-- gearu:release:end -->
