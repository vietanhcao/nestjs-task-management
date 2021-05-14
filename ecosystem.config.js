module.exports = {
  apps: [
    {
      name: "123",
      // exec_mode: "cluster",
      // instances: "0",
      script: "./dist/main.js", // your script
      args: "start",
      instance_var: 'INSTANCE_ID',
      env: {
        JWT_SECRET: "topsecret51", 
        NODE_ENV: "development",
        TYPEORM_SYNC: true
      },
    },
  ],
};