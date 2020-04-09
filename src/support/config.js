function getconfig() {
	// return {
	// 	server: 'http://localhost:8080',
	// };
	var env = '__buildEnv__';
	var cfg = null;

	switch (env) {
		case 'production':
			cfg = {
				server: 'http://restpoker.cuencador.com:8082',
			};
			break;
		case 'development':
		case '__buildEnv__':
			cfg = {
				server: 'http://localhost:8080',
			};
			break;

		default:
			throw new Error(`Build Environment unknown: ${env}`);
	}

	console.log(cfg);
	return cfg;
}
export let config = getconfig();
