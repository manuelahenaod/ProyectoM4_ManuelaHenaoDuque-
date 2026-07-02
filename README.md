<div align="center">

# MateCode — Todo App

**Aplicación web para la gestión de tareas personales**, desarrollada con React y TypeScript. Permite autenticarse con Google, administrar tareas mediante operaciones CRUD, organizarlas por prioridad y fecha límite, visualizarlas en un calendario, y enviar un resumen por correo electrónico a través de AWS SES.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![AWS SES](https://img.shields.io/badge/AWS-SES-FF9900?logo=amazonaws&logoColor=white)](https://aws.amazon.com/ses/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![Vitest](https://img.shields.io/badge/Tested%20with-Vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev/)

**[Ver Demo en Vivo](https://proyecto-m4-manuela-henao-duque.vercel.app/)**

### URL de producción
https://proyecto-m4-manuela-henao-duque.vercel.app/

</div>

---

## Tabla de contenidos

- [Características](#características)
- [Arquitectura del proyecto](#arquitectura-del-proyecto)
- [Decisiones arquitectónicas](#decisiones-arquitectónicas)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Variables de entorno](#variables-de-entorno)
- [Flujo de envío de emails](#flujo-de-envío-de-emails)
- [Testing](#testing)
- [Inspiración del diseño](#inspiración-del-diseño)
- [Uso de Inteligencia Artificial](#uso-de-inteligencia-artificial)
- [Autora](#autora)

---

## Características

- Autenticación con Google mediante Firebase Authentication
- Persistencia de sesión
- CRUD completo de tareas
- Visualización de tareas en un calendario
- Clasificación por prioridad (Baja, Media, Alta)
- Envío de resumen de tareas al correo electrónico mediante AWS SES
- Notificaciones mediante Toasts
- Estados de carga durante operaciones asíncronas
- Diseño Responsive (Mobile First)
- Pruebas unitarias con Vitest

---

## Arquitectura del proyecto

```text
ProyectoM4
├── api/                  # Serverless Function para envío de correos
├── public/               # Recursos estáticos
├── src/
│   ├── components/       # Componentes reutilizables
│   ├── context/          # Contexto global
│   ├── features/         # Módulos organizados por funcionalidad
│   ├── hooks/            # Hooks personalizados
│   ├── pages/            # Páginas de la aplicación
│   ├── routes/           # Definición y configuración de rutas
│   ├── services/         # Configuración de Firebase 
│   ├── styles/           # Archivos CSS
│   ├── types/            # Interfaces y tipos
│   ├── utils/            # Funciones utilitarias
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── tests/                # Configuración de pruebas
├── .env.example
├── .oxlintrc.json
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
└── vite.config.ts
```

---

## Decisiones arquitectónicas

### Componentes reutilizables

La interfaz fue construida mediante componentes independientes para facilitar el mantenimiento y promover la reutilización de código:

Cada componente tiene una única responsabilidad, permitiendo mantener una arquitectura modular y escalable.

### Separación de responsabilidades

La lógica de negocio se desacopló de la interfaz mediante una capa de servicios y utilidades:

- **`services/`** → configuración de Firebase 
- **`utils/`** → funciones reutilizables como manejo de fechas y transformación de texto.
- **`types/`** → definición de interfaces para mantener un tipado consistente.

Esta organización facilita la lectura del código y reduce la duplicación de lógica.

### Serverless Functions

El envío de correos se implementó mediante una **Serverless Function de Vercel**, evitando exponer las credenciales de AWS en el cliente. La función recibe la información desde React, genera el template HTML y utiliza AWS SES para enviar el correo.

### Mobile First

El diseño fue desarrollado siguiendo un enfoque **Mobile First**, utilizando Flexbox y CSS moderno para adaptar la interfaz a diferentes tamaños de pantalla.

---

## Tecnologías utilizadas

| Categoría | Tecnología |
|---|---|
| **Frontend** | React · TypeScript · Vite · CSS |
| **Backend** | Vercel Serverless Functions |
| **Base de datos** | Firebase Firestore |
| **Autenticación** | Firebase Authentication |
| **Servicios** | AWS SES |
| **Testing** | Vitest |
| **Deploy** | Vercel |

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/manuelahenaod/ProyectoM4_ManuelaHenaoDuque.git

# 2. Ingresar al proyecto
cd ProyectoM4

# 3. Instalar dependencias
npm install

# 4. Ejecutar el proyecto en modo desarrollo
npm run dev

# 5. Generar build de producción
npm run build

# 6. Ejecutar pruebas
npm test
```

---

## Variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Firebase
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_APP_ID=

# AWS SES
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
SES_FROM_EMAIL=
```

> Las variables que comienzan con `VITE_` son utilizadas por el cliente. Las credenciales de AWS son utilizadas únicamente por la Serverless Function desplegada en Vercel.

---

## Flujo de envío de emails

```text
Usuario
   │
   ▼
Botón "Enviar resumen"
   │
   ▼
React
   │
   ▼
POST /api/send-email
   │
   ▼
Serverless Function (Vercel)
   │
   ▼
Generación del template HTML
   │
   ▼
AWS SES
   │
   ▼
Correo recibido por el usuario
```

**Proceso:**

1. El usuario presiona **Enviar resumen**.
2. React recopila las tareas del usuario.
3. Se realiza una petición `POST` hacia `/api/send-email`.
4. La Serverless Function valida la información recibida.
5. Se genera dinámicamente el template HTML del correo.
6. AWS SES envía el correo al destinatario.
7. El usuario recibe un resumen actualizado de sus tareas.

### Vista previa del correo

![Vista previa del correo](/img/email-template.png)

---

## Testing

Se implementaron pruebas unitarias y de componentes utilizando **Vitest**, junto con **React Testing Library** para los componentes. Las pruebas se organizan dentro de la carpeta `tests/`:
 
| Archivo | Descripción |
|---|---|
| `date.test.ts` | Validación de funciones utilitarias para el manejo y formateo de fechas. |
| `handleError.test.ts` | Pruebas sobre el manejo centralizado de errores de la aplicación. |
| `text.test.ts` | Validación de funciones de transformación de texto, como la capitalización automática de títulos. |
| `TaskForm.test.tsx` | Pruebas del formulario de tareas: renderizado, validaciones e interacción del usuario. |
| `TaskList.test.tsx` | Pruebas del listado de tareas: renderizado condicional y comportamiento según el estado. |
| `setup.ts` | Configuración global del entorno de pruebas. |
 
Estas pruebas permiten verificar el correcto funcionamiento de las funciones utilitarias y de los componentes principales, facilitando la detección temprana de errores ante futuros cambios.
 
---

## Inspiración del diseño

La interfaz fue desarrollada tomando como referencia recursos de la comunidad, adaptando el diseño a una identidad visual propia para **MateCode**:

- [Login animado de Florin Pop](https://codepen.io/FlorinPop17/pen/vPKWjd)
- [Colección de dashboards CSS](https://freefrontend.com/css-dashboards/)

Estas referencias sirvieron como inspiración visual. Toda la implementación fue desarrollada utilizando React, TypeScript y CSS.

---

## Uso de Inteligencia Artificial

La Inteligencia Artificial fue utilizada como una herramienta de apoyo durante el desarrollo del proyecto, principalmente para acelerar la resolución de dudas técnicas, validar enfoques de implementación y mejorar la calidad del código.

### ¿En qué situaciones fue más efectiva?

- Explicación de conceptos de React y TypeScript.
- Resolución de errores durante el despliegue en Vercel.
- Comprensión del funcionamiento de AWS SES y Serverless Functions.
- Refactorización de componentes para mejorar la organización del código.
- Generación de pruebas unitarias.
- Optimización de estilos CSS responsive.
- Revisión de buenas prácticas de Git y Conventional Commits.

### Patrones de uso

| Patrón | Descripción |
|---|---|
| **Pedir pasos** | Cuando surgían errores complejos, se solicitaban explicaciones paso a paso para comprender el origen del problema antes de modificar el código. |
| **Solicitar ejemplos mínimos** | Para incorporar nuevas funcionalidades se trabajó inicialmente con ejemplos pequeños, facilitando su comprensión antes de adaptarlos al proyecto. |
| **Comparar con la documentación oficial** | Las respuestas obtenidas fueron contrastadas con la documentación oficial de React, Firebase, AWS y Vercel antes de integrarlas definitivamente. |
| **Escribir pruebas para validar** | La IA también se utilizó para proponer casos de prueba sobre funciones utilitarias, validando posteriormente los resultados mediante Vitest. |

### Reflexión

El uso de IA permitió acelerar tareas repetitivas y resolver bloqueos técnicos con mayor rapidez. Sin embargo, cada sugerencia fue revisada, adaptada y comprendida antes de integrarse al proyecto.

Este enfoque permitió utilizar la IA como una herramienta de apoyo y aprendizaje, manteniendo el control sobre las decisiones técnicas y favoreciendo una mejor comprensión del funcionamiento de la aplicación.

---

## Autora

**Manuela Henao Duque**

Proyecto desarrollado como entrega final del Modulo 4 del Bootcamp de Desarrollo Full Stack — Henry.