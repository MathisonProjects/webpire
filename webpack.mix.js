const mix = require('laravel-mix');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const fs = require('fs')
const scriptsFile = require('./scripts')
const env = process.env.STAGE ? process.env.STAGE : "development";
const envFile = './.env.'+env

const envVariables = new Dotenv({ path: envFile })
const port = { hot: parseInt(envVariables.definitions['process.env.HOT_PORT'].replace('"', '')), node: parseInt(envVariables.definitions['process.env.NODE_PORT'].replace('"', '')) }

console.log('Loading', envFile, 'variables...')
if (!fs.existsSync(envFile)) {
	console.info("You didn't set up your local environment variables. We will get you started...", (err) => { if (err) throw err })
	fs.copyFile('./.env.example', envFile, (err) => { if (err) throw err })
} else { console.info("Successfully loaded", envFile) }

mix.webpackConfig({
	resolve: {
		extensions: ['.js', '.vue', '.json', "*", ".jsx", ".ts", ".tsx"],
		alias: { '@': path.resolve(__dirname, 'src/') }
	},
	plugins: [
		new Dotenv({ path: envFile })
	],
	module: { rules: [ { test: /\.tsx?$/, loader: "ts-loader", exclude: /node_modules/ } ] },
	devServer: {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
		},
		contentBase: path.join(__dirname, '/dist'),
		host: '127.0.0.1',
		port: port.hot,
		hot: true,
		writeToDisk: true,
	},
})
	.js('src/main.ts'                   , 'dist/js/app.bundle.js')
	.sass('src/assets/scss/default.scss', 'dist/css/app.bundle.css')
	.copy('src/assets/index.html'       , 'dist/index.html')
	.copy('src/assets/robots.txt'       , 'dist/robots.txt')
	.copy('src/assets/manifest.json'    , 'dist/manifest.json')
	.copy('src/assets/.htaccess'        , 'dist/.htaccess')
	.copy('src/assets/images'           , 'dist/images')
	.copy('src/assets/videos'           , 'dist/videos')

mix.minify('dist/js/app.bundle.js', 'dist/js/app.bundle.min.js').then( (stats) => {
	scriptsFile.updateVersion(env)
	// console.log(stats)
})
