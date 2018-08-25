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

    async getClientsData(page) {
        const crawler = new Crawler(CLIENT_ENDPOINT);
        await crawler.init(page);
        const clients = await crawler.parseTable(this.indexToPropMap);
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

    async insertData(page) {
        try {
            const { clients, nextPage }= await this.getClientsData(page);
            console.log(`Got data response ${clients.length} for page ${page}`);
            const res = await clientData.saveClients(clients);
            console.log('Saved validated clients to the database', res.length);
            if(nextPage) {
                // this.insertData(nextPage);
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

    getClients(condition) {
        return clientData.getClients(condition);
    }

    createClient(client) {
        return clientData.createClient(client);
    }

    getClientById(id) {
        return clientData.getClientById(id);
    }

    updateClient(id ,newData) {
        return clientData.updateClient(id, newData);        
    }

    deleteClient(id) {
        return clientData.deleteClient(id);
    }
}

exports.clientService = new ClientService();