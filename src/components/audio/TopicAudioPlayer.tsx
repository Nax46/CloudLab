import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw } from 'lucide-react';

interface TopicAudioPlayerProps {
  title: string;
  summaryText: string;
  keyPoints?: string[];
}

export const TopicAudioPlayer: React.FC<TopicAudioPlayerProps> = ({
  title,
  summaryText,
  keyPoints,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState<number>(1.0);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [title]);

  const fullSpeechText = `Topic: ${title}. ${summaryText}. Key takeaways: ${
    keyPoints && keyPoints.length > 0 ? keyPoints.join('. ') : ''
  }`;

  const handlePlay = () => {
    if (!isSupported) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(fullSpeechText);
    utterance.rate = rate;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const naturalVoice =
      voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google'))) ||
      voices.find((v) => v.lang.startsWith('en'));
    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (!isSupported) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const cycleRate = () => {
    const rates = [1.0, 1.25, 1.5];
    const nextRate = rates[(rates.indexOf(rate) + 1) % rates.length];
    setRate(nextRate);
    if (isPlaying) {
      handleStop();
    }
  };

  if (!isSupported) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs my-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
          <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-bounce text-blue-700' : ''}`} />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-900 tracking-wide">
              Audio Lecture Summary
            </span>
            <span className="text-[10px] font-semibold text-blue-700 px-1.5 py-0.2 rounded bg-blue-50 border border-blue-200">
              Read Aloud
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Listen to an audio explanation of key syllabus points while viewing the 3D model
          </p>
        </div>
      </div>

      {/* Audio Controls */}
      <div className="flex items-center space-x-2">
        {isPlaying && (
          <div className="flex items-center space-x-1 mr-2 h-4">
            <span className="w-1 bg-blue-600 h-2 animate-pulse rounded-full" />
            <span className="w-1 bg-blue-600 h-4 animate-pulse delay-75 rounded-full" />
            <span className="w-1 bg-blue-600 h-3 animate-pulse delay-150 rounded-full" />
            <span className="w-1 bg-blue-600 h-4 animate-pulse rounded-full" />
          </div>
        )}

        {isPlaying ? (
          <button
            onClick={handlePause}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 text-xs font-semibold transition"
          >
            <Pause className="w-3.5 h-3.5 text-amber-700" />
            <span>Pause</span>
          </button>
        ) : (
          <button
            onClick={handlePlay}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isPaused ? 'Resume' : 'Listen Lecture'}</span>
          </button>
        )}

        <button
          onClick={handleStop}
          disabled={!isPlaying && !isPaused}
          className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200 disabled:opacity-40 transition"
          title="Stop Audio"
        >
          <VolumeX className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={cycleRate}
          className="px-2 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 text-xs font-mono font-bold hover:bg-slate-200 transition"
          title="Playback Speed"
        >
          {rate}x
        </button>
      </div>
    </div>
  );
};
