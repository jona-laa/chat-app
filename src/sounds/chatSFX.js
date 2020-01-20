import UIfx from 'uifx';
import chatSound from '../sounds/pling.wav';
import connectedSound from '../sounds/connected.mp3';

const messageSFX = new UIfx(
    chatSound,
    {
        volume: 0.3,
        throttleMs: 100
    }
)

const connectedSFX = new UIfx(
    connectedSound,
    {
        volume: 0.9,
        throttleMs: 100
    }
)

export {
    messageSFX,
    connectedSFX
};