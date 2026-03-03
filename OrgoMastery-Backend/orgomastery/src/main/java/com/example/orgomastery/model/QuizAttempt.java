package com.example.orgomastery.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "quiz_attempts")
public class QuizAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many attempts belong to one quiz
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    // Later: attach to User (nullable for now)
    // private Long userId;

    @Column(nullable = false)
    private Integer score;

    @Column(nullable = false)
    private Integer total;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @OneToMany(
            mappedBy = "attempt",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    private List<QuizAttemptAnswer> answers = new ArrayList<>();

    public QuizAttempt() {}

    public QuizAttempt(Quiz quiz, Integer score, Integer total) {
        this.quiz = quiz;
        this.score = score;
        this.total = total;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public void addAnswer(QuizAttemptAnswer answer) {
        answers.add(answer);
        answer.setAttempt(this);
    }

    // --- Getters/Setters ---
    public Long getId() { return id; }

    public Quiz getQuiz() { return quiz; }
    public void setQuiz(Quiz quiz) { this.quiz = quiz; }

    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }

    public Integer getTotal() { return total; }
    public void setTotal(Integer total) { this.total = total; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public List<QuizAttemptAnswer> getAnswers() { return answers; }
    public void setAnswers(List<QuizAttemptAnswer> answers) { this.answers = answers; }
}
