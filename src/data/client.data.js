const { Client } = require('../models/clients');

class ClientData {
    async saveClients(clients) {
        const validatedClients = [];
        for (let client of clients) {
            client = new Client(client);
            try {
                await client.validate();
                validatedClients.push(client);
            } catch (err) {
                console.log(`Invalid client data for ${client.email}`);
            }
        }
        return Client.create(validatedClients);
    }

    getClients(conditions) {
        return Client.find(conditions);
    }

    getClientById(id) {
        return Client.findById(id);
    }

    async createClient(client) {
        client = new Client(client);
        try {
            await client.validate();
            const res = await Client.create(client);
            return {
                ok: true,
                data: res
            }
        } catch (err) {
            console.log(err);
            return {
                ok: false,
                message: 'Invalid client data'
            }
        }
    }

    async updateClient(id, newData) {
        const res = await Client.findById(id);
        const client = Client({
            ...res,
            ...newData
        });
        try {
            await client.validate();
            const result = await Client.update({ _id: id }, newData);
            return {
                ok: true,
                data: result
            }
        } catch (err) {
            console.log(err);
            return {
                ok: false,
                message: 'Invalid client data'
            }
        }
    }

    deleteClient(id){
        return Client.deleteOne({
            _id: id
        });
    }
}

exports.clientData = new ClientData();