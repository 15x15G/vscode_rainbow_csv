/* global suite, test */

// This test uses Mocha test framework

// Example command to run from terminal (works in WSL too): code --extensionDevelopmentPath="C:\wsl_share\vscode_rainbow_csv" --extensionTestsPath="C:\wsl_share\vscode_rainbow_csv\test" --wait

const assert = require('assert');
const path = require('path');
const fs = require('fs');

const vscode = require('vscode');
const rainbow_csv = require('../extension');

const log_file_path = path.join(__dirname, 'rainbow_csv.test.log');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function log_message(msg) {
    fs.appendFileSync(log_file_path, msg + '\n');
}


// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", function() {

    // Defines a Mocha unit test
    test("Something 1", async () => {
        try {
            fs.unlinkSync(log_file_path);
        } catch (e) {
            if (String(e).indexOf('no such file') == -1)
                throw e;
        }
        try {
            log_message('Starting tests');
            assert.equal(-1, [1, 2, 3].indexOf(0));
            const uri = vscode.Uri.file(path.join(__dirname, 'csv_files', 'university_ranking.csv'));
            const document = await vscode.workspace.openTextDocument(uri);
            const editor = await vscode.window.showTextDocument(document);
            await sleep(1000);
            log_message('Finishing tests');
        } catch (e) {
            log_message('Error: tests have failed. Exception:');
            log_message(String(e));
        }
    });
});
