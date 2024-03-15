/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('incident', function(table){
        // Este comando criar uma chave primaria que se auto incrementa
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.string('value').notNullable();
        table.string('ong_id').notNullable();

        // Criando a chave estrangeira, que ira relacionar a caso a ong
        table.foreign('ong_id').references('id').inTable('ongs')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('incident')
};
