const fs = require('fs');
const path = require('path');

const url = 'https://srv1778-files.hstgr.io/rest/72f1305e5d0bc087/api/tus/public_html';
const authKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJsb2NhbGUiOiJlbl9VUyIsInZpZXdNb2RlIjoibGlzdCIsInNpbmdsZUNsaWNrIjpmYWxzZSwicmVkaXJlY3RBZnRlckNvcHlNb3ZlIjpmYWxzZSwicGVybSI6eyJhZG1pbiI6ZmFsc2UsImV4ZWN1dGUiOmZhbHNlLCJjcmVhdGUiOnRydWUsInJlbmFtZSI6dHJ1ZSwibW9kaWZ5Ijp0cnVlLCJkZWxldGUiOnRydWUsInNoYXJlIjpmYWxzZSwiZG93bmxvYWQiOnRydWV9LCJjb21tYW5kcyI6W10sImxvY2tQYXNzd29yZCI6dHJ1ZSwiaGlkZURvdGZpbGVzIjpmYWxzZSwiZGF0ZUZvcm1hdCI6ZmFsc2UsInVzZXJuYW1lIjoidTkzNDQ4NDI3NCIsImFjZUVkaXRvclRoZW1lIjoiIn0sImlzcyI6IkZpbGUgQnJvd3NlciIsImV4cCI6MTc5MDU2MzU4MCwiaWF0IjoxNzkwNTQxOTgwfQ.vD6BlkfQRioA8R8P9bCHF7PMihwTgIwwnGPfDm87NKw';
const restAuthKey = 'abf6ca1eb7fedcc76cff339e551c88355c3fa3e94dd98b812cf86eea985351dd-72f1305e5d0bc087';

const distDir = path.resolve(__dirname, '../dist');

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

async function uploadFile(filePath) {
  const relativePath = path.relative(distDir, filePath).replace(/\\/g, '/');
  const fileContent = fs.readFileSync(filePath);
  const size = fileContent.length;

  const targetUrl = `${url}/${encodeURIComponent(relativePath).replace(/%2F/g, '/')}?override=true`;

  // 1. POST creation
  const postRes = await fetch(targetUrl, {
    method: 'POST',
    headers: {
      'X-Auth': authKey,
      'X-Auth-Rest': restAuthKey,
      'Tus-Resumable': '1.0.0',
      'Upload-Length': String(size),
      'Upload-Offset': '0'
    }
  });

  if (postRes.status !== 201) {
    const errText = await postRes.text();
    throw new Error(`Failed to initialize upload for ${relativePath} (Status ${postRes.status}): ${errText}`);
  }

  // 2. PATCH upload
  const patchRes = await fetch(targetUrl, {
    method: 'PATCH',
    headers: {
      'X-Auth': authKey,
      'X-Auth-Rest': restAuthKey,
      'Tus-Resumable': '1.0.0',
      'Content-Type': 'application/offset+octet-stream',
      'Upload-Offset': '0'
    },
    body: fileContent
  });

  if (patchRes.status !== 204) {
    const errText = await patchRes.text();
    throw new Error(`Failed to upload ${relativePath} (Status ${patchRes.status}): ${errText}`);
  }

  console.log(`✓ [${(size / 1024).toFixed(1)} KB] ${relativePath}`);
}

async function main() {
  console.log('🚀 Iniciando despliegue de archivos hacia Hostinger (sertectv.com)...');
  const files = getAllFiles(distDir);
  console.log(`Total de archivos a subir: ${files.length}\n`);

  let successCount = 0;
  for (const file of files) {
    try {
      await uploadFile(file);
      successCount++;
    } catch (err) {
      console.error(`✗ Error subiendo ${file}:`, err.message);
      // Reintentar una vez
      try {
        console.log(`  Reintentando subida de ${file}...`);
        await uploadFile(file);
        successCount++;
      } catch (retryErr) {
        console.error(`  ✗ Fallo definitivo para ${file}:`, retryErr.message);
      }
    }
  }

  console.log(`\n🎉 Despliegue completado: ${successCount}/${files.length} archivos subidos con éxito.`);
}

main();
