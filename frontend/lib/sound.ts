export const playClickSound = async () => {
  try {
    const audio = new Audio("/sounds/click.mp3");
    audio.volume = 0.5;
    await audio.play().catch(() => {
      generateClickSound();
    });
  } catch (error) {
    generateClickSound();
  }
};

export const playMouseClickSound = async () => {
  try {
    const audio = new Audio("/sounds/mouse-click.mp3");
    audio.volume = 0.6;
    await audio.play().catch(() => {
      generateMouseClickSound();
    });
  } catch (error) {
    generateMouseClickSound();
  }
};

const generateClickSound = () => {
  try {
    const audioContext = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();
    const now = audioContext.currentTime;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 500;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.08, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

    oscillator.start(now);
    oscillator.stop(now + 0.1);
  } catch (error) {
    console.debug("Click sound error:", error);
  }
};

const generateMouseClickSound = () => {
  try {
    const audioContext = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();
    const now = audioContext.currentTime;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 1200;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.15, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

    oscillator.start(now);
    oscillator.stop(now + 0.08);
  } catch (error) {
    console.debug("Mouse click sound error:", error);
  }
};
