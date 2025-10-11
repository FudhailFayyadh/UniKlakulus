// In-memory database for development
// This is a temporary solution until MongoDB is properly configured
const fs = require('fs');
const path = require('path');

class MemoryDatabase {
  constructor() {
    this.users = new Map();
    this.nextId = 1;
    this.dataFile = path.join(__dirname, 'memory-data.json');
    this.loadData();
  }

  // Load data from file if exists
  loadData() {
    try {
      if (fs.existsSync(this.dataFile)) {
        const data = JSON.parse(fs.readFileSync(this.dataFile, 'utf8'));
        this.nextId = data.nextId || 1;
        if (data.users) {
          data.users.forEach(user => {
            this.users.set(user._id, user);
          });
        }
        console.log(`📁 Loaded ${this.users.size} users from memory file`);
      }
    } catch (error) {
      console.log('⚠️  Could not load memory data:', error.message);
    }
  }

  // Save data to file
  saveData() {
    try {
      const data = {
        nextId: this.nextId,
        users: Array.from(this.users.values())
      };
      fs.writeFileSync(this.dataFile, JSON.stringify(data, null, 2));
    } catch (error) {
      console.log('⚠️  Could not save memory data:', error.message);
    }
  }

  // User operations
  async createUser(userData) {
    const user = {
      _id: this.nextId++,
      ...userData,
      isActive: true, // Default to active
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: null
    };
    
    this.users.set(user._id, user);
    this.saveData(); // Persist data
    return user;
  }

  async findUserByEmail(email) {
    for (let user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async findUserById(id) {
    return this.users.get(parseInt(id)) || null;
  }

  async updateUser(id, updateData) {
    const user = this.users.get(parseInt(id));
    if (!user) return null;
    
    const updatedUser = {
      ...user,
      ...updateData,
      updatedAt: new Date()
    };
    
    this.users.set(parseInt(id), updatedUser);
    this.saveData(); // Persist data
    return updatedUser;
  }

  async deleteUser(id) {
    const result = this.users.delete(parseInt(id));
    this.saveData(); // Persist data
    return result;
  }



  // Get all users (for admin purposes)
  async getAllUsers() {
    return Array.from(this.users.values());
  }

  // Clear all data
  async clearAll() {
    this.users.clear();
    this.nextId = 1;
  }
}

// Create singleton instance
const memoryDB = new MemoryDatabase();

module.exports = memoryDB;