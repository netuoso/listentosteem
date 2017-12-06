var CONNECTED = "Connected.";
var CONNECTING = "Connecting...";
var NO_SUPPORT = "No browser support.";
var CLOSED = "Click to connect.";

function StatusBox() {

}

StatusBox.init = function(debugmode) {
	this.blockchain = $("#blockchainStatus");

	if (debugmode) { 
		this.blockchain.html("");
		this.mtgox.html("Debug mode.")
	}

	if ($("#blockchainCheckBox").prop("checked"))
		StatusBox.reconnecting("blockchain");
	else
		StatusBox.closed("blockchain");
}

StatusBox.connected = function(type) {
	if (type == "blockchain")
		this.blockchain.html('WebSocket Transactions: <span style="color: green;">' + CONNECTED + '</span>');
}

StatusBox.reconnecting = function(type) {
	if (type == "blockchain")
		this.blockchain.html('WebSocket Transactions: <span style="color: yellow;">' + CONNECTING + '</span>');
}

StatusBox.nosupport = function(type) {
	if (type == "blockchain")
		this.blockchain.html('WebSocket Transactions: <span style="color: red;">' + NO_SUPPORT + '</span>');
}

StatusBox.closed = function(type) {
	if (type == "blockchain")
		this.blockchain.html('WebSocket Transactions: <span style="color: gray;">' + CLOSED + '</span>');
}
