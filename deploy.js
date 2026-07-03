const ftp = require("basic-ftp");

async function deploy() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        console.log("Connecting to FTP server...");
        await client.access({
            host: "ftpupload.net",
            user: "if0_42298492",
            password: "62EBKEshMJYy",
            secure: false
        });
        
        console.log("Checking directory structure...");
        const list = await client.list();
        let targetDir = "/";
        
        // InfinityFree often uses htdocs for web root
        if (list.find(item => item.name === 'htdocs' && item.isDirectory)) {
            targetDir = "/htdocs";
        }
        
        console.log(`Uploading web-build directory to ${targetDir}...`);
        await client.ensureDir(targetDir);
        await client.clearWorkingDir();
        await client.uploadFromDir("web-build");
        
        console.log("Deployment completed successfully!");
    }
    catch(err) {
        console.error("Deployment failed:", err);
    }
    client.close();
}

deploy();
