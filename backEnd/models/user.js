'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const validator = require('validator');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations if needed
    }

    static async signup(email, password) {
      try {
        
        if (!password || !email || password.trim() === '' || email.trim() === '') {
          throw new Error('All fields are required');
        }

        if(!validator.isEmail(email)) {
          throw new Error('Invalid email');
        }
        
        const existingUser = await this.findOne({ where: { email } });
        if (existingUser) {
          throw new Error('Email already in use');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.create({ email, password: hashedPassword });
    
        return user;
      } catch (error) {
        throw error;
      }
    }
    

    static async login(email, password) {
      try {
        const user = await this.findOne({ where: { email } });
        if (!user) throw new Error('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Incorrect password');

        return user;
      } catch (error) {
        throw error;
      }
    }
  }


  
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: false
    }
  );

  return User;
};
