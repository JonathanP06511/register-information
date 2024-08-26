require('dotenv').config(); 

const { User } = require('../models');
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.createUser = async (req, res) => {
    const { role, name, lastname, idcard, formattedDate, email, password, phone, address } = req.body;
    try {
        const serviceUrl = process.env.EXTERNAL_SERVICE_URL;
        const response = await fetch(`${serviceUrl}/${email}/${password}`);
        
        if (response.ok) {
            const data = await response.json();
            const mail = data.mail;
            const pass = data.password;

            const newUser = await User.create({
                role,
                name,
                lastname,
                idcard,
                birthdate: formattedDate,
                mail,
                password: pass, 
                phone,
                address
            });

            res.status(201).json({ message: 'User successfully created', user: newUser });
        } else {
            res.status(500).json({ error: "Error fetching encrypted data" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
