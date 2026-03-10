package com.miuky.personal_finance_tracker.service.iinterface;

import com.miuky.personal_finance_tracker.dto.request.CreateTransactionRequest;
import com.miuky.personal_finance_tracker.dto.request.UpdateTransactionRequest;
import com.miuky.personal_finance_tracker.dto.response.TransactionResponse;
import org.hibernate.sql.Update;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
public interface ITransactionService {
    TransactionResponse createTransaction(CreateTransactionRequest request);
    Page<TransactionResponse> getTransactions(int page, int size, String sort, LocalDate start,
                                              LocalDate end, Long catId, String type);
    BigDecimal getTotalBalance();
    TransactionResponse updateTransaction(Long id, UpdateTransactionRequest request);
    void deleteTransaction(Long id);
    BigDecimal getFilteredBalance(LocalDate start, LocalDate end, Long catId, String type);
}
