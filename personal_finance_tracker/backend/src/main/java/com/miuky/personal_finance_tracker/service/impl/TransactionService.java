package com.miuky.personal_finance_tracker.service.impl;

import com.miuky.personal_finance_tracker.dto.request.CreateTransactionRequest;
import com.miuky.personal_finance_tracker.dto.request.UpdateTransactionRequest;
import com.miuky.personal_finance_tracker.dto.response.TransactionResponse;
import com.miuky.personal_finance_tracker.entity.Category;
import com.miuky.personal_finance_tracker.entity.Transaction;
import com.miuky.personal_finance_tracker.exception.AppException;
import com.miuky.personal_finance_tracker.mapper.TransactionMapper;
import com.miuky.personal_finance_tracker.repository.CategoryRepository;
import com.miuky.personal_finance_tracker.repository.TransactionRepository;
import com.miuky.personal_finance_tracker.service.iinterface.ITransactionService;
import com.miuky.personal_finance_tracker.specification.TransactionSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service @RequiredArgsConstructor
public class TransactionService implements ITransactionService {
    private final TransactionRepository transactionRepo;
    private final CategoryRepository categoryRepo;
    private final TransactionMapper mapper;

    @Override @Transactional
    public TransactionResponse createTransaction(CreateTransactionRequest request) {
        Category category = categoryRepo.findById(request.categoryId())
                .orElseThrow(() -> new AppException("Unavailable Category"));

        Transaction transaction = Transaction.builder()
                .category(category)
                .amount(request.amount())
                .note(request.note())
                .transactionDate(request.transactionDate())
                .build();

        Transaction savedTransaction = transactionRepo.save(transaction);
        return mapper.toResponse(savedTransaction);
    }

    @Override
    public Page<TransactionResponse> getTransactions(int page, int size, String sort, LocalDate start,
                                                     LocalDate end, Long catId, String type) {
        Sort s = sort.contains(",desc") ? Sort.by(sort.split(",")[0]).descending() : Sort.by(sort.split(",")[0]).ascending();
        Pageable pageable = PageRequest.of(page, size, s);

        Specification<Transaction> spec = TransactionSpecification.filterTransaction(start, end, catId, type);
        return transactionRepo.findAll(spec, pageable).map(mapper::toResponse);
    }

    @Override
    public BigDecimal getFilteredBalance(LocalDate start, LocalDate end, Long catId, String type) {
        Specification<Transaction> spec = TransactionSpecification.filterTransaction(start, end, catId, type);
        List<Transaction> transactions = transactionRepo.findAll(spec);

        return transactions.stream()
                .map(t -> t.getCategory().getType().toString()
                        .equalsIgnoreCase("INCOME") ? t.getAmount() : t.getAmount().negate())
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Override
    public BigDecimal getTotalBalance() {
        return transactionRepo.calculateTotalBalance();
    }

    @Override @Transactional
    public TransactionResponse updateTransaction(Long id, UpdateTransactionRequest request) {
        Transaction transaction = transactionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        Category category = categoryRepo.findById(request.categoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        transaction.setCategory(category);
        transaction.setAmount(request.amount());
        transaction.setNote(request.note());
        transaction.setTransactionDate(request.transactionDate());

        Transaction updatedTransaction = transactionRepo.save(transaction);
        return mapper.toResponse(updatedTransaction);
    }

    @Override @Transactional
    public void deleteTransaction(Long id) {
        Transaction entity = transactionRepo.findById(id)
                .orElseThrow(() -> new AppException("Transaction not found"));
        transactionRepo.delete(entity);
    }
}
