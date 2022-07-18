// Get the enviroment variables.
require("dotenv").config({ path: ".env" });

// Import the SFPT package.
let Client = require("ssh2-sftp-client");
let sftp = new Client();

// Set the public_html folder as a variable to use later.
const pubDir = "/www/wwwroot/smallmain.com/";

async function run() {
    try {
        await sftp.connect({
            host: process.env.SFTP_HOST,
            port: 22,
            username: process.env.SFTP_USERNAME,
            password: process.env.SFTP_PASSWORD,
            strictVendor: false,
        });

        // Get all pre-existing files/folders into a variable.
        const allFilesAndDirs = await sftp.list(pubDir);

        // Loop through and delete everything apart from .htaccess and the /WP directory.
        //
        // This example could delete the /Gatsby folder with one command,
        // but this code can be edited to allow Gatsby to be uploaded directly
        // to the public_html folder if needed.
        for (const item of allFilesAndDirs) {
            // Item is a file.
            if (item.type === "-") {
                if (item.name === ".htaccess") {
                    // Ignore this file.
                } else {
                    // Delete the file
                    await sftp.delete(`${pubDir}${item.name}`);
                    console.log(`Deleted file: ${item.name}`);
                }
            }

            // Item is a folder
            if (item.type === "d") {
                await sftp.rmdir(`${pubDir}${item.name}`, true);
                console.log(`Deleted dir: ${item.name}`);
            }
        }

        console.log("Begin Gatsby upload");

        // Now upload new Gatsby files.
        await sftp.uploadDir(__dirname + "/public", `${pubDir}`);

        console.log("Deployment Complete");

        sftp.end();
    } catch (error) {
        console.log("Deployment Error");
        console.log(error);

        sftp.end();
    }

}

run();
