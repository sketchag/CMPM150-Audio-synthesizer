const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let oscillator, gainNode;

function startSound() {
    oscillator = audioCtx.createOscillator();
    gainNode = audioCtx.createGain();

    updateParameters();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
}

function stopSound() {
    if (oscillator) {
        oscillator.stop();
        oscillator.disconnect();
    }
}

function updateParameters() {
    if (oscillator) {
        const waveform = document.getElementById('waveform').value;
        const volume = document.getElementById('volume').value;
        const frequency = document.getElementById('frequency').value;
        const detune = document.getElementById('detune').value;

        oscillator.type = waveform;
        oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
        oscillator.detune.setValueAtTime(detune, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    }
}

document.getElementById('waveform').addEventListener('change', updateParameters);
document.getElementById('volume').addEventListener('input', updateParameters);
document.getElementById('frequency').addEventListener('input', updateParameters);
document.getElementById('detune').addEventListener('input', updateParameters);

document.getElementById('startBtn').addEventListener('click', startSound);
document.getElementById('stopBtn').addEventListener('click', stopSound);
