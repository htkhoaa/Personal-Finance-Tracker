package com.miuky.personal_finance_tracker.mapper;

import com.miuky.personal_finance_tracker.dto.response.TransactionResponse;
import com.miuky.personal_finance_tracker.entity.Transaction;
import org.springframework.stereotype.Component;

@Component
public class TransactionMapper {

    public TransactionResponse toResponse(Transaction trans) {
        return TransactionResponse.builder()
                .id(trans.getId())
                .amount(trans.getAmount())
                .note(trans.getNote())
                .transactionDate(trans.getTransactionDate())
                .categoryId(trans.getCategory().getId())
                .categoryName(trans.getCategory().getName())
                .categoryType(trans.getCategory().getType().toString())
                .build();
    }
}
