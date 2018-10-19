const assert = require("assert");
const PacketList = require("./model");
const Packet = require("./../packet");

module.exports = class MachinePacketList extends PacketList {
	init(handler) {
		super.init(handler);

		handler.addPacket(new Packet("machine/created", "authenticating", this.created));
		handler.addPacket(new Packet("machine/authed", "authenticating", this.authed));
	}

	created(packet) {
		assert(packet.id, "The value id of the received packet is undefined");
		assert(packet.secret, "The value secret of the received packet is undefined");

		app.privateConfig.set("id", packet.id);
		app.privateConfig.set("secret", packet.secret);
	}

	authed() {
		console.log("machine was authenticated");
	} 
}