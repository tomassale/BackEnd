const { options } = require('../DB/mariaDB');
const knex = require('knex')(options);

class Productos {
  constructor(products) {
    this.products = products || [];
  }
  async createTable() {
    knex.schema
      .createTable('products', (table) => {
        table.increments('id');
        table.string('nombre', 50).notNullable();
        table.float('precio', 20);
        table.integer('stock', 20);
        table.string('imagen', 500).notNullable();
      })
      .then(() => {
        console.log('Tabla Creada');
      })
      .catch(() => {
        console.log('Tabla Existente');
      })
      .finally(() => {
        knex.destroy();
      });
  }
  async getAll() {
    knex
      .from('products')
      .select('*')
      .then((rows) => {
        console.log(rows);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        knex.destroy();
      });
  }
  async getById(id) {
    knex
      .from('products')
      .select('*')
      .where({ id: id })
      .then((rows) => {
        console.log(rows);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        knex.destroy();
      });
  }
  async deleteById(id) {
      knex('products')
        .where({ id: id })
        .del()
        .then(() => {
          console.log('Data Deleted');
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          knex.destroy();
        });
  }
  async put(id, update) {
    knex('products')
      .where({ id: id })
      .update({ update })
      .then(() => {
        console.log('Data Updated');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        knex.destroy();
      });
  }
  async post(object) {
    knex('products')
      .insert(object)
      .then(() => {
        console.log('Data Inserted');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        knex.destroy();
      });
  }
}

module.exports = Productos;