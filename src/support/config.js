function getconfig() {
	// return {
	// 	server: 'http://localhost:8080',
	// };
	const env = '__buildEnv__';
	let cfg = null;

	switch (env) {
		case 'production':
			cfg = {
				server: 'http://restpoker.cuencador.com:8082',
			};
			break;
		case 'development':
			// case '__buildEnv__':
			cfg = {
				server: `${window.location.origin}:8080`,
				//				server: 'http://localhost:8080',
			};
			break;

		default:
			throw new Error(`Build Environment unknown: ${env}`);
	}

	return cfg;
}
export let config = getconfig();
