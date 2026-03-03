// src/main/java/com/example/orgomastery/dto/QuestionAdminDto.java
package com.example.orgomastery.dto;

public class QuestionAdminDto {

    private Long id;
    private Long quizId;
    private String prompt;
    private String choiceA;
    private String choiceB;
    private String choiceC;
    private String choiceD;
    private String correctChoice;
    private Integer orderIndex;

    public QuestionAdminDto() {}

    public QuestionAdminDto(Long id, Long quizId, String prompt,
                            String choiceA, String choiceB, String choiceC, String choiceD,
                            String correctChoice, Integer orderIndex) {
        this.id = id;
        this.quizId = quizId;
        this.prompt = prompt;
        this.choiceA = choiceA;
        this.choiceB = choiceB;
        this.choiceC = choiceC;
        this.choiceD = choiceD;
        this.correctChoice = correctChoice;
        this.orderIndex = orderIndex;
    }

    public Long getId() { return id; }
    public Long getQuizId() { return quizId; }
    public String getPrompt() { return prompt; }
    public String getChoiceA() { return choiceA; }
    public String getChoiceB() { return choiceB; }
    public String getChoiceC() { return choiceC; }
    public String getChoiceD() { return choiceD; }
    public String getCorrectChoice() { return correctChoice; }
    public Integer getOrderIndex() { return orderIndex; }
}
