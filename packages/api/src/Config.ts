import path from 'path';

class Config {
  public get dataPath() {
    return process.env.DATA_PATH || path.join(process.cwd());
  }

  public get sqlitePath() {
    return path.join(this.dataPath, 'db.sqlite');
  }

  public get port() {
    if (process.env.PORT) {
      return parseInt(process.env.PORT, 10);
    }
    return 4000;
  }

  public get oidcUrl() {
    const oidcUrl = process.env.OIDC_URL;
    if (!oidcUrl) {
      throw new Error('OIDC_URL not set');
    }
    return oidcUrl;
  }

  public get oidcClientId() {
    const oidcClientId = process.env.OIDC_CLIENT_ID;
    if (!oidcClientId) {
      throw new Error('OIDC_CLIENT_ID not set');
    }
    return oidcClientId;
  }
}

export default Config;
