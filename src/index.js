const fs = require('fs');
const axios = require('axios');
require('dotenv').config(); // Load environment variables from .env file

const API_KEY = process.env.CMC_API_KEY; 
const BASE_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';

async function update() {
    try {
        const response = await axios.get(BASE_URL, {
            headers: {
                'X-CMC_PRO_API_KEY': API_KEY
            },
            params: {
                start: 1,
                limit: 1000,
                convert: 'USD'
            }
        });

        const data = response.data.data;
        const parsedData = data.map(coin => ({
            name: coin.name,
            symbol: coin.symbol,
            price: coin.quote.USD.price,
            last_updated: coin.last_updated
        }));

        fs.writeFileSync('prices.json', JSON.stringify(parsedData, null, 2));
        console.log('Crypto prices successfully saved to crypto_prices.json');
    } catch (error) {
        console.error('Error fetching crypto prices:', error.message);
    }
}

update();