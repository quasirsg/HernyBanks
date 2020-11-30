<p align='left'>
    <img src='https://www.manhattanmobile.com/wp-content/uploads/2018/08/react-native-workshop.jpg' </img>
</p>

# Client

Este es un proyecto de React-Native basado en [Redux](https://redux.js.org/). Generado con [Expo CLI](https://reactnative.dev/docs/environment-setup).

## Uso

Asegurarse de correr el comando `npm install -g expo-cli` para tener **expo-cli** de manera global.

Ejecutar el comando `npm start`. 
Luego, abre la URL http://localhost:3000/ en tu navegador (desarrolladores del back-end). 
En la página de bienvenida puedes probar los servicios generados via API Gateway.

Comandos disponibles desde la terminal:
- `nodes` - Muestra los nodos conectados.
- `actions` - Mustra la lista de acciones disponibles.
- `call greeter.hello` - Hace el llamado a la acción: `greeter.hello`.
- `call greeter.welcome -- name John` - llama la acción `greeter.welcome` con el parametro `name`.
- `call products.list` - Muestra la lista de productos (llama la acción`products.list`).

## Especificaciones  

- `redux` - Como librería principal para definir el DataFlow
- `axios` - Como librería principal para acceder a los métodos de la api
- `formik` - Como librería principal para el uso de los protocolos HTTP en forms
- `redux/thunk` - Para realizar operaciones asíncronas.
## Mixins
- **db.mixin**: Database access mixin for services. Based on [moleculer-db](https://github.com/moleculerjs/moleculer-db#readme)

## NPM scripts

- `npm run dev`: Inicia el modo de desarrollo (load all services locally with hot-reload & REPL)
- `npm run start`: Inicia el modo de producción (set `SERVICES` env variable to load certain services)
- `npm run cli`: Inicia un CLI y conecta a producción. Don't forget to set production namespace with `--ns` argument in script
- `npm run lint`: Run ESLint
- `npm run ci`: Run continuous test mode with watching
- `npm test`: Run tests & generate coverage report
- `npm run dc:up`: Start the stack with Docker Compose
- `npm run dc:down`: Stop the stack with Docker Compose
