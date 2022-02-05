require('dotenv').config()
require('../../dataBaseConnection');
const userDao = require("../data-access/staeDao");
const { hashPassword } = require('../helpers/password'); 
const data = [
    {
        'name': 'lagos'
    },
    {
        'name': 'abuja'
    },
    {
        'name': 'port harcourt'
    },
    {
        'name': 'ibadan'
    },
    {
        'name': 'ilorin'
    }
];

(async () => {
    try {   
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