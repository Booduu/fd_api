module.exports = {
  apps : [{
    name: 'fulldub',
    script: './bin/www',
    instances: 'max',
    autorestart: true,
    watch: true,
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};


//npm i pm2 -g
//pm2 init