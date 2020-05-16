let path = require('path');

module.exports = {
    mode:'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],

    },
    resolve: {
        extensions: ['*','.js','.jsx']
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        proxy: {
            '/back': {
                target: 'http://localhost:8080',
                pathRewrite: {'^/back': '/api'}
            },

        }
    }
};