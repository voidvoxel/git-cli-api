import { spawn, spawnSync } from "child_process";
import { existsSync, mkdir, mkdirSync } from "fs";
import path from "path";
import { getAbsolutePath } from "pathify";


const gitErrorMessage
    = code =>
        `Command \`git\` returned with error code ${code}.`;


/**
 * Git CLI (Command Line Interface) API (Application Programming Interface).
 *
 * This class exists to allow developers ot access the `git` CLI
 * programmatically with JavaScript.
 *
 * @public
 * @since v0.1.0
 * @version 0.1.0
 */
export default class Git {
    /**
     * @type {string}
     */
    #cwd


    /**
     * Clone
     *
     * @public
     * @since v0.1.0
     * @version 1.0.0
     *
     * @param {string} sourceURL
     * @param {string} destinationPath
     * @param {*} options
     * The `Git` options.
     */
    static async clone (
        sourceURL,
        destinationPath,
        options = {}
    ) {
        await new Git(
            options ?? {}
        ).clone(
            sourceURL,
            destinationPath
        );
    }


    /**
     * Clone
     *
     * @public
     * @since v0.1.0
     * @version 1.0.0
     *
     * @param {string} sourceURL
     * @param {string} destinationPath
     * @param {*} options
     * The `Git` options.
     */
    static cloneSync (
        sourceURL,
        destinationPath,
        options = {}
    ) {
        new Git(
            options ?? {}
        ).cloneSync(
            sourceURL,
            destinationPath
        );
    }


    constructor (
        options = {}
    ) {
        const cwd = options.cwd ?? process.cwd();

        this.cd(cwd);
    }


    /**
     * Change the current working directory.
     *
     * @public
     * @since v0.1.0
     * @version 1.0.0
     *
     * @param {string} directory
     * The directory to move to.
     */
    cd (directory) {
        this.#cwd = getAbsolutePath(directory);
    }


    /**
     * Clone a repository.
     *
     * @public
     * @since v0.1.0
     * @version 1.0.0
     *
     * @param {string} sourceURL
     * The url of the repository to clone.
     * @param {*} destinationPath
     * The path to clone the repository to.
     */
    async clone (
        sourceURL,
        destinationPath
    ) {
        // Preprocess argument `sourceURL`.
        if (typeof sourceURL !== 'string') {
            sourceURL = sourceURL.toString();
        }

        // Preprocess argument `destinationPath`.
        if (typeof destinationPath !== 'string') {
            destinationPath = destinationPath.toString();
        }

        destinationPath = getAbsolutePath(destinationPath);

        // Get the parent directory of the destination path.
        const parentDirectory = path.dirname(destinationPath);

        // If the parent directory does not exist:
        if (!existsSync(parentDirectory)) {
            // Create the parent directory.
            mkdirSync(parentDirectory);
        }

        // Set the command.
        const command = "git";

        // Set the args.
        const args = [
            "clone",
            sourceURL
        ];

        // If `destinationPath` is set to a reasonable path
        if (
            destinationPath.length > 0
                && destinationPath !== this.#cwd
        ) {
            args.push(destinationPath)
        }

        // Start the `git` subprocess.
        const subprocess = spawn(
            command,
            args,
            {
                cwd: this.#cwd
            }
        );

        return new Promise(
            resolve => {
                subprocess.on(
                    "exit",
                    code => {
                        if (code) {
                            throw new Error(
                                gitErrorMessage(code)
                            );
                        }

                        resolve();
                    }
                );
            }
        );
    }


    /**
     * Clone a repository.
     *
     * @public
     * @since v0.1.0
     * @version 1.0.0
     *
     * @param {string} sourceURL
     * The url of the repository to clone.
     * @param {*} destinationPath
     * The path to clone the repository to.
     */
    cloneSync (
        sourceURL,
        destinationPath
    ) {
        // Preprocess argument `sourceURL`.
        if (typeof sourceURL !== 'string') {
            sourceURL = sourceURL.toString();
        }

        // Preprocess argument `destinationPath`.
        if (typeof destinationPath !== 'string') {
            destinationPath = destinationPath.toString();
        }

        destinationPath = getAbsolutePath(destinationPath);

        // Get the parent directory of the destination path.
        const parentDirectory = path.dirname(destinationPath);

        // If the parent directory does not exist:
        if (!existsSync(parentDirectory)) {
            // Create the parent directory.
            mkdirSync(
                parentDirectory,
                {
                    recursive: true
                }
            );
        }

        // Set the command.
        const command = "git";

        // Set the args.
        const args = [
            "clone",
            sourceURL
        ];

        // If `destinationPath` is set to a reasonable path
        if (
            destinationPath.length > 0
                && destinationPath !== this.#cwd
        ) {
            args.push(destinationPath)
        }

        // Start the `git` subprocess.
        spawnSync(
            command,
            args,
            {
                cwd: this.#cwd
            }
        );
    }
}
