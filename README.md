##Pre-requisites
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

### OpenWeaterMap API-key needed in Server
create a .env file and add:
OPEN_WEATHER_API_KEY="your-key-here"
JWT_SECRET="<your secret here>"
JWT_REFRESH_SECRET="<your refresh secret here>"
