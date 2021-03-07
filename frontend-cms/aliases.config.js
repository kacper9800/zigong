const path = require('path');

const aliases = {
    '@': '.',
    '@src': 'src',
    '@router': 'src/router',
    '@views': 'src/views',
    '@layouts': 'src/layouts',
    '@components': 'src/components',
    '@assets': 'src/assets',
    '@state': 'src/state',
    '@config': 'src/config/index.js'
};

module.exports = {
    webpack: {},
    jest: {},
    jsconfig: {}
};

for (const alias in aliases) {
    const aliasTo = aliases[alias];
    module.exports.webpack[alias] = resolveSrc(aliasTo);
}

function resolveSrc(_path) {
    return path.resolve(__dirname, _path);
}
