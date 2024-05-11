import { execSync } from "child_process";
import { git } from "../src/index.mjs";
import { getAbsolutePath, isDirectorySync } from "pathify";
import { rmSync, rmdirSync } from "fs";


function cleanupDirectory (directory) {
    rmSync(
        directory,
        {
            force: true,
            recursive: true
        }
    );
}


function cleanup () {
    cleanupDirectory("tmp");
}


afterAll(cleanup);


test(
    "clone a repository",
    () => {
        // Clone the repository.
        git.cloneSync(
            "https://github.com/voidvoxel/xor",
            "tmp/xor",
        );

        const cwd = getAbsolutePath(
            ".",
            "tmp",
            "xor"
        );

        expect(
            isDirectorySync(cwd)
        ).toBe(
            true
        );
    }
);


test(
    "clone an NPM package",
    () => {
        // Clone the repository.
        git.cloneSync(
            "https://github.com/voidvoxel/limited-queue",
            "tmp/limited-queue",
        );

        const cwd = getAbsolutePath(
            ".",
            "tmp",
            "limited-queue"
        );

        // Install the package.
        execSync(
            "npm i",
            {
                cwd
            }
        );

        // Test the package.
        execSync(
            "npm test",
            {
                cwd,
                stdio: 'ignore'
            }
        );

        expect(
            isDirectorySync(cwd)
        ).toBe(
            true
        );
    }
);
