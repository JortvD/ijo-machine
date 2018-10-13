global.app = new (require("./src/app"))();
app.start()
.then(function() {
	console.log("IJO Machine has started.");
});

process.on("exit", function() {
	app.stop();
});