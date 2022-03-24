module.exports = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: "/ada",
				destination: "/account-page",
			},
			{
				source: "/account-page/nbmons",
				destination: "/account-page",
			},
		];
	},
};
