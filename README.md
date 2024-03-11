# Simple sistema de autenticación

### Idea detras de la creación
Tener una base simple para luego usarlo para inicio de otros proyectos, y trabajar partiendo de este, ahorrando tiempo.

### Tecnologias usadas
- [Node.js](https://nodejs.org/en)
- [Express](http://expressjs.com/)
- [jsonwebtoken](https://jwt.io/)
- [Sequelize](https://sequelize.org/)
- Base de datos  
Dependiendo de la base de datos que se quiera usar, es necesario descargar el paquete necesario para que funcione la conexión. Luego, se crea un archivo .env (variables de entorno), donde se pueden cargar los datos necesarios para hacer la conexión.  
  ```sh
  DB_DIALECT=mysql # 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle'
  # DB_STORAGE=db.sqlite3 En caso de que sea una base de datos SQLite
  DB_HOST=localhost
  DB_PORT=3306
  DB_USER=root
  DB_PASSWORD=
  DB_NAME=test
  ```
Se puede usar el archivo `.env-example` creado, renombrarlo a `.env` y usarlo para configurar.
