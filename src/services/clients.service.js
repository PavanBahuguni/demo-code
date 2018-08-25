const { CLIENT_ENDPOINT } = require('../config');
const { Crawler } = require('./crawler.service');
const { clientData } = require('../data');

class ClientService {
    constructor() {
        this.indexToPropMap = {
            0: 'name',
            1: 'phone',
            2: 'email',
            3: 'company',
            4: 'zip'
        };
    }
    /**
     * 
     * @param {*} page - page value from which the client data need to be parsed.
     */
    async getClientsData(page) {
        // create the crawler with CLIENT_ENDPOINT.
        const crawler = new Crawler(CLIENT_ENDPOINT);
        // init the crawler, which will get the data and setup cheerio dom for parsing.
        await crawler.init(page);
        // crawl the table in page to get the client data.
        const clients = await crawler.parseTable(this.indexToPropMap);
        // crawl the next button to get the next page value which needs to be fetched.
        const nextButton = await crawler.getElementWithClass('button', 'btn-primary');
        let nextPage;
        if (nextButton && nextButton.attr()) {
            nextPage = nextButton.attr().value;
        }
        return {
            clients,
            nextPage
        };
    }

    /**
     * 
     * @param {*} page - page value from which the client data need to be parsed.
     */
    async insertData(page) {
        try {
            const { clients, nextPage }= await this.getClientsData(page);
            console.log(`Got data response ${clients.length} for page ${page}`);
            const res = await clientData.saveClients(clients);
            console.log('Saved validated clients to the database', res.length);
            if(nextPage) {
                // If the currently crawled page has a next page, we need to parse that page as well.
                this.insertData(nextPage);
            }
        } catch (err) {
            if (err && err.response && err.response.status === 500) {
                console.log(`Error while fetching clients data for page ${page}, need to retry`);
                this.insertData(page);
            } else {
                throw err;
            }
        }
    }

    /**
     * 
     * @param {*} condition - mongo query based on which the clients will be fetched.
     */
    getClients(condition) {
        return clientData.getClients(condition);
    }

    /**
     * 
     * @param {*} client - new client data which needs to be entered into mongoDB.
     */
    createClient(client) {
        return clientData.createClient(client);
    }

    /**
     * 
     * @param {*} id - id of the client to be fetched.
     */
    getClientById(id) {
        return clientData.getClientById(id);
    }

    /**
     * 
     * @param {*} id - id of the client to be fetched.
     * @param {*} newData - the newData which will be updated for the given id.
     */
    updateClient(id ,newData) {
        return clientData.updateClient(id, newData);        
    }

    /**
     * 
     * @param {*} id - id of the supporter to be deleted.
     */
    deleteClient(id) {
        return clientData.deleteClient(id);
    }
}

exports.clientService = new ClientService();