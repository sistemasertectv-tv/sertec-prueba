# Cómo abrir SERTEC versión 3

1. Descomprimir en una carpeta nueva. No copiar node_modules desde la versión anterior.
2. Abrir la terminal en sertec-web-master.
3. Ejecutar `npm install --include=optional`.
4. Ejecutar `npm run check` para revisar TypeScript y `npm run build` para comprobar la compilación.
5. Ejecutar `npm run dev` y abrir la dirección indicada (puerto configurado: 3000).
6. Para revisar la compilación: `npm run preview`.

No abrir index.html con doble clic: requiere Vite/React. Para publicar, subir el contenido de dist después de una compilación exitosa. El .htaccess incluido resuelve las rutas de la SPA en Apache.

Si reutiliza una carpeta de Windows con dependencias antiguas, en CMD:
```
rmdir /s /q node_modules
npm install --include=optional
npm run dev
```
Si npm mantiene el error de binarios opcionales, elimine también package-lock.json y reinstale (esto puede actualizar las versiones permitidas).

Revisión antes de publicar: Inicio, Servicios, Proyectos, Blog, Contacto y Acerca de; ancho de 375, 768, 1024 y 1440 px; menú móvil; todos los botones; enviar cotización real y comprobar Supabase y notificación de correo; probar galerías, videos y administración. Consulte CAMBIOS-V3.md para límites y riesgos pendientes.
