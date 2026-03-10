package com.miuky.personal_finance_tracker.service.impl;

import com.miuky.personal_finance_tracker.common.CategoryType;
import com.miuky.personal_finance_tracker.dto.request.CreateCategoryRequest;
import com.miuky.personal_finance_tracker.dto.response.CategoryResponse;
import com.miuky.personal_finance_tracker.entity.Category;
import com.miuky.personal_finance_tracker.exception.AppException;
import com.miuky.personal_finance_tracker.mapper.CategoryMapper;
import com.miuky.personal_finance_tracker.repository.CategoryRepository;
import com.miuky.personal_finance_tracker.service.iinterface.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service @RequiredArgsConstructor
public class CategoryService implements ICategoryService {
    private final CategoryRepository categoryRepo;
    private final CategoryMapper mapper;

    @Override
    public CategoryResponse createCategory(CreateCategoryRequest request) {
        if (categoryRepo.existsByName(request.name())) throw new AppException("Category existed");
        Category category = new Category();
        category.setName(request.name());
        category.setType(CategoryType.valueOf(request.type().toUpperCase().trim()));
        Category savedCategory = categoryRepo.save(category);
        return mapper.toResponse(savedCategory);
    }

    @Override
    public List<Category> findAll() {
        return categoryRepo.findAll();
    }


}
