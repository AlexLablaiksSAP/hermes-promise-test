module.exports = {
	root: true,
	extends: '@react-native',
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single', { avoidEscape: true }],
		semi: ['error', 'always'],
	},
	ignorePatterns: [
		'node_modules/',
		'android/',
		'ios/',
		'windows/',
		'metro.config.js',
		'jest.config.js',
		'hermes-promise-cli/',
	],
};
