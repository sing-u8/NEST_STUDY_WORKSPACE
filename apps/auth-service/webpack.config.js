const { NxAppWebpackPlugin } = require("@nx/webpack/app-plugin");
const { join } = require("node:path");

module.exports = {
	output: {
		path: join(__dirname, "../../dist/apps/auth-service"),
	},
	resolve: {
		alias: {
			'@authService': join(__dirname, 'src'),
		},
		extensions: ['.ts', '.js', '.json'],
	},
	plugins: [
		new NxAppWebpackPlugin({
			target: "node",
			compiler: "tsc",
			main: "./src/main.ts",
			tsConfig: "./tsconfig.app.json",
			assets: ["./src/assets"],
			optimization: false,
			outputHashing: "none",
			generatePackageJson: true,
		}),
	],
};
