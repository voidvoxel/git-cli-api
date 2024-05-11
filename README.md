# git-cli-api

Interface with the Git CLI using JavaScript.

## Installation

```sh
npm i git-cli-api
```

## Usage

### Clone a repository

#### Sync

```js
import { git } from "git-cli-api";


git.cloneSync(
    "https://github.com/voidvoxel/limited-queue.git"
);
```

#### Async

```js
import { git } from "git-cli-api";


async function main () {
    await git.clone(
        "https://github.com/voidvoxel/limited-queue.git"
    );
}


main();
```

#### Destination directory

```js
import { git } from "git-cli-api";


git.cloneSync(
    "https://github.com/voidvoxel/limited-queue.git",
    "example"
);
```

#### Current working directory

```js
import { git } from "git-cli-api";


git.cloneSync(
    "https://github.com/voidvoxel/limited-queue.git",
    "limited-queue",
    {
        cwd: "./example-dir"
    }
);
```
