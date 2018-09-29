const userDrop = `
  DROP TABLE IF EXISTS users CASCADE;
`;

const orderDrop = `
  DROP TABLE IF EXISTS orders;
`;

const menuDrop = `
  DROP TABLE IF EXISTS menu;
`;

const migration = `
${userDrop}
${orderDrop}
${menuDrop}
`;


export default migration;
