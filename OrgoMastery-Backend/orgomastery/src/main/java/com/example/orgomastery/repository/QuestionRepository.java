package com.example.orgomastery.repository;

import com.example.orgomastery.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}