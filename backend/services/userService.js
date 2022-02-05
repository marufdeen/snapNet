const userEntity = require("../entities/userEntity");
const userDao = require("../data-access/userDao");
const { comparePassword } = require("../helpers/password");
const createToken = require("../helpers/createToken");  

class userService {
  static async register(userData) {
    try {
      // make a new user object with inputed data
      const entity = await new userEntity(userData).execute();
      if (entity.details) throw new Error(entity.details[0].message);
      // check if the user already exists
      const emailExist = await userDao.findByEmail(entity.getEmail());
      if (emailExist) throw new Error("Email already exist");
 
      // if user does not exist, create the user
      const userCreated = await userDao.create({ 
        name: entity.getName(), 
        email: entity.getEmail(),
        password: entity.getPassword(),  
      });
      // if user failed to create, throw error
      if (!userCreated) throw new Error("User not Created");

      const token = await createToken(userCreated);
      return { userCreated, token };
    } catch (error) {
      return { error: error.message };
    }
  }

  static async login(userData) {
    try {
      // make a new user entity and validate the inputed details
      const entity = await new userEntity(userData).validateLogin();
      if (entity.details) return { error: entity.details[0].message };

      const userExist = await userDao.findByEmail(entity.getEmail()); 
      if (!userExist) throw new Error("Email does not exist");
      
      await comparePassword(entity.getPassword(), userExist.password);
      
      if(userExist.enabled == false) throw new Error ("Your account is currently disabled, kindly inform an  admin");

      // generate token for the logged user
      const token = await createToken(userExist);
      return { sucess: "Login Successful", token };
    } catch (error) {
      return { error: error.message };
    }
  }

  static async editUser(signInId, userId, userData) {
    try {
      const user = await userDao.findById(signInId);
      if (user.role == "staff")
        throw new Error("Sorry, only super-admin or admin can access this page");

      const userFound = await userDao.findById(userId);
      if (!userFound) throw new Error("Sorry, user not found!");

      const entity = await new userEntity(userData).validateEdit();
      if (entity.details) return { error: entity.details[0].message };

      // check if the email exists
      const emailExist = await userDao.findByEmail(entity.getEmail());
      if ( emailExist !== null &&  emailExist.email.length > 0 &&  emailExist.id !== userId  )  throw new Error("User with this email already exist");

      // check if the phone  number exists
      const phoneNumberExist = await userDao.findByPhoneNumber(entity.getPhoneNumber());
      if ( phoneNumberExist !== null &&  phoneNumberExist.phoneNumber.length > 0 &&  phoneNumberExist.id !== userId  )  throw new Error("User with this phone number already exist");

      const editedUser = await userDao.update(userId, userData);
      return { message: "Profile updated successfully", editedUser };
    } catch (error) {
      return { error: error.message };
    }
  }

  static async dashboard(userId) {
    try {
      const userDetails = await userDao.findById(userId);
      if (!userDetails) throw new Error("Not an authenticated user");
      return { message: 'success', userDetails }
    } catch (error) {
      return { error: error.message };
    }
  }

  static async updateProfile(userId, userData) {
    try {
      const userExist = await userDao.findById(userId);
      if (!userExist) throw new Error("Not an authenticated user");

      const entity = await new userEntity(userData).validateProfile();
      if (entity.details) return { error: entity.details[0].message };
      
      // check if the email exists
      const emailExist = await userDao.findByEmail(entity.getEmail());
      if ( emailExist !== null &&  emailExist.email.length > 0 &&  emailExist.id !== userId  )  throw new Error("User with this email already exist");

       // check if the phone  number exists
      const phoneNumberExist = await userDao.findByPhoneNumber(entity.getPhoneNumber());
      if ( phoneNumberExist !== null &&  phoneNumberExist.phoneNumber.length > 0 &&  phoneNumberExist.id !== userId  )  throw new Error("User with this phone number already exist");

      const editedUser = await userDao.update(userId, userData);
      return { message: "Profile updated successfully", editedUser };
    } catch (error) {
      return { error: error.message };
    }
  }
  static async uploadProfilePicture(userId, userData) {
    try {
      const userExist = await userDao.findById(userId);
      if (!userExist) throw new Error("Not an authenticated user");

      const profilePicture = await userDao.update(userId, { profilePicture: userData });

      return { message: 'Profile picture uploaded successfully!', profilePicture }
      
    } catch (error) {
      return { error: error.message };
    }
  }

  static async setUserStatus(signInId, userId, userData) {
    try {
      const user = await userDao.findById(signInId); 
      if (user.role == "staff")
        throw new Error("Sorry, only admins can access this page");

      if (signInId == userId)
        throw new Error("Sorry, You can't carry out this operation on yourself");

      const userFound = await userDao.findById(userId);
      if (!userFound) throw new Error("Sorry, user not found!");

      const userStatus = await userDao.update(userId, userData);
      return { message: "User status changed", userStatus }; 

    } catch (error) {
      return { error: error.message };
    }
  }

  static async getAllUsers(signInId) {
    try {
      const user = await userDao.findById(signInId);
      if (user.role == "staff") 
      throw new Error("Sorry, only admins can access this page");

      const usersFound = await userDao.findAll();
      return { message: "success", usersFound };
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getSingleUser(signInId, userId) {
    try {
      const user = await userDao.findById(signInId);
      if (user.role == "staff")
        throw new Error("Sorry, only admins can access this page");

      const userFound = await userDao.findById(userId);
      if (!userFound) throw new Error("Sorry, user not found!");

      return { message: "success", userFound };
    } catch (error) {
       return { error: error.message };
    }
  }

  static async createAdmin (userId, userData) {
    try {
      const user = await userDao.findById(userId);
      if (user.role == "staff" || user.role == "admin")
        throw new Error("Sorry, only super-admin can access this page");

      const entity = await new userEntity(userData).executeAdmin();
      if (entity.details) throw new Error(entity.details[0].message);

      // check if the user already exists
      const emailExist = await userDao.findByEmail(entity.getEmail());
      if (emailExist) throw new Error("Email already exist");

      const userCreated = await userDao.create({
      regId: randomBytes(5).toString("hex"),
      email: entity.getEmail(),
      password: entity.getPassword(), 
      designation: entity.getDesignation(),
      joinedDate: entity.getJoinedDate(),
      enabled: true,
      role: 'admin'
      });
      // if user failed to create, throw error
      if (!userCreated) throw new Error("User not Created"); 
      const token = await createToken(userCreated);
      return { userCreated, token };

    } catch (error) {
       return { error: error.message };
    }
  }

  static async changeUserPassword(signInId, userId, userData) {
    try {
      const user = await userDao.findById(signInId);
      if (user.role == "staff")
        throw new Error("Sorry, only admin or super admin can access this page");
      const userFound = await userDao.findById(userId); 
      if (!userFound) throw new Error("Sorry, user not found!");

      const entity = await new userEntity(userData).executeChangePassword();
      if (entity.details) throw new Error(entity.details[0].message);

      const userPassword = await userDao.update(userId, {
        password: entity.getPassword()
      });

      return { message: "User password changed", userPassword };

    } catch (error) { 
      return { error: error.message };
    }
  }

  static async changePassword(userId, userData) {
    try {
      const userExist = await userDao.findById(userId);
      const entity = new userEntity(userData)
      const errors =  await entity.executeChangePassword();
      if (!entity.getCurrentPassword())  throw new Error('Input your current password')
      await comparePassword(entity.getCurrentPassword(), userExist.password);
  
      if (errors.details) throw new Error(errors.details[0].message);

      const userPassword = await userDao.update(userId, {
        password: entity.getPassword()
      });

      return { message: "User password changed", userPassword };

    } catch (error) {
      return { error: error.message };
    }
  }

  static async deleteUser(signInId, userId) {
    try {
      const user = await userDao.findById(signInId);
      if (user.role !== "superAdmin")
        throw new Error("Sorry, only super admin can access this page");

      if (signInId == userId)
        throw new Error("Sorry, You can't delete yourself");

      const userFound = await userDao.findById(userId);
      if (!userFound) throw new Error("Sorry, user not found!");

      await userDao.remove(userId);
      throw new Error(" User successfully deleted!");
    } catch (error) {
       return { error: error.message };
    }
  }
}

module.exports = userService;
