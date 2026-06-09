import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'db.json');

const initDB = () => {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], records: [] }, null, 2));
  }
  const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  
  // Enforce ONLY these two users
  const allowedEmails = ['admin@healthbase.com', 'mafshaan1705@gmail.com'];
  
  const strictUsers = [
    { _id: "demo-admin", name: "System Admin", email: "admin@healthbase.com", password: Buffer.from("password123").toString('base64'), role: "admin", isOnboarded: true },
    { _id: "user-mafshaan", name: "Mafshaan", email: "mafshaan1705@gmail.com", password: Buffer.from("password123").toString('base64'), role: "admin", isOnboarded: true }
  ];

  // Check if current users match strictly
  const currentEmails = data.users.map(u => u.email).sort();
  const targetEmails = allowedEmails.slice().sort();
  
  const isMatch = JSON.stringify(currentEmails) === JSON.stringify(targetEmails);
  
  if (!isMatch) {
    data.users = strictUsers;
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  }
};

const readDB = () => {
  initDB();
  const data = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

export const fileDB = {
  getUsers: () => readDB().users,
  saveUser: (user) => {
    const db = readDB();
    const index = db.users.findIndex(u => u.email === user.email);
    if (index >= 0) {
      db.users[index] = { ...db.users[index], ...user };
    } else {
      user._id = Date.now().toString(); // Generate simple ID
      db.users.push(user);
    }
    writeDB(db);
    return user;
  },
  findUserByEmail: (email) => {
    return readDB().users.find(u => u.email === email);
  },
  findUserById: (id) => {
    return readDB().users.find(u => u._id === id);
  }
};
