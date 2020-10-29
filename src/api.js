const fetch = require('node-fetch');

const api = {
    fetchAllProducts: function() {
        return fetch('http://localhost:3666/market')
                .then(response => response.json())
                .then(data => {
                    return data;
                })
                .catch(err => {
                    console.log(err);
                })
    },
    fetchMarketHistoryByEntries: function(entries) {
        return fetch('http://localhost:3666/market/history/' + entries)
                .then(response => response.json())
                .then(data => {
                    return data;
                })
                .catch(err => {
                    console.log(err);
                })
    },
    writeMarketHistory: function(body) {
        return fetch('http://localhost:3666/market/history/',{ method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' }})
                .then(response => response.json())
                .then(data => {
                    return data;
                })
                .catch(err => {
                    console.log(err);
                })
    },
    updateProductValue: function(body) {
        return fetch('http://localhost:3666/market/product/',{ method: 'PUT', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' }})
                .then(data => {
                    return data;
                })
                .catch(err => {
                    console.log(err);
                })
    }
}

module.exports = api;
