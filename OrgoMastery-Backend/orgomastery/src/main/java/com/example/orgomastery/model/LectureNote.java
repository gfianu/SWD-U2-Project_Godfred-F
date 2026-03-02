package com.example.orgomastery.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "lecture_notes")
public class LectureNote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many notes belong to one lecture
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "lecture_id", nullable = false)
    private Lecture lecture;

    @Column(nullable = false, length = 255)
    private String name;

    @Lob
    private String noteUrl; // nullable = not uploaded yet

    @Lob
    private String keyUrl;  // nullable

    private Integer orderIndex;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public LectureNote() {}

    public LectureNote(String name, String noteUrl, String keyUrl) {
        this.name = name;
        this.noteUrl = noteUrl;
        this.keyUrl = keyUrl;
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

    public Lecture getLecture() { return lecture; }
    public void setLecture(Lecture lecture) { this.lecture = lecture; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getNoteUrl() { return noteUrl; }
    public void setNoteUrl(String noteUrl) { this.noteUrl = noteUrl; }

    public String getKeyUrl() { return keyUrl; }
    public void setKeyUrl(String keyUrl) { this.keyUrl = keyUrl; }

    public Integer getOrderIndex() { return orderIndex; }
    public void setOrderIndex(Integer orderIndex) { this.orderIndex = orderIndex; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
