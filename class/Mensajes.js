const knex = require('knex')({
  client: 'sqlite3',
  connection: { filename: '../DB/ecommerce.sqlite' },
  useNullAsDefault: true,
});

class Mensajes {
  constructor(messages) {
    this.messages = messages || [];
  }

  async createTable() {
    knex.schema
      .createTable('messages', (table) => {
        table.increments('id');
        table.string('email', 50).notNullable();
        table.string('datetime', 50).notNullable();
        table.string('mensaje', 200).notNullable();
      })
      .then(() => {
        console.log('Tabla Creada');
      })
      .catch(() => {
        console.log('Tabla Existente')
      })
      .finally(() => {
        knex.destroy();
      });
  }
  async getAll() {
    knex
      .from('messages')
      .select('*')
      .then((rows) => {
        rows.forEach((e) => {
          messages.push(e);
        });
        console.log(messages);
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
      .from('messages')
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
    knex('messages')
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
    knex('messages')
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
    knex('messages')
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

module.exports = Mensajes;