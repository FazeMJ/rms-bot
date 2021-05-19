module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log('Logged in as RMS BOT#3399 | 830273230148993044');
		client.user.setActivity(`RMS`, {
			type: 'WATCHING'
	});
	},
};