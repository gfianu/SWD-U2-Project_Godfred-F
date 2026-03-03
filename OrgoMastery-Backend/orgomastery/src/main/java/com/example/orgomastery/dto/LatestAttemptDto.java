package com.example.orgomastery.dto;

import java.time.LocalDateTime;

public class LatestAttemptDto {

    private Long attemptId;
    private Long quizId;
    private Integer score;
    private Integer total;
    private LocalDateTime createdAt;

    public LatestAttemptDto() {}

    public LatestAttemptDto(Long attemptId, Long quizId, Integer score, Integer total, LocalDateTime createdAt) {
        this.attemptId = attemptId;
        this.quizId = quizId;
        this.score = score;
        this.total = total;
        this.createdAt = createdAt;
    }

    public Long getAttemptId() { return attemptId; }
    public Long getQuizId() { return quizId; }
    public Integer getScore() { return score; }
    public Integer getTotal() { return total; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
