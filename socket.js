var satoshi = 1;

var DELAY_CAP = 1000;

var lastBlockHeight = 0;

function TransactionSocket() {

}

TransactionSocket.init = function () {
    steem.api.streamOperations((err,operations) => {
        if (operations[0] == 'transfer') {
            var txAmount = parseFloat(operations[1].amount.split(' ')[0]);
            var txCurrency = operations[1].amount.split(' ')[1];
            var txTo = operations[1].to;

            setTimeout(function () {
                new Transaction(txAmount, true, null, txCurrency);
            }, Math.random() * DELAY_CAP);
        } else if (operations[0] == 'vote') {
            var txAmount = parseInt(operations[1].weight/100);
            var txCurrency = 'Vote';

            setTimeout(function () {
                new Transaction(txAmount, false, null, txCurrency);
            }, Math.random() * DELAY_CAP);
        }
    })

    if (Modernizr.websockets) {

        if (this.connection)
            this.connection.close();

        var connection = new ReconnectingWebSocket('wss://steemd.privex.io');
        this.connection = connection;

        StatusBox.reconnecting("blockchain");

        connection.onopen = function () {
            console.log('WebSocket: Connection open!');
            StatusBox.connected("blockchain");
        }

        connection.onclose = function () {
            console.log('WebSocket: Connection closed');
            if ($("#blockchainCheckBox").prop("checked"))
                StatusBox.reconnecting("blockchain");
            else
                StatusBox.closed("blockchain");
        }

        connection.onerror = function (error) {
            console.log('WebSocket: Connection Error: ' + error);
        }
    } else {
        //WebSockets are not supported.
        console.log("No websocket support.");
        StatusBox.nosupport("blockchain");
    }
}