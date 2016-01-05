var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('./dist/common.js');
var config = require('./config');

var appDir = config.appDir;

var plugins = [
  new WebpackCleanupPlugin({exclude:['images', 'favicon.ico', 'css']}),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new ExtractTextPlugin("[name].[hash].css"),   /* 导出单独的CSS文件 */
  //new webpack.NoErrorsPlugin()
  //new webpack.optimize.UglifyJsPlugin({minimize: true})
  //new webpack.optimize.CommonsChunkPlugin('vendor','vendor.js'),
  new HtmlWebpackPlugin({
    template : './'+ appDir +'/src/index.html',
    hash     : false,
    filename : 'index.html',
    inject   : 'body',
    minify   : {
      collapseWhitespace : false
    }
  })
];
if(!config.isDebug){
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({compress : {'unused'    : true, 'dead_code' : true, warnings:false}})
  );
}

module.exports = {
  entry: {
    //vender: ['react', 'react-dom'],
    app: './'+ appDir +'/src/app.js'
    //,entry2: '.'+ folder +'/js/entry.js'
  },
  output: {
    path: __dirname + '/' + appDir + '/dist',
    filename: '[name].[hash].js',
    publicPath: ''
  },
  externals:{
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
    {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
    },
    {
      test: /\.scss$/,
      loader:ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader"  //8kb   ?limit=8192
      },
    { 
      test: /\.js$/, 
      exclude: /node_modules/, 
      loader: "babel-loader",
      query: {
        plugins: ['transform-runtime'],
        presets: ['es2015','stage-0', 'react']
      }
    }, 
    {
      test: /\.jsx$/,
      loader: 'babel-loader!jsx-loader?harmony',
      exclude: /node_modules/,
      include: __dirname
    }

    ]
  },
  resolve:{
    alias:{
      jquery: "../../../js/jquery1.9.js",
      wow: "../../../js/wow.min.js",
      zepto: "../../../../node_modules/zepto/zepto.min.js"
    }
  }
};