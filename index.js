const pool = require('./database');

const createTables = async () => {
  try {
    await pool.query(`
      CREATE TABLE clientes (
        cliente_id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
      );

      CREATE TABLE produtos (
        produto_id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        preco DECIMAL(10,2) NOT NULL
      );

      CREATE TABLE pedidos (
        pedido_id SERIAL PRIMARY KEY,
        cliente_id INTEGER REFERENCES clientes(cliente_id),
        data_pedido DATE NOT NULL
      );

      CREATE TABLE itens_de_pedidos (
        item_id SERIAL PRIMARY KEY,
        pedido_id INTEGER REFERENCES pedidos(pedido_id),
        produto_id INTEGER REFERENCES produtos(produto_id),
        quantidade INTEGER NOT NULL,
        preco_unitario DECIMAL(10,2) NOT NULL
      );
    `);
    console.log('Tabelas criadas com sucesso!');
  } catch (error) {
    console.error('Erro ao criar tabelas', error);
  }
};

const insertData = async () => {
  try {
    await pool.query(`
      INSERT INTO clientes (nome, email) VALUES 
      ('Ana Silva', 'ana.silva@example.com'),
      ('João Souza', 'joao.souza@example.com');
      ('Carlos Silva', 'carlos.silva@example.com'),
      ('Maria Oliveira', 'maria.oliveira@example.com');

      INSERT INTO produtos (nome, preco) VALUES 
      ('Produto A', 10.50),
      ('Produto B', 20.30);
      ('Produto C', 30.50),
      ('Produto D', 40.75);

      INSERT INTO pedidos (cliente_id, data_pedido) VALUES 
      (1, '2023-09-21'),
      (2, '2023-09-22');
      (3, '2023-09-23'),
      (4, '2023-09-24');

      INSERT INTO itens_de_pedidos (pedido_id, produto_id, quantidade, preco_unitario) VALUES 
      (1, 1, 2, 10.50),
      (2, 2, 1, 20.30);
      (3, 3, 1, 30.50),
      (4, 4, 2, 40.75);
    `);
    console.log('Dados inseridos com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir dados', error);
  }
};

const runApp = async () => {
  await createTables();
  await insertData();
};

runApp();
