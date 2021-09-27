const path = require('path');
const express = require('express');
const Auth = require('./authenticator.js');
const FFDC = require('./ffdc.js')
const CORS = require('cors');

const app = express();
const auth = new Auth();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(
    path.resolve(__dirname, '../dist'),
    { maxAge: '1y', etag: false})
);
app.use(CORS());

app.get('/api/token', async (req, res) => {
    console.log("getting token");
    try {
        var token = await auth.getToken();
        if (token.token) {
            res.status(200).json(token);
        } else {
            res.status(500).send(token);
        }
    } catch (err) {
        res.send(err);
    }
})

app.post('/api/import', async (req, res) => {
    //console.log('Getting import '+JSON.stringify(req.body, null, 2));
    if (req.body.data) {
         var data = req.body.data;
         const base_url="https://api.fusionfabric.cloud/corporate/trade-finance/import-letter-of-credit/v1";
         const url = base_url+"/import-letter-of-credit/issuances"

         try {
             if (!req.body.token) {
                 res.status(500).send("Missing token!");
             }else {
                 const ffdc = new FFDC(req.body.token);
                 const result = await ffdc.callAPI(url, data);
                 //console.log("Result "+JSON.stringify(result));
                 res.status(200).send(result);
             }
         } catch (err) {
             res.status(500).send(err);
         }

    }else {
            res.status(405).send("Data is missing");
    }
    
})

app.post('/api/status', async (req, res) => {
    console.log('Getting import '+JSON.stringify(req.body, null, 2));
    if (req.body.id) {
        var id = req.body.id;
        const base_url="https://api.fusionfabric.cloud/corporate/trade-finance/import-letter-of-credit/v1";
        const url = base_url+"/import-letter-of-credit/issuances/"+id

        try {
            if (!req.body.token) {
                res.status(500).send("Missing token!");
            }else {
                const ffdc = new FFDC(req.body.token);
                const result = await ffdc.getAPI(url);
                //console.log("Result "+JSON.stringify(result));
                res.status(200).send(result);
            }
        } catch (err) {
            res.status(500).send(err);
        }

   }else {
           res.status(405).send("Data is missing");
   }
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
})

app.listen(process.env.BACK_PORT || 8000, () => {
    console.log(`Server is listening on port ${process.env.BACK_PORT}`);
});
