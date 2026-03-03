package com.example.orgomastery.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class QuestionUpdateDto {

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

    @NotBlank
    @Pattern(regexp = "^[ABCD]$")
    private String correctChoice;

    @Min(1)
    @Max(1000)
    private Integer orderIndex;

    public QuestionUpdateDto() {}

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
