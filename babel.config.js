module.exports = {
	presets: ['module:@react-native/babel-preset'],
	plugins: [
		/* Chakra lacks named capturing groups; rewrite them to numbered groups at bundle time. */
		['@babel/plugin-transform-named-capturing-groups-regex'],
	],
};
