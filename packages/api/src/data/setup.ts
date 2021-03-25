import knex, { Config, MigrationSource } from 'knex';
import migrations, { MigrationType } from './migrations';

const migrationSource: MigrationSource<MigrationType> = {
  getMigration: migration => migration,
  getMigrations: async () => migrations,
  getMigrationName: migration => migration.name,
};

  const setup = async (config: Config) => {
  const db = knex(config);

  await db.migrate.latest({
    migrationSource,
  });

  return db;
};

export default setup;
