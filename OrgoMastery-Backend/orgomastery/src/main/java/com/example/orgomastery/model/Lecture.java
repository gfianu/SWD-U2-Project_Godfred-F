// src/main/java/com/example/orgomastery/model/Lecture.java
package com.example.orgomastery.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "lectures")
public class Lecture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    // Optional: control ordering in sidebar
    private Integer orderIndex;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @OneToMany(
            mappedBy = "lecture",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    @OrderBy("orderIndex ASC, id ASC")
    private List<LectureVideo> videos = new ArrayList<>();

    @OneToMany(
            mappedBy = "lecture",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    @OrderBy("orderIndex ASC, id ASC")
    private List<LectureNote> notes = new ArrayList<>();

    @OneToMany(
            mappedBy = "lecture",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    @OrderBy("id ASC")
    private List<Quiz> quizzes = new ArrayList<>();

    public Lecture() {}

    public Lecture(String title) {
        this.title = title;
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

    // --- Convenience methods (optional, but nice) ---
    public void addVideo(LectureVideo video) {
        videos.add(video);
        video.setLecture(this);
    }

    public void removeVideo(LectureVideo video) {
        videos.remove(video);
        video.setLecture(null);
    }

    public void addNote(LectureNote note) {
        notes.add(note);
        note.setLecture(this);
    }

    public void removeNote(LectureNote note) {
        notes.remove(note);
        note.setLecture(null);
    }

    public void addQuiz(Quiz quiz) {
        quizzes.add(quiz);
        quiz.setLecture(this);
    }

    public void removeQuiz(Quiz quiz) {
        quizzes.remove(quiz);
        quiz.setLecture(null);
    }

    // --- Getters/Setters ---
    public Long getId() { return id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public Integer getOrderIndex() { return orderIndex; }
    public void setOrderIndex(Integer orderIndex) { this.orderIndex = orderIndex; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public List<LectureVideo> getVideos() { return videos; }
    public void setVideos(List<LectureVideo> videos) { this.videos = videos; }

    public List<LectureNote> getNotes() { return notes; }
    public void setNotes(List<LectureNote> notes) { this.notes = notes; }

    public List<Quiz> getQuizzes() { return quizzes; }
    public void setQuizzes(List<Quiz> quizzes) { this.quizzes = quizzes; }
}
