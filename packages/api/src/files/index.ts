import express, { Express } from 'express';
import Knex from 'knex';
import fileUpload from 'express-fileupload';
import { nanoid } from 'nanoid';

const create = (db: Knex): Express => {
  const app = express();
  app.use(fileUpload({
    createParentPath: true
  }));

  app.post('/', async (req, res) => {
    if (!req.files) {
      throw new Error('No files send');
    }
    const document = req.files.document;
    if (Array.isArray(document)) {
      throw new Error('Multifile upload not supported');
    }
    const id = nanoid();

    document.mv(`./documents/${id}`);
    await db('documents').insert({
      id,
      mimeType: document.mimetype,
      size: document.size,
    });

    res.json({
      id,
    });
  });

  return app;
};

export default create;
