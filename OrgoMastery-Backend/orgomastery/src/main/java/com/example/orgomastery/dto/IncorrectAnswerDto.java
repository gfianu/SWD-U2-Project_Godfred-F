package com.example.orgomastery.dto;

public class IncorrectAnswerDto {

    private Long questionId;
    private String prompt;
    private String yourAnswer;
    private String correctAnswer;

    public IncorrectAnswerDto() {}

    public IncorrectAnswerDto(Long questionId, String prompt, String yourAnswer, String correctAnswer) {
        this.questionId = questionId;
        this.prompt = prompt;
        this.yourAnswer = yourAnswer;
        this.correctAnswer = correctAnswer;
    }

    public Long getQuestionId() { return questionId; }
    public String getPrompt() { return prompt; }
    public String getYourAnswer() { return yourAnswer; }
    public String getCorrectAnswer() { return correctAnswer; }
}
