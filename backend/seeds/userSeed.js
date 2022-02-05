require('dotenv').config()
require('../../dataBaseConnection');
const userDao = require("../data-access/userDao");
const { hashPassword } = require('../helpers/password'); 
const data = [
    {
        'name': 'maruf',
        'email': 'marufajagunna@gmail.com',
        'password': 'passmein', 
    }
];

(async () => {
    try { 
       const emailExist = await userDao.findByEmail(data[0].email); 
       if (emailExist) return console.log('Admin already exists');
        // if user does not exist, create the user
      const userCreated = await userDao.create({ 
        name: data[0].name,
        email: data[0].email,
        password: await hashPassword(data[0].password)
      });
      // if user failed to create, throw error
      if (!userCreated) console.log("Admin not Created");
      console.log('Admin successfully created'); 
        
    } catch (error) {
        throw new Error(error.message);
    }
} )() 