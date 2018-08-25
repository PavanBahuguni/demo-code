const axios = require('axios');
const cheerio = require('cheerio');
const querystring = require('querystring');

class Crawler {
    constructor(endPoint) {
        this.endPoint = endPoint; 
    }

    async init(page) {
        this.body = await axios.post(this.endPoint, querystring.stringify({ page:  page})).then(response => response.data);
        this.$ = cheerio.load(this.body);
    }

    canProceed() {
        if (!this.body) {
            throw new Error('Please initialize Crawler before using it');
        }
        return true;
    }

    parseTable(indexPropMap) {
        if (!this.canProceed()) {
            return;
        }
        const data = [];
        this.$('tr').each((index, elm) => {
            if(index === 0) return;
            const obj = {};
            for (let i = 0; i < Object.keys(indexPropMap).length; i++) {
                obj[indexPropMap[i]] = this.$(elm).children().eq(i).text();
            }
            data.push(obj);
        });
        return data;
    }

    getElementWithClass(elementType, elementClass) {
        if (!this.canProceed()) {
            return;
        }
        return this.$(`${elementType}.${elementClass}`);
    }
}

exports.Crawler = Crawler;
