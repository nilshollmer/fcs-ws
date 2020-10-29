const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const fetch = require('node-fetch');
const api = require('./src/api.js');
const currency = require('./src/currency.js');

const port = 3555;

let latest_values = [];
let value_movement;
let value_update;
let save_values;

io.origins(['https://fantasycurrencyservice.nilshollmer.me:443']);

app.get('/', (req, res) => {
    res.send("<h1>Socket server</h1>");
});

app.get('/stopSocket', (req, res) => {
    clearTimeout(value_movement);
    clearTimeout(save_values);
    res.send("<h1>Stopping socket... </h1>");
});

app.get('/resetValues', async (req, res) => {
    latest_values = [
        { product: 'bells', sell_value: 20 },
        { product: 'pokedollar', sell_value: 16 },
        { product: 'rupees', sell_value: 18 },
        { product: 'rings', sell_value: 19 }
    ];
    res.send("<h1>Resetting values... </h1>");
});

app.get('/startSocket', async (req, res) => {
    console.log(latest_values);
    latest_values = await currency.initializeValues();
    valueMovement();
    saveProductValues();
    res.send("<h1>Starting socket... </h1>");
});

io.on('connection', socket => {
    console.log("User connected");
    initializeHistory(socket);
    currencyValueUpdate(socket);
    saveProductValues();

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

})


async function currencyValueUpdate(socket) {
    let currentDateAndTime = await getCurrentDateAndTime();
    let values_dict = await currency.array2dict(latest_values);

    let output = Object.assign(currentDateAndTime, values_dict);
    socket.emit('valueupdate', output);
    value_update = setTimeout(() => {
        currencyValueUpdate(socket);
    }, 1000);
}

function valueMovement() {
    latest_values = currency.simulateValueMovement(latest_values);
    value_movement = setTimeout(() => {
        valueMovement();
    }, 1000);
}

async function saveProductValues() {
    let currentDateAndTime = await getCurrentDateAndTime();
    let values_dict = await currency.array2dict(latest_values);
    let output = Object.assign(currentDateAndTime, values_dict);
    await currency.updateProductValues(latest_values);
    api.writeMarketHistory(output);
    save_values = setTimeout(() => {
        saveProductValues();
    }, 2000);
}

function getCurrentDateAndTime() {
    let [month, day, year]    = ( new Date() ).toLocaleDateString().split("/")
    let [hour, minute, second] = ( new Date() ).toLocaleTimeString().split(/:| /)
    return { dateof: year + "-" + month + "-" + day, timeof: hour+ ":" + minute + ":" + second };
}

async function initializeHistory(socket) {
    let history = await api.fetchMarketHistoryByEntries(20);
    socket.emit('init', history);
}

server.listen(port, async () => {
    latest_values = await currency.initializeValues();
    valueMovement();
    console.log('Server listening to port', port)
})
