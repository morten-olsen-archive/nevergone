import express, { Express } from 'express';
import { createRemoteJWKSet } from 'jose/jwks/remote';
import { jwtVerify } from 'jose/jwt/verify';
import cookieParser from 'cookie-parser';
import axios from 'axios';

interface Options {
  domain: string;
  clientId: string;
}

const create = async ({
  domain,
  clientId,
}: Options): Promise<Express> => {
  const { data: config } = await axios.get(`${domain}/.well-known/openid-configuration`);
  const JWKS = createRemoteJWKSet(new URL(config.jwks_uri));
  const app = express();

  app.get('/auth/config', (_, res) => {
    res.json({
      domain,
      clientId,
    });
  });

  app.get('/auth/login', (req, res) => {
    const redirectUri = `http://${req.headers.host}/auth/callback`;
    const auth = config.authorization_endpoint;
    res.redirect(
      `${auth}`
      + `?client_id=${clientId}`
      + `&redirect_uri=${encodeURIComponent(redirectUri)}`
      + '&response_type=code'
      + '&nonce=sdfsdf',
    );
  });

  app.use(cookieParser());

  app.get('/auth/callback', async (req, res, next) => {
    try {
      const redirectUri = `http://${req.headers.host}/auth/callback`;
      const tokenEndpoint = config.token_endpoint;
      const code = req.query.code as string;
      const params = new URLSearchParams();
      params.append('code', code);
      params.append('client_id', clientId);
      params.append('grant_type', 'authorization_code');
      params.append('redirect_uri', redirectUri);
      const { data } = await axios.post(tokenEndpoint, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });
      console.log(data);
      res.cookie('authorization', `${data.token_type} ${data.access_token}`);
      res.end(data.access_token);
    } catch (err) {
      next(err);
    }
  });

  app.use(async (req, _, next) => {
    try {
      const [authorization] = req.header('authorization') || [];
      if (authorization) {
        const [_, token] = req.headers['authorization']!.split(' ');
        if (!token) {
          throw new Error('Invalid token');
        }
        
        const { payload } = await jwtVerify(token, JWKS);

        (req as any).token = payload;
      }
      next();

    } catch (err) {
      next(err);
    }
  });

  return app;
};

export default create;
