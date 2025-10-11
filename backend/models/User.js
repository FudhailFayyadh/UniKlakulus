const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const memoryDB = require('../database/memory');

// Check if we're using MongoDB or in-memory database
const useMemoryDB = () => {
  return !mongoose.connection.readyState || mongoose.connection.readyState !== 1;
};

// User methods that work with both MongoDB and in-memory database
class User {
  static async create(userData) {
    if (useMemoryDB()) {
      // Hash password
      if (userData.password) {
        const salt = await bcrypt.genSalt(12);
        userData.password = await bcrypt.hash(userData.password, salt);
      }
      return await memoryDB.createUser(userData);
    } else {
      // Use original MongoDB User model
      const UserMongo = require('./UserMongo');
      const user = new UserMongo(userData);
      return await user.save();
    }
  }

  static async findByEmail(email) {
    if (useMemoryDB()) {
      return await memoryDB.findUserByEmail(email);
    } else {
      const UserMongo = require('./UserMongo');
      return await UserMongo.findOne({ email }).select('+password');
    }
  }

  static async findById(id) {
    if (useMemoryDB()) {
      return await memoryDB.findUserById(id);
    } else {
      const UserMongo = require('./UserMongo');
      return await UserMongo.findById(id);
    }
  }

  static async updateById(id, updateData) {
    if (useMemoryDB()) {
      return await memoryDB.updateUser(id, updateData);
    } else {
      const UserMongo = require('./UserMongo');
      return await UserMongo.findByIdAndUpdate(id, updateData, { new: true });
    }
  }

  static async deleteById(id) {
    if (useMemoryDB()) {
      return await memoryDB.deleteUser(id);
    } else {
      const UserMongo = require('./UserMongo');
      return await UserMongo.findByIdAndDelete(id);
    }
  }



  // Password comparison method
  static async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  // Method to check if user exists
  static async exists(email) {
    const user = await this.findByEmail(email);
    return !!user;
  }

  // Method to find user excluding specific ID (for email uniqueness check)
  static async findByEmailExcluding(email, excludeId) {
    if (useMemoryDB()) {
      for (let user of memoryDB.users.values()) {
        if (user.email === email && user._id != excludeId) {
          return user;
        }
      }
      return null;
    } else {
      const UserMongo = require('./UserMongo');
      return await UserMongo.findOne({ email, _id: { $ne: excludeId } });
    }
  }

  // Method to find multiple users
  static async find(condition = {}) {
    if (useMemoryDB()) {
      let users = Array.from(memoryDB.users.values());
      // Simple filtering for memory DB (extend as needed)
      return users;
    } else {
      const UserMongo = require('./UserMongo');
      return await UserMongo.find(condition);
    }
  }

  // Method to save user (for compatibility)
  static async save(user) {
    if (useMemoryDB()) {
      return await this.updateById(user._id, user);
    } else {
      // For MongoDB, the user object should have save method
      return await user.save();
    }
  }
}

module.exports = User;