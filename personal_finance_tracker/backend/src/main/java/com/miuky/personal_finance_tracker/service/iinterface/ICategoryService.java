package com.miuky.personal_finance_tracker.service.iinterface;

import com.miuky.personal_finance_tracker.dto.request.CreateCategoryRequest;
import com.miuky.personal_finance_tracker.dto.response.CategoryResponse;
import com.miuky.personal_finance_tracker.entity.Category;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ICategoryService {
    CategoryResponse createCategory(CreateCategoryRequest request);
    List<Category> findAll();
}
