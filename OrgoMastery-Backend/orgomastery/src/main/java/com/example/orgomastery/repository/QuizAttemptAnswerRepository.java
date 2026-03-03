package com.example.orgomastery.repository;

import com.example.orgomastery.model.QuizAttemptAnswer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizAttemptAnswerRepository extends JpaRepository<QuizAttemptAnswer, Long> {
}
