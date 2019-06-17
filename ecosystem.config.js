module.exports = {
  apps : [{
    name: 'ant_blog',
    script: './index.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: 'one two',
    instances: 2,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'root',
      host : '129.28.191.26',
      ref  : 'origin/master',
      repo : 'https://github.com/chentianyuan/ant_blog.git',
      path : '/usr/project-manger',
      'post-deploy' : 'npm install && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
};
