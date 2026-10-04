const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();
require('dotenv').config({ path: '.env.local' });

const config = {
    user: process.env.FTP_USER || "tu-usuario-ftp",
    password: process.env.FTP_PASSWORD || "tu-password-ftp",
    host: process.env.FTP_HOST || "tu-servidor-ftp",
    port: 21,
    localRoot: __dirname + "/dist",
    remoteRoot: "/public_html/",
    include: ["*", "**/*", ".htaccess"],
    deleteRemote: false,
    forcePasv: true,
    sftp: false
};

console.log("🚀 Iniciando despliegue en Hostinger...");

ftpDeploy.deploy(config)
    .then(res => console.log("✅ ¡Despliegue completado con éxito!"))
    .catch(err => console.error("❌ Error durante el despliegue:", err));
