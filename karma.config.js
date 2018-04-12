// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
	config.set({
		basePath: "",
		frameworks: ["jasmine"],
		plugins: [
			require("karma-jasmine"),
			require("karma-chrome-launcher"),
			require("karma-jasmine-html-reporter"),
			require("karma-spec-reporter"),
			require("karma-webpack")
		],
		files: [
			"./base.spec.ts",
			"./wwwroot/**/*.spec.*"
		],
		webpack: {
			mode: "development",
			module: {
				rules: [
					{
						test: /\.ts$/,
						use: ["ts-loader"],
						exclude: /(node_modules)/
					},
					{
						test: /\.scss|\.css$/,
						use: [
							{
								loader: "style-loader",
								options: {
									sourceMap: true
								}
							},
							{
								loader: "css-loader",
								options: {
									includePaths: config.scssInclude,
									sourceMap: true
								}
							},
							{
								loader: "sass-loader",
								options: {
									sourceMap: true,
									sourceMapContents: true,
									precision: 10,
									includePaths: config.scssInclude,
									outputStyle: "nested"
								}
							}
						]
					},
					{
						test: /\.(eot|ttf|woff|woff2|svg)$/,
						exclude: [/wwwroot(\\|\/)fonts/, /wwwroot(\\|\/)images/],
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "../fonts/",
							publicPath: "/fonts/"
						}
					},
					{
						test: /\.(eot|ttf|woff|woff2|svg)$/,
						include: /wwwroot(\\|\/)fonts/,
						loader: "file-loader",
						options: {
							emitFile: false,
							name: "[name].[ext]",
							outputPath: "../fonts/",
							publicPath: "/fonts/"
						}
					},
					{
						test: /\.(svg|png|jpeg|gif)$/,
						include: /wwwroot(\\|\/)images/,
						exclude: /node_modules/,
						loader: "file-loader",
						options: {
							emitFile: false,
							name: "[name].[ext]",
							publicPath: "../images/"
						}
					},
					{
						test: /\.(svg|png|jpeg|gif)$/,
						include: /sass(\\|\/)img/,
						exclude: /node_modules/,
						loader: "file-loader",
						options: {
							emitFile: true,
							name: "[name].[ext]",
							outputPath: "../images/template/",
							publicPath: "/"
						}
					},
					{
						test: require.resolve("jquery"),
						use: [
							{ loader: "expose-loader", options: "jQuery" },
							{ loader: "expose-loader", options: "$" }
						]
					}
				]
			},
			resolve:
				{
					extensions: [".ts", ".js", ".json"],
					alias: {
						typeahead: "typeahead.js"
					}
				},
		},
		preprocessors: {
			"./base.spec.ts": ["webpack"],
			"./wwwroot/**/*.spec.*": ["webpack"]
		},
		reporters: ["kjhtml", "spec"],
        mime: {
			"text/x-typescript": ["ts"]
        },
		port: 9876,
		colors: true,
		autoWatch: true,
		browsers: ["Chrome"],
		singleRun: false
	});
};
