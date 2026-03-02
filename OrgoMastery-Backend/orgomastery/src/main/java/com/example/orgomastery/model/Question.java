// src/main/java/com/example/orgomastery/model/Question.java
package com.example.orgomastery.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many questions belong to one quiz
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;

    @Lob
    @Column(nullable = false)
    private String prompt;

    @Lob
    @Column(nullable = false)
    private String choiceA;

    @Lob
    @Column(nullable = false)
    private String choiceB;

    @Lob
    @Column(nullable = false)
    private String choiceC;

    @Lob
    @Column(nullable = false)
    private String choiceD;

    /**
     * Store correct choice as "A", "B", "C", or "D"
     */
    @Column(nullable = false, length = 1)
    private String correctChoice;

    @Lob
    private String explanation; // optional

    private Integer orderIndex;

    @Column(nullable = false)
    private boolean isAiGenerated = false;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public Question() {}

    public Question(String prompt, String choiceA, String choiceB, String choiceC, String choiceD, String correctChoice) {
        this.prompt = prompt;
        this.choiceA = choiceA;
        this.choiceB = choiceB;
        this.choiceC = choiceC;
        this.choiceD = choiceD;
        this.correctChoice = correctChoice;
    }

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // --- Getters/Setters ---
    public Long getId() { return id; }

    public Quiz getQuiz() { return quiz; }
    public void setQuiz(Quiz quiz) { this.quiz = quiz; }

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

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public Integer getOrderIndex() { return orderIndex; }
    public void setOrderIndex(Integer orderIndex) { this.orderIndex = orderIndex; }

    public boolean isAiGenerated() { return isAiGenerated; }
    public void setAiGenerated(boolean aiGenerated) { isAiGenerated = aiGenerated; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
