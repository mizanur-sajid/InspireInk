const ftp = require("basic-ftp")

async function deploy() {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        console.log("Connecting to FTP...")
        await client.access({
            host: "ftpupload.net",
            user: "if0_42298492",
            password: "62EBKEshMJYy",
            secure: false
        })
        console.log("Connected!")
        
        console.log("Navigating to htdocs...")
        await client.cd("htdocs")
        
        console.log("Clearing htdocs directory...")
        await client.clearWorkingDir()
        
        console.log("Uploading web-build directory...")
        await client.uploadFromDir("web-build")
        
        console.log("Upload complete!")
    }
    catch(err) {
        console.error("FTP Error:", err)
    }
    finally {
        client.close()
    }
}

deploy()
