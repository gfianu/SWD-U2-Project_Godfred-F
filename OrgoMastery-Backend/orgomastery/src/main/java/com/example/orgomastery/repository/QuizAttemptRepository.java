package com.example.orgomastery.repository;

import com.example.orgomastery.model.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {

    Optional<QuizAttempt> findTopByQuizIdAndUserIdOrderByCreatedAtDesc(Long quizId, Long userId);

    List<QuizAttempt> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<QuizAttempt> findByQuizIdAndUserIdOrderByCreatedAtDesc(Long quizId, Long userId);

    List<QuizAttempt> findByQuizIdOrderByCreatedAtDesc(Long quizId);
}
