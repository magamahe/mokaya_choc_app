<p align="center">
  <img src="./client/public/readme.png" alt="MOKAYA Banner" width="100%">
</p>
# Mokaya -- Full Stack E-commerce

**Mokaya** es una plataforma de e-commerce de chocolates de autor,
desarrollada con enfoque en **experiencia de usuario, seguridad y
escalabilidad**.

El proyecto integra un **frontend en React** y un **backend en Node.js +
Express + MongoDB**, formando una aplicación full stack lista para
producción.

------------------------------------------------------------------------

## Demo

> 🔗 https://mokaya-choc-app.onrender.com

------------------------------------------------------------------------

##  Arquitectura del sistema

Frontend (React + Vite) ↓ Backend (Node.js + Express) ↓ MongoDB Atlas

------------------------------------------------------------------------

##  Tecnologías

### Frontend

-   React
-   Vite
-   Tailwind CSS
-   Material UI
-   React Router
-   Axios
-   Framer Motion

### Backend

-   Node.js
-   Express
-   MongoDB + Mongoose
-   JWT (autenticación)
-   BcryptJS (seguridad)
-   CORS
-   Dotenv
-   Express Rate Limit

------------------------------------------------------------------------

##  Autenticación y seguridad

-   Registro e inicio de sesión de usuarios
-   Contraseñas encriptadas con Bcrypt
-   Autenticación con JWT
-   Middleware de protección de rutas
-   Control de acceso por roles

### Roles

-   Client → navegación, compras y pedidos
-   Admin → gestión total del sistema

------------------------------------------------------------------------

## Funcionalidades principales

### Productos

-   CRUD completo
-   Organización por categorías
-   Control de stock en tiempo real

### Pedidos

-   Validación de productos
-   Verificación de stock
-   Descuento automático de inventario
-   Cálculo dinámico del total

------------------------------------------------------------------------

## Lógica de negocio

-   Prevención de compras inválidas
-   Consistencia de datos en stock
-   Validaciones antes de procesar pedidos

------------------------------------------------------------------------

## Backend estructura

```bash
src/ 
├── config/ 
├── controllers/ 
├── middlewares/ 
├── models/ 
├── routes/ 
└── app.js
```

------------------------------------------------------------------------

## Frontend funcionalidades

-   Navbar dinámico según usuario
-   Catálogo de productos
-   Login / Register
-   Panel admin
-   Carrito de compras
-   Modo claro/oscuro
-   Diseño responsive
-   Animaciones

------------------------------------------------------------------------

## Conexión frontend-backend

const res = await axios.get("/api/products");

------------------------------------------------------------------------

## Instalación

### Backend

cd backend npm install npm run dev

.env: PORT=3000 MONGO_URI=tu_uri JWT_SECRET=tu_secreto

### Frontend

cd frontend npm install npm run dev

------------------------------------------------------------------------

## Deploy

npm run build npm start

------------------------------------------------------------------------

## Autor

María Gabriela Martínez H. Data Analyst & Full Stack Developer

------------------------------------------------------------------------
Proyecto desarrollado como trabajo final de la cátedra **Back-End en ADA**

<p align="center">
  <img src="src/assets/images/readme/adalogo.png" width="80"/>
</p>