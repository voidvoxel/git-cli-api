// import { Git } from "git-cli-api";
import { git } from "../src/index.mjs";


async function main () {
    // Clone the repository.
    await git.clone(
        "https://github.com/voidvoxel/limited-queue",
        "tmp"
    );
}


main();
