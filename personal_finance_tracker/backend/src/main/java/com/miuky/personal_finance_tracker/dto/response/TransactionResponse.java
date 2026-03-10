package com.miuky.personal_finance_tracker.dto.response;

import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDate;

@Builder
public record TransactionResponse(
        Long id, BigDecimal amount, String note, LocalDate transactionDate,
        Long categoryId, String categoryName, String categoryType
) {}
