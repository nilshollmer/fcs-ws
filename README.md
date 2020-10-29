# Websocket for Fantasy Currency Service
Simulates value movement in currencies. Fetches data from [fcs-api](https://github.com/nilshollmer/fcs-api)

## Install
Run `npm install` to install dependencies.

## Usage
Run `npm start`

## Routes

/stopSocket:  
Clear timeouts on server. Use before reseting values of currencies

/resetValues:  
Resets values for currencies

/startSocket:
Restarts timouts on server.
