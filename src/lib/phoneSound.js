// Generates phone ring sounds using Web Audio API — no external files needed.

let audioCtx = null;
let activeNodes = [];
let loopTimer = null;

function getCtx() {
  if (typeof window === 'undefined') return null;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  } catch {
    return null;
  }
}

function clearActive() {
  if (loopTimer) { clearInterval(loopTimer); loopTimer = null; }
  activeNodes.forEach((n) => { try { n.stop?.(); n.disconnect?.(); } catch {} });
  activeNodes = [];
}

function playTone(frequencies, durationSec, volume = 0.2) {
  const ctx = getCtx();
  if (!ctx) return;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.setValueAtTime(volume, ctx.currentTime + durationSec - 0.05);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + durationSec);
  gain.connect(ctx.destination);
  activeNodes.push(gain);
  frequencies.forEach((freq) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;
    osc.connect(gain);
    osc.start();
    osc.stop(ctx.currentTime + durationSec);
    activeNodes.push(osc);
  });
}

// US ringback tone: 440+480 Hz, 2 s on / 4 s off (what the CALLER hears)
export function startRingbackTone() {
  clearActive();
  const burst = () => playTone([440, 480], 2, 0.18);
  burst();
  loopTimer = setInterval(burst, 6000);
}

// Ringtone: 480+620 Hz double-burst (what the RECEIVER hears)
export function startRingtone() {
  clearActive();
  const burst = () => {
    playTone([480, 620], 0.8, 0.28);
    setTimeout(() => playTone([480, 620], 0.8, 0.28), 1100);
  };
  burst();
  loopTimer = setInterval(burst, 4500);
}

export function stopPhoneSound() {
  clearActive();
}
