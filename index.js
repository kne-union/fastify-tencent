const fp = require('fastify-plugin');
const merge = require('lodash/merge');
const path = require('node:path');
const packageJson = require('./package.json');

module.exports = fp(async (fastify, options) => {
    options = merge({
        oss: {
            baseDir: 'default'
        }, prefix: `/api/v${packageJson.version.split('.')[0]}/tencent`, createAuthenticate: () => {
            return [];
        }
    }, options);
    fastify.register(require('@kne/fastify-namespace'), {
        name: 'tencent', options, modules: [['services', path.resolve(__dirname, './libs/services')]]
    });
}, {
    name: 'fastify-tencent'
});
