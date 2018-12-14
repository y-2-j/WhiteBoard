let config;

switch (process.env.NODE_ENV) {
    case "production":
        config = {
            SERVER: {
                PORT: process.env.PORT,
                HOST: process.env.HOST
            }
        };
        break;

    default:
        config = require("./secret.json");
        break;
}

module.exports = config;