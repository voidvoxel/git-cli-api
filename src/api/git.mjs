import Git from "../classes/Git.mjs";


export { default as Git } from "../classes/Git.mjs";


export const git = {};


export async function clone (
    sourceURL,
    destinationPath,
    options = {}
) {
    await Git.clone(
        sourceURL,
        destinationPath,
        options ?? {}
    );
}


export function cloneSync (
    sourceURL,
    destinationPath,
    options = {}
) {
    Git.cloneSync(
        sourceURL,
        destinationPath,
        options ?? {}
    );
}
