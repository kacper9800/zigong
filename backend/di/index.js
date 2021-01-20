const { ContainerBuilder } = require("node-dependency-injection");

const container = new ContainerBuilder();

require(`./controllers`)(container);
require(`./repositories`)(container);
require(`./services`)(container);

module.exports = container;
