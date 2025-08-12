const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const medicineRoutes = require('./routes/medicine');
const verifyRoutes = require('./routes/verify');
const logsRoutes = require('./routes/logs')
const loginManufacture = require('./routes/loginManufacturer');
const loginPharmacy = require('./routes/loginPharmacy');
const registerManufacturer = require('./routes/registerManufacturer');
const registerPharmacy = require('./routes/registerPharmacy');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.use('/api/medicine', medicineRoutes);
app.use('/api', verifyRoutes);
app.use('/api', logsRoutes);
app.use('/api', loginManufacture);
app.use('/api', loginPharmacy);
app.use('/api', registerManufacturer);
app.use('/api', registerPharmacy);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
