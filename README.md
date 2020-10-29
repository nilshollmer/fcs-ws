# Websocket for Fantasy Currency Service
Simulates value movement in currencies. Fetches data from [fcs-api](https://github.com/nilshollmer/fcs-api)

Jag skrev en websocket som hämtar data mitt [API](https://github.com/nilshollmer/fcs-api) med hjälp av node-fetch.
När servern startar hämtar den värdet på datan och simulerar varje sekund värdeökning eller värdesänkning
baserat på en godtycklig algoritm. Varannan sekund skriver den över värdet av produkterna i mitt [API](https://github.com/nilshollmer/fcs-api) och
sparar värdet tillsammans med tid och datum i [databasen](https://github.com/nilshollmer/fcs-api).  
Jag använder socket.io för att implementera en websocket som skickar ut 'init' och de senaste 20 sparade prishistoriken när någon besöker [hemsidan](https://fantasycurrencyservice.nilshollmer.me), samt 'valueupdate' varje sekund med nya prisskillnader.

Jag upplever att tekniken fungerar bra, men känner inte riktigt att jag använder den på rätt sätt. Jag har fått många felmeddelanden som varit svårtydda och har behövt skriva om koden till den styggelse den är nu.

## Install
Run `npm install` to install dependencies.

## Usage
Run `npm start`

## Routes

/resetValues:  
Clear timeouts on server.
Resets values for currencies.
Restarts timouts on server.
