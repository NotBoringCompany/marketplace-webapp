module.exports = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: "/genesis-nbmons",
				destination: "/nbmons",
			},
		];
	},
	images: {
		domains: ["raw.githubusercontent.com"],
	},
};
