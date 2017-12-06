function Block(height, numTransactions, blockSize) {
	Floatable.call(this);

	var size = parseFloat(blockSize) / parseFloat("1024");
	var blockSizeKB = size.toFixed(2) + " KB";

	this.width = this.height = 500;

	this.addImage(blockImage, this.width, this.height);
	this.addText("Block #" + height + "<br />Number of Transactions: " + numTransactions + "<br />Block Size: " + blockSizeKB);
	this.initPosition();

	// Sound
	Sound.playRandomSwell();
}

extend(Floatable, Block);
