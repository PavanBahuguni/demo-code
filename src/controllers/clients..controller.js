const { EXPRESS_CLIENT_ENDPOINT, ERROR_CODES } = require('../config');
const { clientService } = require('../services');

module.exports = function (app) {

    app.put(`${EXPRESS_CLIENT_ENDPOINT}generateData`, async(req, res) => {
        try {
            await clientService.insertData('');
        } catch (err) {
            console.log('Error in generateData', err);
            throw new Error('Internal Server Error');
        }
    });

    app.get(`${EXPRESS_CLIENT_ENDPOINT}:id`, async (req, res) => {
        const id = req.params.id;
        try {
            const client = await clientService.getClientById(id);
            res.setHeader('Content-Type', 'application/json');
            res.send(client);
        } catch (err) {
            console.log('Error while fetching client', );
            res.status(500).send(new Error(ERROR_CODES.internalServerError));
        }
    })

    app.get(EXPRESS_CLIENT_ENDPOINT, async(req, res) => {
        try {
            const clients = await clientService.getClients(req.query);
            res.setHeader('Content-Type', 'application/json');
            res.send(clients);
        } catch (err) {
            console.log('Error while fetching all clients', err);
            res.status(500).send(new Error(ERROR_CODES.internalServerError));
        }
    })

    app.post(EXPRESS_CLIENT_ENDPOINT, async(req, res) => {
        try {
            const result = await clientService.createClient(req.body);
            if (!result.ok) {
                throw new Error(result.message);
            }
            res.setHeader('Content-Type', 'application/json');
            res.send(result.data);
        } catch (err) {
            console.log('Error while creating new client', err);
            res.status(400).send(err);
        }
    })

    app.post(`${EXPRESS_CLIENT_ENDPOINT}:id`, async (req, res) => {
        const id = req.params.id;
        try {
            const result = await clientService.updateClient(id, req.body);
            if (!result.ok) {
                throw new Error(result.message);
            }
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        } catch (err) {
            console.log('Error while updating client: ', id, err);
            res.status(400).send(err);
        }
    });

    app.delete(`${EXPRESS_CLIENT_ENDPOINT}:id`, async (req, res) => {
        const id = req.params.id;
        try {
            await clientService.deleteClient(id);
            res.setHeader('Content-Type', 'application/json');
            res.send(true);
        } catch (err) {
            console.log('Error while deleting client: ', id, err);
            res.status(400).send(err);
        }
    });
}
