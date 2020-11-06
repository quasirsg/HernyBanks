[![Moleculer](https://badgen.net/badge/Powered%20by/Moleculer/0e83cd)](https://moleculer.services)

# api

Este es un proyecto de microservicios basado en [Moleculer](https://moleculer.services/). Generado con [Moleculer CLI](https://moleculer.services/docs/0.14/moleculer-cli.html).

## Uso

Asegurarse de correr el comando `npm i moleculer-cli -g` para tener **moleculer-cli** de manera global.

Ejecutar el comando `npm run dev`. 
Luego, abre la URL http://localhost:3000/ en tu navegador (desarrolladores del back-end). 
En la página de bienvenida puedes probar los servicios generados via API Gateway.

Comandos disponibles desde la terminal:
- `nodes` - Muestra los nodos conectados.
- `actions` - Mustra la lista de acciones disponibles.
- `call greeter.hello` - Hace el llamado a la acción: `greeter.hello`.
- `call greeter.welcome -- name John` - llama la acción `greeter.welcome` con el parametro `name`.
- `call products.list` - Muestra la lista de productos (llama la acción`products.list`).


## Servicios
- **api**: servicio API Gateway
- **greeter**: Ejemplo de servicio `hello` y la acción `welcome`.
- **products**: Ejemplo de servicio con DB. Para usar con MongoDB, configura la variable entorno `MONGO_URI` e instala el adaptador para MongoDB con `npm i moleculer-db-adapter-mongo`.

## Mixins
- **db.mixin**: Database access mixin for services. Based on [moleculer-db](https://github.com/moleculerjs/moleculer-db#readme)


## Links útiles

* Moleculer website: https://moleculer.services/
* Moleculer Documentation: https://moleculer.services/docs/0.14/

## NPM scripts

- `npm run dev`: Inicia el modo de desarrollo (load all services locally with hot-reload & REPL)
- `npm run start`: Inicia el modo de producción (set `SERVICES` env variable to load certain services)
- `npm run cli`: Inicia un CLI y conecta a producción. Don't forget to set production namespace with `--ns` argument in script
- `npm run lint`: Run ESLint
- `npm run ci`: Run continuous test mode with watching
- `npm test`: Run tests & generate coverage report
- `npm run dc:up`: Start the stack with Docker Compose
- `npm run dc:down`: Stop the stack with Docker Compose
