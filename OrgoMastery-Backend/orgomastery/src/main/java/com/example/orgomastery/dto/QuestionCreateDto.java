package com.example.orgomastery.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class QuestionCreateDto {

    @NotNull
    private Long quizId;

    @NotBlank
    private String prompt;

    @NotBlank
    private String choiceA;

    @NotBlank
    private String choiceB;

    @NotBlank
    private String choiceC;

    @NotBlank
    private String choiceD;

    // "A" / "B" / "C" / "D"
    @NotBlank
    @Pattern(regexp = "^[ABCD]$")
    private String correctChoice;

    // Optional (nice for ordering questions)
    @Min(1)
    @Max(1000)
    private Integer orderIndex;

    public QuestionCreateDto() {}

    public Long getQuizId() { return quizId; }
    public void setQuizId(Long quizId) { this.quizId = quizId; }

    public String getPrompt() { return prompt; }
    public void setPrompt(String prompt) { this.prompt = prompt; }

    public String getChoiceA() { return choiceA; }
    public void setChoiceA(String choiceA) { this.choiceA = choiceA; }

    public String getChoiceB() { return choiceB; }
    public void setChoiceB(String choiceB) { this.choiceB = choiceB; }

    public String getChoiceC() { return choiceC; }
    public void setChoiceC(String choiceC) { this.choiceC = choiceC; }

    public String getChoiceD() { return choiceD; }
    public void setChoiceD(String choiceD) { this.choiceD = choiceD; }

    public String getCorrectChoice() { return correctChoice; }
    public void setCorrectChoice(String correctChoice) { this.correctChoice = correctChoice; }

    public Integer getOrderIndex() { return orderIndex; }
    public void setOrderIndex(Integer orderIndex) { this.orderIndex = orderIndex; }
}
