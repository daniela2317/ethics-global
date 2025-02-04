Ethics Global - Sistema de Seguimiento de Denuncias

Este proyecto es una aplicación desarrollada con React para visualizar mensajes y el estado de denuncias ingresando un folio específico de una empresa en particular. La aplicación consume la API de Ethics Global para obtener y mostrar la información desde la landing page hasta los mensajes.

    Tecnologías Utilizadas

React.js

React Query (@tanstack/react-query)

JavaScript (ES6+)

CSS

Fetch API

Git y GitHub

    Características

Permite a los usuarios ingresar un folio y consultar el estado de una denuncia.

Muestra los mensajes asociados al folio ingresado.

Permite el envío de nuevos mensajes relacionados con la denuncia.

Interfaz de usuario amigable y dinámica.

    Estructura del Proyecto

📁 src/
 ├── 📁 components/       # Componentes de la aplicación
 │    ├── VisualizarMensajes.js
 │    ├── PanelMensajes.js
 │    ├── SendMessageForm.js
 ├── 📁 utils/            # Funciones auxiliares
 │    ├── apiCalls.js     # Llamadas a la API
 ├── 📁 styles/           # Estilos CSS
 ├── App.js              # Componente principal
 ├── index.js            # Punto de entrada de React

    Instalación y Uso

1. Clonar el repositorio

git clone https://github.com/tu-usuario/ethics-global-example.git
cd ethics-global-example

2. Instalar dependencias

yarn install
# o
npm install

3. Ejecutar el proyecto en desarrollo

yarn start
# o
npm start

Esto iniciará la aplicación en http://localhost:3000/.

