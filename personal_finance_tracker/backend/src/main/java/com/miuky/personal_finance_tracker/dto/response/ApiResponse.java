package com.miuky.personal_finance_tracker.dto.response;

import lombok.Builder;

@Builder
public record ApiResponse<T>(
        int code, String message, T data
) {
    public static <T> ApiResponse<T> success(T data) {
        return ApiResponse.<T>builder()
                .code(200)
                .message("Success")
                .data(data)
                .build();
    }
}
