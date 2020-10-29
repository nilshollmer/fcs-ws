const api = require('./api.js');

let currency = {
    randomAroundZero: function () {
        return Math.random() > 0.5 ? 1 : -1;
    },
    randomizeValue: function (value) {
        let rate = 1.001;
        let variance = 0.7;
        let new_value = value * rate + variance * this.randomAroundZero();
        if (new_value < 0 ) {
            new_value += 1
        }
        return new_value
    },
    simulateValueMovement: function (product_values) {
        let new_values = [];
        product_values.forEach(product => {
            let updated = {product: product.product, sell_value: this.randomizeValue(product.sell_value)};
            new_values.push(updated);
        })
        return new_values;
    },
    initializeValues: function () {
        return api.fetchAllProducts()
            .then(data => {
                return data["data"];
            })
    },
    updateProductValues: function (new_values) {
        new_values.forEach(product => {
            api.updateProductValue(product);
        });
    },
    array2dict: function (input_array) {
        let output_dict = {};
        input_array.forEach(product => {
            output_dict[product.product] = product.sell_value;
        });
        return output_dict;
    },
    getCurrentDateAndTime: function() {
        let [month, day, year]    = ( new Date() ).toLocaleDateString().split("/")
        let [hour, minute, second] = ( new Date() ).toLocaleTimeString().split(/:| /)
        return { dateof: year + "-" + month + "-" + day, timeof: hour+ ":" + minute + ":" + second };
    }
}

module.exports = currency;
