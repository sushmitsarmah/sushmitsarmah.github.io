var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path');
var poststylus = require('poststylus');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var DEST_DIRNAME = 'dest';
var DEST_DIR = path.resolve(__dirname, DEST_DIRNAME);
var SRC_DIR = path.resolve(__dirname, 'src');

var config = {
    entry: { 
        'app': SRC_DIR + '/app/index.jsx',
        'vendor1': ['react','react-dom','semantic-ui-react','react-faux-dom'],
        'vendor2': ['d3','lodash','jquery']
    },
    output: {
        path: './',
        filename: 'dest/[name].[hash].js'
    },
    plugins: [
        new CleanWebpackPlugin(['dest']),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: SRC_DIR + '/index.html'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            d3: "d3",
            "_": "lodash"
        }),
        new ExtractTextPlugin(DEST_DIRNAME+"/[name].[hash].css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app','vendor1','vendor2']
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            minimize: true,
            sourceMap: false,
            include: /\.min\.js$/
        })                      
    ],
    module: {
        loaders: [
            {   test: /\.(jsx|js)$/, 
                include: SRC_DIR+'/app', 
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name='+DEST_DIRNAME+'/assets/[name].[hash].[ext]'
            },
            {   test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },            
            {   test: /\.styl$/,
                // loader: ExtractTextPlugin.extract('style', 'css?sourceMap!stylus?sourceMap') 
                loader: ExtractTextPlugin.extract(['css-loader','stylus-loader'])
                // loader: ExtractTextPlugin.extract({
                //     fallbackLoader: "css?sourceMap",
                //     loader: "stylus?sourceMap"
                // })
            }
        ]
    },
    stylus: {
      use: [
        poststylus([ 'autoprefixer', 'rucksack-css' ])
      ]
    },    
    resolve: {
        extensions: ['', '.js', '.jsx', '.styl','.css']
    }      
};

module.exports = config;
