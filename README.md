
# 🛒 Ecommerce React - UTN

Proyecto final desarrollado como parte de la diplomatura Fullstack de la UTN.  
Esta aplicación representa un ecommerce funcional con manejo de productos, login y registro de usuarios, autenticación con Firebase y panel de administración.

---

## 🚀 Tecnologías utilizadas

- ⚛️ React
- 📦 Vite
- 🔁 React Router DOM
- 🔐 Firebase Auth
- 🗃️ Firebase Firestore
- 💅 CSS Nativo
- ⚙️ React Hooks (useState, useEffect, useContext)

---

## ✨ Funcionalidades actuales

- Visualización de productos en la página principal
- Vista detallada por producto (`/product/:id`)
- Login y Registro con validaciones personalizadas
- Edición y creación de productos desde el Dashboard
- Validaciones de formularios para email y contraseña
- Manejo de sesión con Firebase Auth
- Control de acceso mediante `AuthContext`
- Diseño responsive para mobile y desktop
- Navegación entre rutas con React Router

---

## 📁 Estructura general del proyecto

```bash
src/
├── components/        # Componentes reutilizables
├── context/           # Contextos como AuthContext
├── router/            # Rutas de navegación
├── views/             # Vistas: Login, Register, Dashboard, Home, etc.
├── App.jsx            # Componente principal
└── main.jsx           # Punto de entrada
```

---

## 🧪 Cómo correr el proyecto localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repo.git
```

### 2. Ingresar al directorio del proyecto

```bash
cd nombre-del-repositorio
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Configurar Firebase

Crear un archivo `.env` en la raíz del proyecto con tus credenciales de Firebase:

```
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

> 🔐 **Importante:** no subir el `.env` al repositorio.

### 5. Ejecutar el proyecto en desarrollo

```bash
npm run dev
```

> Por defecto, se abrirá en [http://localhost:5173](http://localhost:5173)

---

## 🔒 Acceso restringido

La sección del Dashboard para crear o editar productos está protegida y sólo puede accederse si el usuario está autenticado correctamente mediante `AuthContext`.

---

## 🧑‍💻 Autor

**Benjamin Basso**  
Proyecto realizado para la Diplomatura Fullstack UTN (2025)

---
