/*
 * Generate a random string of 24 characters in length.
 */
export default () => {
	return crypto.randomUUID().toString().replace(/-/g, "");
};
