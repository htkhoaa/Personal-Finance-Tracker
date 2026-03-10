package com.miuky.personal_finance_tracker.mapper;

import com.miuky.personal_finance_tracker.dto.response.CategoryResponse;
import com.miuky.personal_finance_tracker.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public CategoryResponse toResponse(Category category) {
        return new CategoryResponse(category.getName(),
                category.getType().toString());
    }
}
