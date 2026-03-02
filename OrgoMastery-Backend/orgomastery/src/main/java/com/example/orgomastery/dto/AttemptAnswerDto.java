package com.example.orgomastery.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class AttemptAnswerDto {

    @NotNull
    private Long questionId;

    @NotNull
    @Min(0)
    @Max(3)
    private Integer selectedIndex;

    public AttemptAnswerDto() {}

    public AttemptAnswerDto(Long questionId, Integer selectedIndex) {
        this.questionId = questionId;
        this.selectedIndex = selectedIndex;
    }

    public Long getQuestionId() { return questionId; }
    public void setQuestionId(Long questionId) { this.questionId = questionId; }

    public Integer getSelectedIndex() { return selectedIndex; }
    public void setSelectedIndex(Integer selectedIndex) { this.selectedIndex = selectedIndex; }
}
