import { exec } from "child_process";

const TAG_NAME = 'v1.0.6';

function getTags()
{
    exec('git tag -l -n9', (err, res, str) => {
        console.log(res);
    })
}

function test() {
    
    exec(`git for-each-ref --count 1 --format="%(contents)" "refs/tags/${TAG_NAME}"`, (err, message, stderr) => {
        message = message.trim();
    
        if (err) {
            process.exit(1);
        }

        console.log('------------0000--------------')
        console.log(message)
        console.log('--------------------------')
    });
}

getTags();

test();