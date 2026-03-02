package com.example.orgomastery.repository;

import com.example.orgomastery.model.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LectureRepository extends JpaRepository<Lecture, Long> {

    // For a stable sidebar order (orderIndex optional)
    List<Lecture> findAllByOrderByOrderIndexAscIdAsc();
}
