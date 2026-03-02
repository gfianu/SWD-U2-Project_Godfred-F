package com.example.orgomastery.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public class AttemptCreateDto {

    @NotEmpty
    @Valid
    private List<AttemptAnswerDto> answers;

    public AttemptCreateDto() {}

    public AttemptCreateDto(List<AttemptAnswerDto> answers) {
        this.answers = answers;
    }

    public List<AttemptAnswerDto> getAnswers() { return answers; }
    public void setAnswers(List<AttemptAnswerDto> answers) { this.answers = answers; }
}
