# demo-code
Node version: 8.10.0

# Start Up
```sh
$ cd demo-code
$ yarn
$ npm run start
```

### Tech
* express
* mongoDB
* mongoose
* axios - to request the clients page.
* cheerio - to crawl the webpag and get the required data.

# Note
make put request to "localhost:3000/clients/generateData" to run the crawler and generate the data.


# Architecture

The project follows layered architecture.
 - Controller layer: Is the one which is exposed to the outside world.
 - Service Layer: Is the one which holds the business logic of the application.
 - Data Layer: Is the one which directly interacting with databse.
 
 Advantage: 
  - If we want to change the database or the datbase library, all that needs to be changed is data layer as all the databse   related code is contained in Data Layer.
 - If we want to change from REST to GraphQl all that needs to changes is Controller Layer as all the code which exposed endpoints to the outer world is contained in Controller Layer.
