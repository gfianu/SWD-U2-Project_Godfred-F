package com.example.orgomastery.repository;

import com.example.orgomastery.model.LectureNote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LectureNoteRepository extends JpaRepository<LectureNote, Long> {
}
