const { execSync } = require('child_process');
const os = require('os');

if (os.platform() === 'linux') {
  try {
    console.log('Detectado entorno Linux en Hostinger. Instalando @rollup/rollup-linux-x64-gnu...');
    execSync('npm install @rollup/rollup-linux-x64-gnu --no-save --no-package-lock', { stdio: 'inherit' });
    console.log('Instalación de binario Rollup Linux completada exitosamente.');
  } catch (err) {
    console.warn('Advertencia durante la instalación de binarios Linux:', err.message);
  }
} else {
  console.log('Entorno local Windows. Omitiendo instalación de binarios de Linux.');
}
