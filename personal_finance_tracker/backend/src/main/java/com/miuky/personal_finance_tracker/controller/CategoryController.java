package com.miuky.personal_finance_tracker.controller;

import com.miuky.personal_finance_tracker.dto.request.CreateCategoryRequest;
import com.miuky.personal_finance_tracker.dto.response.ApiResponse;
import com.miuky.personal_finance_tracker.dto.response.CategoryResponse;
import com.miuky.personal_finance_tracker.entity.Category;
import com.miuky.personal_finance_tracker.repository.CategoryRepository;
import com.miuky.personal_finance_tracker.service.iinterface.ICategoryService;
import com.miuky.personal_finance_tracker.service.impl.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService service;

    @GetMapping
    public ApiResponse<List<Category>> getAllCategories() {
        List<Category> categories = service.findAll();
        return ApiResponse.success(categories);
    }

    @PostMapping
    public ApiResponse<CategoryResponse> createCategory(@RequestBody CreateCategoryRequest request){
        CategoryResponse res = service.createCategory(request);
        return ApiResponse.success(res);
    }
}