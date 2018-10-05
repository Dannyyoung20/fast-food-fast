import { hashPassword } from '../../helpers';

// User Table Schema
const userSchema = `
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL UNIQUE PRIMARY KEY,
    email VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    address TEXT,
    role INTEGER DEFAULT 0,
    slug VARCHAR(30) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
`;

// Menu Table Schema
const menuSchema = `
  CREATE TABLE IF NOT EXISTS menu(
    id SERIAL UNIQUE PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL,
    price INTEGER NOT NULL,
    img VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
`;

// Orders Table Schema
const orderSchema = `
  CREATE TABLE IF NOT EXISTS orders(
    id SERIAL UNIQUE PRIMARY KEY,
    menu_id INTEGER REFERENCES menu(id),
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    qty INTEGER NOT NULL,
    delivery_address TEXT,
    status VARCHAR(20) DEFAULT 'now',
    slug VARCHAR(30) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
`;

// Create admin query
const hash = hashPassword('password');
const createAdmin = `
  INSERT INTO users(
    email, 
    password,
    slug,
    role
    ) VALUES (
      'admin@gmail.com',
      '${hash}',
      'https://imageurl.png',
      1
    );
`;

// Create a menu item
const createMenu = `
  INSERT INTO menu(
    name,
    price,
    img
  ) VALUES (
    'pizza',
     3000,
     'jdkajdakj'
  )
`;

const migration = `
${userSchema}
${menuSchema}
${orderSchema}
${createAdmin}
${createMenu}
`;

export default migration;
