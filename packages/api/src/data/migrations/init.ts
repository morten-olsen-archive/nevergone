import Knex from 'knex';

const name = 'init';

const up = async (knex: Knex) => {
  await knex.schema.createTable('resource_types', (table) => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('description').nullable();
    table.string('icon').nullable();
  });

  await knex.schema.createTable('resources', (table) => {
    table.string('id').notNullable().primary();
    table.string('name').notNullable().index();
    table.string('type').references('id').inTable('resource_types').notNullable().index();
    table.string('ref').nullable().index();
    table.string('assignedTo').nullable().references('id').inTable('resources').index();
    table.enum('status', ['normal', 'defect', 'lost', 'destroyed']).nullable().index();
    table.text('description').nullable();
    table.bigInteger('acquisitionTime').nullable();
    table.float('acquisitionPrice').nullable();
    table.string('acquisitionCurrency').nullable();
  });

  await knex.schema.createTable('resource_fields', (table) => {
    table.string('name').notNullable();
    table.string('resource').references('id').inTable('resources').notNullable().index();
    table.string('type').notNullable();
    table.text('value').nullable();
    table.primary(['name', 'resource']);
  });

  await knex.schema.createTable('documents', (table) => {
    table.string('id').primary();
    table.string('name').nullable();
    table.string('mimeType').notNullable();
    table.integer('size').notNullable();
  });

  await knex.schema.createTable('resource_documents', (table) => {
    table.string('resource').references('id').inTable('resources').notNullable().index();
    table.string('document').references('id').inTable('documents').notNullable().index();
    table.primary(['resource', 'document']);
  });

  await knex.schema.createTable('assign_log', (table) => {
    table.increments('id').primary();
    table.string('resource').notNullable().references('id').inTable('resources').index();
    table.string('assigned').nullable().index();
    table.dateTime('dateAssigned').nullable();
    table.dateTime('dateUnassigned').nullable();
    table.text('note');
  });
};

const down = async (knex: Knex) => {
  await knex.schema.dropTable('resource_types');
  await knex.schema.dropTable('resources');
  await knex.schema.dropTable('resource_fields');
  await knex.schema.dropTable('documents');
  await knex.schema.dropTable('resource_documents');
  await knex.schema.dropTable('assignLog');
};

export { name, up, down };
