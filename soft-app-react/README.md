src/
│
├── assets/ # Archivos estáticos (imágenes, íconos, etc.)
├── components/ # Componentes reutilizables
│ ├── ProductCard.jsx # Componente para renderizar cada producto
│ └── ContactForm.jsx # Componente para el formulario de contacto
├── pages/ # Páginas principales de la aplicación
│ ├── Home.jsx # Página de inicio donde se listan los productos
│ └── AdminProducts.jsx # Página de administración de productos
├── services/ # Servicios para conectar con APIs
│ └── formSubmit.js # Lógica para integrar el formulario con Formsubmit
│ └── products.js # Lógica para gestionar los productos (CRUD)
├── context/ # Estado global con context API (opcional)
│ └── ProductsContext.jsx # Contexto para manejar el estado de los productos
├── App.jsx # Componente principal que define las rutas
├── main.jsx # Punto de entrada de la aplicación
└── styles/ # Archivos CSS o SCSS
└── main.css # Estilos globales
