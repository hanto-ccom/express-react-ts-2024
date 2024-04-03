## Pre-requisites
- node 16+
- mongoDB
  
## Structure
 - Root
   - npm install
   - npm run start:client
   - npm run start:server
   - npm run dev
   - Client
     - npm install
     - npm run dev
   - Server
     - npm install
     - npm run dev

## Client
- React Typescript
- Clients
- Services
- ErrorHandling

## Server
- Express
- Clients
- Services
- ErrorHandling

## OpenWeaterMap API-key needed in Server
create a .env file and add:
 - OPEN_WEATHER_API_KEY="your-key-here"
 - JWT_SECRET="<your secret here>"
 - JWT_REFRESH_SECRET="<your refresh secret here>"

## SSL
- Place self signed certificate .key and .cert in /server/config/ssl folder
- i.e `openssl req -nodes -new -x509 -keyout server.key -out server.cert`
- client uses vite ssl plugin (see vite config)
