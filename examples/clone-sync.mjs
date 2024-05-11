// import { Git } from "git-cli-api";
import { git } from "../src/index.mjs";


// Clone the repository.
git.cloneSync(
    "https://github.com/voidvoxel/limited-queue",
    "tmp"
);
