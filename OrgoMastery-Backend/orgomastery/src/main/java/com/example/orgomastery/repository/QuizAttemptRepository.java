package com.example.orgomastery.repository;

import com.example.orgomastery.model.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {

    Optional<QuizAttempt> findTopByQuizIdOrderByCreatedAtDesc(Long quizId);
}
