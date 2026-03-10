package com.miuky.personal_finance_tracker.controller;

import com.miuky.personal_finance_tracker.dto.request.CreateTransactionRequest;
import com.miuky.personal_finance_tracker.dto.request.UpdateTransactionRequest;
import com.miuky.personal_finance_tracker.dto.response.ApiResponse;
import com.miuky.personal_finance_tracker.dto.response.PageResponse;
import com.miuky.personal_finance_tracker.dto.response.TransactionResponse;
import com.miuky.personal_finance_tracker.service.impl.TransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<TransactionResponse> createTransaction(@Valid @RequestBody CreateTransactionRequest request) {
        TransactionResponse res = transactionService.createTransaction(request);
        return ApiResponse.success(res);
    }

    @GetMapping
    public ApiResponse<PageResponse<TransactionResponse>> getTransactions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "transactionDate,desc") String sort,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String type) {

        Page<TransactionResponse> res = transactionService.getTransactions(page, size, sort, startDate, endDate, categoryId, type);
        return ApiResponse.success(PageResponse.from(res));
    }

    @PutMapping("/{id}")
    public ApiResponse<TransactionResponse> updateTransaction(@PathVariable("id") Long transId,
                                                              @RequestBody UpdateTransactionRequest request) {
        TransactionResponse res = transactionService.updateTransaction(transId, request);
        return ApiResponse.success(res);
    }

    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable("id") Long transId) {
        transactionService.deleteTransaction(transId);
    }

    @GetMapping("/filtered-balance")
    public ApiResponse<BigDecimal> getFilteredBalance(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String type) {

        BigDecimal balance = transactionService.getFilteredBalance(startDate, endDate, categoryId, type);
        return ApiResponse.success(balance);
    }
    @GetMapping("/balance")
    public ApiResponse<BigDecimal> getTotalBalance() {
        BigDecimal balance = transactionService.getTotalBalance();
        return ApiResponse.success(balance);
    }

}
