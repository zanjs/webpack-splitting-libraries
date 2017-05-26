var path = require('path');
var webpack = require('webpack');

module.exports = function(env) {
    return {
        entry: {
            main: './index.js',
            vendor: 'moment'
        },
        output: {
            filename: '[name].[chunkhash].js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins: [
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: 'vendor' // 指定公共 bundle 的名字。
            // }),
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: 'vendor',
            //     minChunks: function (module) {
            //        // 该配置假定你引入的 vendor 存在于 node_modules 目录中
            //        return module.context && module.context.indexOf('node_modules') !== -1;
            //     }
            // }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module) {
                   // this assumes your vendor imports exist in the node_modules directory
                   return module.context && module.context.indexOf('node_modules') !== -1;
                }
            }),
            //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
            new webpack.optimize.CommonsChunkPlugin({
                name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
            })
        ]
    }
}