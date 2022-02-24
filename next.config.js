module.exports = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: "/account-page/nbmons",
				destination: "/account-page",
			},
		];
	},
};
