function parsePacket(packet) {
	try {
		return JSON.parse(packet.toString());
	}
	catch(e) {
		throw e;
	}
}

module.exports = class PacketHandler {
	constructor() {
		this.packets = new Map();
	}

	addPacket(packet) {
		this.packets.set(packet.event, packet);
	}

	removePacket(event) {
		this.packets.delete(event);
	}

	async handle(data) {
		let parsedPacket = parsePacket(data);

		if(!this.packets.has(parsedPacket._event)) {
			return;
		}

		let packet = this.packets.get(parsedPacket._event);

		if(packet.state !== app.panelClient.state) {
			return;
		}
		
		await packet.handle(parsedPacket);
	}
}