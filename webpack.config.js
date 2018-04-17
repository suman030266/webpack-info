const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const srcDir = path.resolve(process.cwd(), 'src');
const nodeModPath = path.resolve(__dirname, './node_modules');
const glob = require('glob');


let entries = function () {
	let jsDir = path.resolve(srcDir, 'js');
	let entryFiles = glob.sync(jsDir + '/*/index.{js,jsx}');
	let map = {};
	entryFiles.forEach(item =>{
		map[item.match(/.+\/src\/js\/(.+)\/.+\.js/)[1]] = item;
	});
	return map;
}

module.exports = {
	context: path.resolve(__dirname, './src'),
	// entry: './index.js',
	// entry: ['./index', './index2'],
	// entry: {
	// 	vendor: ['jquery', 'babel-polyfill', 'react', 'react-dom', 'redux', 'react-router-dom'],
 //   		app: path.resolve(__dirname, 'app.js')
	// },
	entry: Object.assign(entries(), {
		'vendor': ['jquery', 'babel-polyfill', 'react', 'react-dom', 'redux', 'react-router-dom'],
	}),
	// output: {
	// 	path: path.join(__dirname, './dist'),
	// 	publicPath: '/dist/',
	// 	filename: 'main.js'
	// },
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'js/[name].js',
        chunkFilename: "js/[name]-[chunkhash:5].js"
	},
	// output: {
 //        filename: 'js/[name]-[chunkhash:7].js',
 //        publicPath: configFun()['publicPath'][env]
 //    },
	module: {
		rules: [
			{
				test: /\.css$/,
				// use: ['style-loader', 'css-loader']
				use: ExtractTextPlugin.extract({
					use: 'css-loader',
					fallback: 'style-loader'
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('index.css')
	]
};