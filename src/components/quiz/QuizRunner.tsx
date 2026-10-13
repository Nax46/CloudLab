import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, AlertCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { Quiz, QuizQuestion } from '../../types/database';
import { useData } from '../../context/DataContext';

interface QuizRunnerProps {
  quiz: Quiz;
  questions?: QuizQuestion[];
  onComplete?: (score: number, total: number) => void;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({ quiz, questions: propQuestions, onComplete }) => {
  const { saveQuizScore } = useData();
  const questions = propQuestions || quiz.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
        No quiz questions available for this unit yet.
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const isCorrect = selectedOption === currentQ.correct_answer;

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    setUserAnswers((prev) => ({ ...prev, [currentIndex]: selectedOption }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      let finalScore = 0;
      questions.forEach((q, idx) => {
        if (userAnswers[idx] === q.correct_answer) {
          finalScore++;
        }
      });
      if (selectedOption === currentQ.correct_answer) {
        finalScore++;
      }

      setIsFinished(true);
      saveQuizScore(quiz.id || quiz.title, finalScore, questions.length);

      if (onComplete) {
        onComplete(finalScore, questions.length);
      }

      if (finalScore / questions.length >= 0.7) {
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch {
          // Ignore confetti errors
        }
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserAnswers({});
    setIsFinished(false);
  };

  // Completion Summary Screen
  if (isFinished) {
    let finalScore = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct_answer) {
        finalScore++;
      }
    });
    const percentage = Math.round((finalScore / questions.length) * 100);

    return (
      <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-6 max-w-xl mx-auto shadow-md animate-fade-in text-slate-900">
        <div className="w-16 h-16 mx-auto rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xs">
          <Award className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-900">Quiz Completed!</h3>
          <p className="text-xs text-slate-500">{quiz.title}</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex justify-around items-center">
          <div>
            <div className="text-3xl font-extrabold text-blue-600">
              {finalScore} <span className="text-sm font-normal text-slate-500">/ {questions.length}</span>
            </div>
            <div className="text-[11px] text-slate-500 uppercase font-bold tracking-wider mt-1">Total Score</div>
          </div>
          <div className="h-10 w-[1px] bg-slate-200" />
          <div>
            <div className={`text-3xl font-extrabold ${percentage >= 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
              {percentage}%
            </div>
            <div className="text-[11px] text-slate-500 uppercase font-bold tracking-wider mt-1">Percentage</div>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {percentage >= 80
            ? 'Outstanding! You have mastered the core fundamentals for this syllabus unit.'
            : percentage >= 60
            ? 'Good work! Review the syllabus explanations to reinforce weaker points.'
            : 'Review the lessons and retake the quiz to strengthen your exam preparation.'}
        </p>

        <div className="pt-2 flex justify-center space-x-3">
          <button
            onClick={handleRestart}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 md:p-7 rounded-2xl bg-white border border-slate-200 space-y-6 shadow-xs text-slate-900">
      {/* Quiz Header & Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-blue-700 uppercase tracking-wider">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
            {currentQ.difficulty || 'medium'}
          </span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Text */}
      <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
        {currentQ.question}
      </div>

      {/* Options List */}
      <div className="space-y-2.5">
        {currentQ.options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          let optionStyles = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

          if (isAnswerSubmitted) {
            if (idx === currentQ.correct_answer) {
              optionStyles = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
            } else if (isSelected) {
              optionStyles = 'border-red-500 bg-red-50 text-red-950 font-semibold';
            } else {
              optionStyles = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-60';
            }
          } else if (isSelected) {
            optionStyles = 'border-blue-600 bg-blue-50/60 text-blue-900 font-semibold shadow-2xs';
          }

          return (
            <button
              key={idx}
              onClick={() => {
                if (!isAnswerSubmitted) {
                  setSelectedOption(idx);
                }
              }}
              disabled={isAnswerSubmitted}
              className={`w-full text-left p-3.5 rounded-xl border transition flex items-center justify-between text-xs sm:text-sm ${optionStyles}`}
            >
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-mono font-bold text-slate-700 shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </div>

              {isAnswerSubmitted && idx === currentQ.correct_answer && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
              {isAnswerSubmitted && isSelected && idx !== currentQ.correct_answer && (
                <XCircle className="w-4 h-4 text-red-600 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Box */}
      {isAnswerSubmitted && (
        <div
          className={`p-4 rounded-xl border text-xs leading-relaxed animate-fade-in ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}
        >
          <div className="flex items-center space-x-1.5 font-bold mb-1">
            <AlertCircle className="w-4 h-4" />
            <span>{isCorrect ? 'Correct Answer!' : 'Explanation & Exam Note:'}</span>
          </div>
          <p className="text-slate-800">{currentQ.explanation}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end pt-2">
        {!isAnswerSubmitted ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedOption === null}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold shadow-xs transition"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center space-x-1 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition"
          >
            <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'View Results'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
