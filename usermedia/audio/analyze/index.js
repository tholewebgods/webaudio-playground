
(function() {
	const silence = (sample) => sample.filter((value) => value !== 0).length === 0;

	const stateEl = document.querySelector("#state");

	navigator.mediaDevices
		.getUserMedia({ audio: true })
		.then((stream) => {
			const tracks = stream.getAudioTracks();
			const audioCtx = new AudioContext();
			const source = audioCtx.createMediaStreamSource(stream);
			const analyzer = audioCtx.createAnalyser();
			const sampleData = new Float32Array(analyzer.frequencyBinCount);

			console.log("Got permission. stream=", stream);
			console.log("Audio tracks:", tracks);
			console.log("Audio source:", source);

			source.connect(analyzer);

			setInterval(() => {
				analyzer.getFloatTimeDomainData(sampleData);

				stateEl.innerText = `${silence(sampleData) ? "🔇" : "🔈"}`;
			}, 500);
		});

})();

// IFEE immediate function exection expression
