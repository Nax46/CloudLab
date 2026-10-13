import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Cloud, Sparkles, X, MessageSquare, RefreshCw } from 'lucide-react';

export const CloudMascot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const mascotRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

  const studentTips = [
    {
      title: 'Exam Pro Tip 💡',
      text: 'Type 1 Hypervisors run directly on Bare-Metal (ESXi, KVM). Type 2 runs on Host OS (VirtualBox)!',
    },
    {
      title: 'Quick Fact 😄',
      text: 'Remember: Cloud Computing is basically someone else’s data center with an automated REST API!',
    },
    {
      title: 'NIST Characteristics 📝',
      text: '5 Pillars to memorize: On-demand, Broad network access, Resource pooling, Rapid elasticity, Measured service.',
    },
    {
      title: 'Storage Rule of Thumb 🗄️',
      text: 'Databases use Block Storage (EBS), Websites use File (EFS), Media/Backups use Object (S3)!',
    },
    {
      title: 'Exam Mantra 🛡️',
      text: 'CIA Triad: Confidentiality (Encryption), Integrity (Hashing), Availability (Redundancy)!',
    },
  ];

  // Gentle floating idle animation using GSAP
  useEffect(() => {
    if (!mascotRef.current || isDismissed) return;

    const ctx = gsap.context(() => {
      gsap.to(mascotRef.current, {
        y: -6,
        rotation: 2,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => ctx.revert();
  }, [isDismissed]);

  // Click bounce reaction
  const handleMascotClick = () => {
    if (!mascotRef.current) return;

    gsap.fromTo(
      mascotRef.current,
      { scale: 0.85, rotation: -8 },
      { scale: 1, rotation: 0, duration: 0.5, ease: 'elastic.out(1.2, 0.4)' }
    );

    setIsOpen((prev) => !prev);
  };

  const nextTip = () => {
    setTipIndex((prev) => (prev + 1) % studentTips.length);
    if (bubbleRef.current) {
      gsap.fromTo(
        bubbleRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.25, ease: 'back.out(1.7)' }
      );
    }
  };

  if (isDismissed) return null;

  return (
    <aside aria-label="Study buddy" className="fixed bottom-5 right-5 z-40 flex flex-col items-end select-none">
      {/* Speech Bubble Tooltip */}
      {isOpen && (
        <div
          ref={bubbleRef}
          className="mb-3 max-w-xs w-72 p-3.5 bg-white border border-blue-200 rounded-2xl shadow-xl space-y-2 text-slate-800 animate-fade-in"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
            <span className="text-[11px] font-bold text-blue-700 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{studentTips[tipIndex].title}</span>
            </span>
            <div className="flex items-center space-x-1">
              <button
                onClick={nextTip}
                className="p-1 rounded text-slate-400 hover:text-blue-600 transition"
                title="Next Tip"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-700 transition"
                title="Close"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            {studentTips[tipIndex].text}
          </p>

          <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1">
            <span>BCA FCC Study Buddy</span>
            <button
              onClick={() => setIsDismissed(true)}
              className="hover:underline text-slate-500"
            >
              Hide
            </button>
          </div>
        </div>
      )}

      {/* Floating Animated Mascot Button */}
      <div
        ref={mascotRef}
        onClick={handleMascotClick}
        className="group relative cursor-pointer flex items-center justify-center"
        title="Click Cloudy for Quick Study Tips!"
      >
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110">
          <Cloud className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-[9px] text-white font-bold">
            !
          </span>
        </div>

        {/* Small floating tag */}
        {!isOpen && (
          <span className="hidden sm:block absolute right-16 px-2.5 py-1 bg-white border border-slate-200 text-slate-700 text-[11px] font-bold rounded-xl shadow-xs whitespace-nowrap opacity-90 group-hover:opacity-100 transition">
            Study Tip 💡
          </span>
        )}
      </div>
    </aside>
  );
};
