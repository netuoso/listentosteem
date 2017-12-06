function Transaction(steemAmount, highlight, currency, currencyName) {
	Floatable.call(this);

	this.area = steemAmount * 100 + 3000;
	this.width = this.height = Math.sqrt(this.area / Math.PI) * 2;

	this.addImage(bubbleImage, this.width, this.height);
	
	var steemString = steemAmount.toFixed(3) + ' ' + currencyName;
	
	if (steemString == "&#321;0.00")
	steemString = "<&#321;0.01";
	
	if (!highlight) {
		this.addText(steemString);
	} else {
		this.addText('<span style="color: yellow;">' + steemString + '</span><br /><span style="color: cyan;">Donation</span><br /><span style="color: lime;">Thanks!</span>');
	}
	this.initPosition();

	// Sound
	var maxSteem = 1000;
	var minVolume = 0.3;
	var maxVolume = 0.7;
	var volume = steemAmount / (maxSteem / (maxVolume - minVolume)) + minVolume;
	if (volume > maxVolume)
		volume = maxVolume;
	
	var maxPitch = 100.0;
	// We need to use a log that makes it so that maxSteem reaches the maximum pitch.
	// Well, the opposite of the maximum pitch. Anyway. So we solve:
	// maxPitch = log(maxSteem + logUsed) / log(logUsed)
	// For maxPitch = 100 (for 100%) and maxSteem = 1000, that gives us...
	var logUsed = 1.0715307808111486871978099;
	// So we find the smallest value between log(bitcoins + logUsed) / log(logUsed) and our max pitch...
	var pitch = Math.min(maxPitch, Math.log(steemAmount + logUsed) / Math.log(logUsed));
	// ...we invert it so that a bigger transaction = a deeper noise...
	pitch = maxPitch - pitch;
	// ...and we play the sound!
	if(globalScalePitch) {
		Sound.playPitchAtVolume(volume, pitch);
	} else {
		Sound.playRandomAtVolume(volume);
	}
}

extend(Floatable, Transaction);
