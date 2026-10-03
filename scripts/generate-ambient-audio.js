import fs from 'fs';
import path from 'path';

// Generate a high quality 16-bit stereo 44.1kHz WAV file
// Containing gentle forest breeze, soft warm chimes, and calming resonance
const sampleRate = 44100;
const durationSeconds = 14;
const totalSamples = sampleRate * durationSeconds;

const buffer = Buffer.alloc(44 + totalSamples * 4); // 2 channels * 2 bytes per sample

// WAV Header
function writeString(offset, string) {
  for (let i = 0; i < string.length; i++) {
    buffer.writeUInt8(string.charCodeAt(i), offset + i);
  }
}

writeString(0, 'RIFF');
buffer.writeUInt32LE(36 + totalSamples * 4, 4);
writeString(8, 'WAVE');
writeString(12, 'fmt ');
buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
buffer.writeUInt16LE(1, 20);  // AudioFormat (1 for PCM)
buffer.writeUInt16LE(2, 22);  // NumChannels (2)
buffer.writeUInt32LE(sampleRate, 24);
buffer.writeUInt32LE(sampleRate * 4, 28); // ByteRate
buffer.writeUInt16LE(4, 32);  // BlockAlign (4 bytes per sample frame)
buffer.writeUInt16LE(16, 34); // BitsPerSample
writeString(36, 'data');
buffer.writeUInt32LE(totalSamples * 4, 40);

// Sound synthesis parameters
// Chime notes: Pentatonic / Harmonic series (E5, G#5, B5, D#6, E6, G#6)
const chimeEvents = [
  { time: 0.8, freq: 659.25, pan: -0.3, vol: 0.28 },  // E5
  { time: 2.1, freq: 830.61, pan: 0.35, vol: 0.22 },  // G#5
  { time: 3.6, freq: 987.77, pan: -0.2, vol: 0.26 },  // B5
  { time: 5.2, freq: 1244.51, pan: 0.4, vol: 0.18 },  // D#6
  { time: 6.8, freq: 659.25, pan: 0.1, vol: 0.24 },   // E5
  { time: 8.5, freq: 830.61, pan: -0.35, vol: 0.22 }, // G#5
  { time: 10.2, freq: 1318.51, pan: 0.25, vol: 0.16 }, // E6
  { time: 11.8, freq: 987.77, pan: -0.15, vol: 0.20 }, // B5
];

// Seeded pseudo-random for pink noise
let seed = 42;
function random() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}

// Low-pass filtered pink noise for gentle morning breeze
let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
let lastL = 0, lastR = 0;

for (let i = 0; i < totalSamples; i++) {
  const t = i / sampleRate;

  // 1. Gentle forest breeze (smooth pink noise with slow breathing envelope)
  const white = (random() * 2 - 1);
  b0 = 0.99886 * b0 + white * 0.0555179;
  b1 = 0.99332 * b1 + white * 0.0750759;
  b2 = 0.96900 * b2 + white * 0.1538520;
  b3 = 0.86650 * b3 + white * 0.3104856;
  b4 = 0.55000 * b4 + white * 0.5329522;
  b5 = -0.7616 * b5 - white * 0.0168980;
  const pink = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.025;
  b6 = white * 0.115926;

  // Gentle breathing modulation (0.2 Hz)
  const breezeLfo = 0.5 + 0.5 * Math.sin(2 * Math.PI * 0.12 * t);
  const breeze = pink * breezeLfo * 0.45;

  // 2. Warm ambient pad drone (subtle warm fundamental: 164.81 Hz E3 & 246.94 Hz B3)
  const drone1 = Math.sin(2 * Math.PI * 164.81 * t) * 0.018;
  const drone2 = Math.sin(2 * Math.PI * 246.94 * t) * 0.012;
  const drone = (drone1 + drone2) * (0.8 + 0.2 * Math.sin(2 * Math.PI * 0.08 * t));

  // 3. Gentle harmonic bell chimes
  let chimeSampleL = 0;
  let chimeSampleR = 0;

  for (const chime of chimeEvents) {
    const elapsed = t - chime.time;
    if (elapsed > 0 && elapsed < 5.5) {
      // Exponential decay
      const decay = Math.exp(-elapsed * 1.35);
      
      // Chime tone: fundamental + harmonic overtones (chime/bell physics)
      const f = chime.freq;
      const o1 = Math.sin(2 * Math.PI * f * elapsed);
      const o2 = Math.sin(2 * Math.PI * (f * 2.76) * elapsed) * 0.35 * Math.exp(-elapsed * 2.2);
      const o3 = Math.sin(2 * Math.PI * (f * 5.4) * elapsed) * 0.15 * Math.exp(-elapsed * 3.5);
      
      // Gentle shimmer (vibrato/beating)
      const tremolo = 1 + 0.15 * Math.sin(2 * Math.PI * 4.5 * elapsed);

      const tone = (o1 + o2 + o3) * decay * tremolo * chime.vol * 0.35;

      // Panning
      const panL = Math.cos((chime.pan + 1) * Math.PI / 4);
      const panR = Math.sin((chime.pan + 1) * Math.PI / 4);

      chimeSampleL += tone * panL;
      chimeSampleR += tone * panR;
    }
  }

  // Smooth loop fade in/out at extremities
  let edgeFade = 1.0;
  if (t < 0.6) {
    edgeFade = t / 0.6;
  } else if (t > durationSeconds - 0.6) {
    edgeFade = (durationSeconds - t) / 0.6;
  }

  let sampleL = (breeze * 0.9 + drone + chimeSampleL) * edgeFade;
  let sampleR = (breeze * 1.1 + drone + chimeSampleR) * edgeFade;

  // Subtle 1-pole low pass filter smoothing
  lastL = lastL + 0.4 * (sampleL - lastL);
  lastR = lastR + 0.4 * (sampleR - lastR);

  // Soft clip limiter
  sampleL = Math.max(-0.95, Math.min(0.95, lastL));
  sampleR = Math.max(-0.95, Math.min(0.95, lastR));

  const offset = 44 + i * 4;
  buffer.writeInt16LE(Math.round(sampleL * 32767), offset);
  buffer.writeInt16LE(Math.round(sampleR * 32767), offset + 2);
}

const outputPath = path.resolve('public/ambient-garden-chimes.wav');
fs.writeFileSync(outputPath, buffer);
console.log(`Generated ${outputPath} (${buffer.length} bytes) successfully!`);
