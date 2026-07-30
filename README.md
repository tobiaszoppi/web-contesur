# Web estática Contesur

Landing profesional para Contesur, pensada para reemplazar WordPress con una web 100% estática: HTML, CSS y JavaScript vanilla. No usa PHP, base de datos, panel de administración ni dependencias externas.

## Archivos generados

- `index.html`: página principal con SEO local, Open Graph y datos estructurados JSON-LD.
- `404.html`: página estática para errores 404.
- `assets/css/styles.css`: estilos responsive, mobile-first y optimizados para carga directa.
- `assets/js/main.js`: menú mobile, header con estado de scroll y año automático del footer.
- `assets/img/contenedor-obra-bahia-blanca.webp`: imagen hero optimizada para carga rápida.
- `assets/img/contenedor-obra-bahia-blanca.png`: fallback PNG de la imagen hero. Reemplazar por foto real si está disponible.
- `favicon.ico`: ícono básico del sitio.
- `robots.txt`: permisos para buscadores y referencia al sitemap.
- `sitemap.xml`: sitemap básico de la página principal.
- `.htaccess`: HTTPS, bloqueo de listado de directorios, headers de seguridad, caché de assets y 404.

## Datos cargados

La web ya tiene cargados estos datos reales:

- Teléfono fijo: `0291 454-4344`.
- WhatsApp informativo: `291 648-7992`.
- Email: `administracion@contesursa.com.ar`.
- Dirección: `Avenida General Daniel Cerri 733, Bahía Blanca, Buenos Aires`.
- Horarios: lunes a viernes de 8 a 17 hs; sábados de 9 a 12 hs; domingos cerrado.

## Datos que todavía tenés que reemplazar antes de subir

Buscar y reemplazar estos placeholders en todos los archivos:

- `REEMPLAZAR_DOMINIO`: dominio final, sin `https://`. Ejemplo: `contesur.com.ar`.

La web ya deja cargada la cobertura principal como Bahía Blanca en su totalidad. Monte Hermoso y otras localidades cercanas figuran sólo como opciones puntuales bajo consulta.

## Cómo reemplazar imágenes

La imagen principal está en:

`assets/img/contenedor-obra-bahia-blanca.webp`

También queda un fallback en:

`assets/img/contenedor-obra-bahia-blanca.png`

Para usar una foto real, subirla a `assets/img/` y actualizar las referencias en:

- `index.html`
- meta `og:image`
- JSON-LD `image`

Si reemplazás la foto, conviene subir una versión `.webp` y dejar un PNG/JPG de respaldo. Mantené una imagen amplia, horizontal y clara, idealmente de un contenedor real de Contesur en obra o calle.

## Cómo subir a cPanel

1. Editar los placeholders.
2. Entrar a cPanel.
3. Abrir el Administrador de archivos.
4. Ir a `public_html`.
5. Subir el contenido completo de esta carpeta, no la carpeta contenedora.
6. Verificar que `index.html`, `.htaccess`, `robots.txt`, `sitemap.xml`, `404.html` y `assets/` queden directamente dentro de `public_html`.
7. Abrir el dominio en el navegador y probar los botones de teléfono, WhatsApp informativo y email.

## Seguridad

Esta web no incluye WordPress, PHP, base de datos, formularios de servidor ni endpoints. Eso reduce mucho la superficie de ataque frente al sitio anterior. El archivo `.htaccess` agrega medidas básicas para hosting Apache/cPanel, pero conviene mantener el hosting actualizado y usar contraseñas fuertes para el acceso a cPanel y FTP.

## Nota de SEO

El contenido ya está orientado a búsquedas locales como `contenedores en Bahía Blanca`, `volquetes en Bahía Blanca`, `alquiler de contenedores`, `contenedores para obra` y `retiro de escombros`, sin abusar de palabras clave. Después de publicar, actualizar `REEMPLAZAR_DOMINIO` en `index.html`, `robots.txt` y `sitemap.xml`.
