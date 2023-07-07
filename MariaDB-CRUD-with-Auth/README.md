# MariaDB-CRUD-with-Authentication
REST API of a small newsletter web application where the users can register and write their own news made with NodeJS and MariaDB

In order to make it run in your computer, you have to add an .env file with the following variables: 

1) MARIA_PASSWORD => password of your MariaDB database
2) MARIA_USER => user of your MariaDB database
3) DATABASE => the name of your database
4) MARIA_HOST => the host direction of your database (only if you are using a different host than the 127.0.0.1 default)
5) PORT_DATABASE => port of your database (only if you are using a different port than the 3306 default)
6) JWT_TOKEN => the JWT secret for the authentication

Once you have this environment variables in the main folder, you have to enter the "NPM install" command in the terminal to install all the dependencies, then you can enter the "NPM start" command in order to run this app. 

In the http folder you can find all the routes that this app has with examples of how the data should be send. 
