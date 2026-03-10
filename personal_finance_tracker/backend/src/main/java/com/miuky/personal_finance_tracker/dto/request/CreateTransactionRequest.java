package com.miuky.personal_finance_tracker.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;

public record CreateTransactionRequest(
        @NotNull(message = "Category is required")
        Long categoryId,

        @NotNull(message = "Amount is required")
        @DecimalMin(value = "2000", message = "Amount is at least 2.000 VND")
        BigDecimal amount,

        @Size(max = 255, message = "Note is at most 255 characters")
        String note,

        @NotNull(message = "Ngày giao dịch không được để trống")
        @PastOrPresent(message = "Ngày giao dịch không được vượt quá ngày hiện tại")
        LocalDate transactionDate
) {}
