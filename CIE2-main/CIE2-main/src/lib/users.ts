// For demonstration purposes, we'll use an in-memory store.
// In a real application, you would use a database.
export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string; // In a real app, this would be a securely hashed password
  role: 'admin' | 'user';
  createdAt: Date;
}

// Using a Map for easier user management
const users = new Map<string, User>();

// Pre-populate with an admin user
const adminUser: User = {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password_hash: 'admin123', // Plain text for demo purposes ONLY
    role: 'admin',
    createdAt: new Date(),
};
users.set(adminUser.email, adminUser);


export const findUserByEmail = (email: string): User | undefined => {
  return users.get(email);
};

export const addUser = (user: Omit<User, 'id' | 'createdAt'>): User => {
  if (users.has(user.email)) {
    throw new Error("User with this email already exists.");
  }
  const newUser: User = {
    ...user,
    id: (users.size + 1).toString(),
    createdAt: new Date(),
  };
  users.set(newUser.email, newUser);
  return newUser;
};

export const getAllUsers = (): User[] => {
  return Array.from(users.values());
};
