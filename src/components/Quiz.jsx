import React, { useState } from 'react';
import questions from '../Question.js';

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  const handleSelectAnswer = (selectedAnswer) => {
    setUserAnswers((prev) => [...prev, selectedAnswer]);
  };

  const currentQuestion = questions[activeQuestionIndex];

  if (activeQuestionIndex >= questions.length) {
    return (
      <div className="p-4 sm:p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Quiz completed! 🎉
        </h2>
        <p className="text-base sm:text-lg mb-8 text-center text-gray-600 dark:text-gray-100">
          You answered {userAnswers.length} questions.
        </p>

        <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Answers:
        </h3>

        <ul className="space-y-6">
          {questions.map((q, i) => (
            <li
              key={q.id}
              className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 sm:p-6"
            >
              <strong className="text-lg sm:text-xl block mb-2 text-gray-800 dark:text-gray-100">
                {q.text}
              </strong>
              <p className="mb-1 text-gray-700 dark:text-gray-300">
                Your answer: {userAnswers[i] ?? <em>No answer</em>}
              </p>
              <p className="mb-2 text-gray-700 dark:text-gray-300">
                Correct answer: {q.correctAnswer}
              </p>
              {userAnswers[i] === q.correctAnswer ? (
                <span className="text-green-600 font-medium">✅ Correct</span>
              ) : (
                <span className="text-red-600 font-medium">❌ Incorrect</span>
              )}
            </li>
          ))}
        </ul>

        <button
          onClick={() => setUserAnswers([])}
          className="mt-8 py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 mx-auto block"
        >
          Restart quiz
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-2xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100 ">
        {currentQuestion.text}
      </h2>

      <ul className="space-y-4">
        {currentQuestion.answers.map((answer) => (
          <li key={answer} className="flex justify-center">
            <button
              onClick={() => handleSelectAnswer(answer)}
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 text-center">
        <button
          onClick={() => handleSelectAnswer(null)}
          className="py-3 px-6 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default Quiz;
