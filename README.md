# Tufi's — Menú & Backoffice

Aplicación web para gestionar el menú de una pastelería (categorías y productos)
con un backoffice de administración. Construida con **Laravel**, **Inertia.js**
y **React**, corriendo sobre **MySQL** vía **Laravel Sail** (Docker).

## Funcionalidades

- Menú público (`/`) con las categorías y productos activos, agrupados por
  categoría con navegación por anclas (inspirado en [flourbakery.com/menu](https://www.flourbakery.com/menu)).
- Backoffice (`/dashboard`, `/admin/...`) protegido por autenticación, con
  CRUD completo de:
    - **Categorías**: nombre, descripción, orden, visibilidad.
    - **Productos** (dentro de cada categoría): nombre, descripción, precio e
      imagen de referencia.
- Un único usuario maestro (no hay registro público), creado por el seeder.

## Requisitos

- Docker y Docker Compose.
- Node.js (para compilar los assets con Vite).

## Puesta en marcha

```bash
cp .env.example .env      # si no existe ya
composer install
php artisan key:generate  # si APP_KEY está vacío
npm install

./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate --seed
./vendor/bin/sail artisan storage:link

npm run build   # o `npm run dev` para desarrollo con hot reload
```

La app quedará disponible en `http://localhost:8080` (puerto configurable con
`APP_PORT` en `.env`).

## Usuario maestro

El seeder crea (o actualiza) un único usuario administrador usando las
variables de entorno:

```
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=password
```

Cambia estos valores en `.env` **antes** de correr el seeder en un ambiente
que no sea local.

## Estructura relevante

- `app/Models/Category.php`, `app/Models/Product.php` — modelos con relación
  1:N y slugs automáticos.
- `app/Http/Controllers/Admin/*` — CRUD de categorías y productos del
  backoffice.
- `app/Http/Controllers/MenuController.php` — menú público.
- `routes/web.php` — rutas públicas y `admin.*` (protegidas).
- `database/seeders/CategorySeeder.php` — datos de ejemplo (Tartaletas,
  Brownies, Mini Pavlovas, Trufas) tomados del menú de referencia.
- `resources/js/Pages/Menu.jsx` — página pública del menú.
- `resources/js/Pages/Admin/**` — páginas React del backoffice.

## Imágenes de productos

Las imágenes se guardan en el disco `public` (`storage/app/public/products`)
y se sirven a través del enlace simbólico `public/storage` (creado con
`sail artisan storage:link`).

En Laravel Cloud, usa Object Storage con nombre de disco `public` y configura
`PRODUCT_IMAGE_DISK=public`. Laravel Cloud reemplaza automáticamente ese disco
por el bucket adjunto. No uses `storage:link` como comando de despliegue: los
enlaces y los archivos locales no persisten entre despliegues de Laravel Cloud.

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
