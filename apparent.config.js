// need to use 'pm2 start npm -- start'	 

module.exports = {
    apps : [{
      name       : "apparent-client",
      cwd        : "./client",
      script     : "npm",
      args       : "start",
      watch       : true,
      env: {
        "NODE_ENV": "development",
      },
      env_production : {
        "NODE_ENV": "production"
      }
    }]
  }



