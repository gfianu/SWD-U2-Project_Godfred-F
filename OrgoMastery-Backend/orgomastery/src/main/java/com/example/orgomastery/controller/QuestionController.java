package com.example.orgomastery.controller;

import com.example.orgomastery.dto.QuestionAdminDto;
import com.example.orgomastery.dto.QuestionCreateDto;
import com.example.orgomastery.dto.QuestionUpdateDto;
import com.example.orgomastery.model.Question;
import com.example.orgomastery.model.Quiz;
import com.example.orgomastery.repository.QuestionRepository;
import com.example.orgomastery.repository.QuizRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "http://localhost:5173")
public class QuestionController {

    private final QuestionRepository questionRepository;
    private final QuizRepository quizRepository;

    public QuestionController(QuestionRepository questionRepository, QuizRepository quizRepository) {
        this.questionRepository = questionRepository;
        this.quizRepository = quizRepository;
    }

    // -------------------------
    // CREATE
    // -------------------------
    @PostMapping
    @Transactional
    public ResponseEntity<QuestionAdminDto> create(@Valid @RequestBody QuestionCreateDto body) {

        Quiz quiz = quizRepository.findById(body.getQuizId()).orElse(null);
        if (quiz == null) return ResponseEntity.notFound().build();

        Question q = new Question();
        q.setQuiz(quiz);
        q.setPrompt(body.getPrompt());
        q.setChoiceA(body.getChoiceA());
        q.setChoiceB(body.getChoiceB());
        q.setChoiceC(body.getChoiceC());
        q.setChoiceD(body.getChoiceD());
        q.setCorrectChoice(body.getCorrectChoice());
        q.setOrderIndex(body.getOrderIndex());

        Question saved = questionRepository.save(q);

        return ResponseEntity.ok(toAdminDto(saved));
    }

    // -------------------------
    // READ
    // -------------------------
    @GetMapping("/{id}")
    public ResponseEntity<QuestionAdminDto> getOne(@PathVariable Long id) {

        Question q = questionRepository.findById(id).orElse(null);
        if (q == null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok(toAdminDto(q));
    }

    // -------------------------
    // UPDATE
    // -------------------------
    @PutMapping("/{id}")
    @Transactional
    public ResponseEntity<QuestionAdminDto> update(
            @PathVariable Long id,
            @Valid @RequestBody QuestionUpdateDto body
    ) {
        Question q = questionRepository.findById(id).orElse(null);
        if (q == null) return ResponseEntity.notFound().build();

        q.setPrompt(body.getPrompt());
        q.setChoiceA(body.getChoiceA());
        q.setChoiceB(body.getChoiceB());
        q.setChoiceC(body.getChoiceC());
        q.setChoiceD(body.getChoiceD());
        q.setCorrectChoice(body.getCorrectChoice());
        q.setOrderIndex(body.getOrderIndex());

        Question saved = questionRepository.save(q);
        return ResponseEntity.ok(toAdminDto(saved));
    }

    // -------------------------
    // DELETE
    // -------------------------
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {

        if (!questionRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        questionRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // -------------------------
    // mapper
    // -------------------------
    private QuestionAdminDto toAdminDto(Question q) {
        Long quizId = (q.getQuiz() == null) ? null : q.getQuiz().getId();

        return new QuestionAdminDto(
                q.getId(),
                quizId,
                q.getPrompt(),
                q.getChoiceA(),
                q.getChoiceB(),
                q.getChoiceC(),
                q.getChoiceD(),
                q.getCorrectChoice(),
                q.getOrderIndex()
        );
    }
}
