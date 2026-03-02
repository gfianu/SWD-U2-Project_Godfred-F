package com.example.orgomastery.dto;

import java.util.List;

public class AttemptResultDto {

    private Long quizId;
    private int score;
    private int total;
    private List<IncorrectAnswerDto> incorrect;

    public AttemptResultDto() {}

    public AttemptResultDto(Long quizId, int score, int total, List<IncorrectAnswerDto> incorrect) {
        this.quizId = quizId;
        this.score = score;
        this.total = total;
        this.incorrect = incorrect;
    }

    public Long getQuizId() { return quizId; }
    public int getScore() { return score; }
    public int getTotal() { return total; }
    public List<IncorrectAnswerDto> getIncorrect() { return incorrect; }
}