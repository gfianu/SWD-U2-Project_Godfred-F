package com.example.orgomastery.controller;

import com.example.orgomastery.dto.LectureNoteCreateRequest;
import com.example.orgomastery.dto.LectureNoteDto;
import com.example.orgomastery.dto.LectureNoteUpdateRequest;
import com.example.orgomastery.model.Lecture;
import com.example.orgomastery.model.LectureNote;
import com.example.orgomastery.repository.LectureNoteRepository;
import com.example.orgomastery.repository.LectureRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:5173")
public class LectureNoteController {

    private final LectureNoteRepository lectureNoteRepository;
    private final LectureRepository lectureRepository;

    public LectureNoteController(
            LectureNoteRepository lectureNoteRepository,
            LectureRepository lectureRepository
    ) {
        this.lectureNoteRepository = lectureNoteRepository;
        this.lectureRepository = lectureRepository;
    }

    @PostMapping
    public ResponseEntity<?> createNote(@Valid @RequestBody LectureNoteCreateRequest request) {
        Lecture lecture = lectureRepository.findById(request.getLectureId()).orElse(null);
        if (lecture == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Lecture not found");
        }

        LectureNote note = new LectureNote();
        note.setLecture(lecture);
        note.setName(request.getName().trim());
        note.setNoteUrl(trimToNull(request.getNoteUrl()));
        note.setKeyUrl(trimToNull(request.getKeyUrl()));
        note.setOrderIndex(request.getOrderIndex());

        LectureNote saved = lectureNoteRepository.save(note);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new LectureNoteDto(
                        saved.getId(),
                        saved.getName(),
                        saved.getNoteUrl(),
                        saved.getKeyUrl()
                ));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateNote(
            @PathVariable Long id,
            @Valid @RequestBody LectureNoteUpdateRequest request
    ) {
        LectureNote note = lectureNoteRepository.findById(id).orElse(null);
        if (note == null) {
            return ResponseEntity.notFound().build();
        }

        note.setName(request.getName().trim());
        note.setNoteUrl(trimToNull(request.getNoteUrl()));
        note.setKeyUrl(trimToNull(request.getKeyUrl()));
        note.setOrderIndex(request.getOrderIndex());

        LectureNote saved = lectureNoteRepository.save(note);

        return ResponseEntity.ok(new LectureNoteDto(
                saved.getId(),
                saved.getName(),
                saved.getNoteUrl(),
                saved.getKeyUrl()
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable Long id) {
        LectureNote note = lectureNoteRepository.findById(id).orElse(null);
        if (note == null) {
            return ResponseEntity.notFound().build();
        }

        lectureNoteRepository.delete(note);
        return ResponseEntity.noContent().build();
    }

    private String trimToNull(String value) {
        if (value == null) return null;
        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}
