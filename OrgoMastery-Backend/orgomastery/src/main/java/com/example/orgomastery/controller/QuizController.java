package com.example.orgomastery.controller;

import com.example.orgomastery.dto.*;
import com.example.orgomastery.model.Question;
import com.example.orgomastery.model.Quiz;
import com.example.orgomastery.repository.QuizRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import com.example.orgomastery.repository.QuestionRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin(origins = "http://localhost:5173")
public class QuizController {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;

    public QuizController(QuizRepository quizRepository, QuestionRepository questionRepository) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
    }
    /**
     * GET /api/quizzes/{quizId}
     * Returns quiz + questions WITHOUT correct answers.
     */
    @GetMapping("/{quizId}")
    @Transactional(readOnly = true)
    public ResponseEntity<QuizDetailDto> getQuiz(@PathVariable Long quizId) {

        Quiz quiz = quizRepository.findById(quizId).orElse(null);
        if (quiz == null) return ResponseEntity.notFound().build();

        List<QuestionDto> questions = quiz.getQuestions().stream()
                .sorted(Comparator
                        .comparing((Question q) -> q.getOrderIndex() == null ? Integer.MAX_VALUE : q.getOrderIndex())
                        .thenComparing(Question::getId))
                .map(q -> new QuestionDto(
                        q.getId(),
                        q.getPrompt(),
                        List.of(q.getChoiceA(), q.getChoiceB(), q.getChoiceC(), q.getChoiceD())
                ))
                .toList();

        QuizDetailDto dto = new QuizDetailDto(
                quiz.getId(),
                quiz.getLecture().getId(),
                quiz.getTitle(),
                quiz.getDescription(),
                questions
        );

        return ResponseEntity.ok(dto);
    }

    /**
     * POST /api/quizzes/{quizId}/attempts
     * Submit answers, get score + incorrect review items back.
     */
    @PostMapping("/{quizId}/attempts")
    @Transactional
    public ResponseEntity<AttemptResultDto> submitAttempt(
            @PathVariable Long quizId,
            @Valid @RequestBody AttemptCreateDto body
    ) {
        Quiz quiz = quizRepository.findById(quizId).orElse(null);
        if (quiz == null) return ResponseEntity.notFound().build();

        // Map: questionId -> selectedIndex
        Map<Long, Integer> selections = new HashMap<>();
        for (AttemptAnswerDto a : body.getAnswers()) {
            selections.put(a.getQuestionId(), a.getSelectedIndex());
        }

        int total = quiz.getQuestions().size();
        int score = 0;
        List<IncorrectAnswerDto> incorrect = new ArrayList<>();

        for (Question q : quiz.getQuestions()) {
            Integer selectedIndex = selections.get(q.getId());

            // If user didn't answer, count as incorrect but still show review
            String userAnswerText = (selectedIndex == null)
                    ? "No answer"
                    : optionTextByIndex(q, selectedIndex);

            String correctText = optionTextByLetter(q, q.getCorrectChoice());

            boolean isCorrect = selectedIndex != null && isCorrect(q, selectedIndex);
            if (isCorrect) {
                score++;
            } else {
                incorrect.add(new IncorrectAnswerDto(
                        q.getId(),
                        q.getPrompt(),
                        userAnswerText,
                        correctText
                ));
            }
        }

        AttemptResultDto result = new AttemptResultDto(quiz.getId(), score, total, incorrect);
        return ResponseEntity.ok(result);
    }

    // ---------- helpers ----------
    private boolean isCorrect(Question q, int selectedIndex) {
        String correct = q.getCorrectChoice(); // "A" / "B" / "C" / "D"
        int correctIndex = switch (correct) {
            case "A" -> 0;
            case "B" -> 1;
            case "C" -> 2;
            case "D" -> 3;
            default -> throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Invalid correctChoice for question " + q.getId());
        };
        return selectedIndex == correctIndex;
    }

    private String optionTextByIndex(Question q, int idx) {
        return switch (idx) {
            case 0 -> q.getChoiceA();
            case 1 -> q.getChoiceB();
            case 2 -> q.getChoiceC();
            case 3 -> q.getChoiceD();
            default -> throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "selectedIndex must be 0-3");
        };
    }

    private String optionTextByLetter(Question q, String letter) {
        return switch (letter) {
            case "A" -> q.getChoiceA();
            case "B" -> q.getChoiceB();
            case "C" -> q.getChoiceC();
            case "D" -> q.getChoiceD();
            default -> "Unknown";
        };
    }
}

