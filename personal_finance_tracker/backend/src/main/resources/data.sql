INSERT INTO categories (name, type, created_at) VALUES ('Lương công ty', 'INCOME', CURRENT_TIMESTAMP);
INSERT INTO categories (name, type, created_at) VALUES ('Thu nhập làm thêm', 'INCOME', CURRENT_TIMESTAMP);
INSERT INTO categories (name, type, created_at) VALUES ('Ăn uống hàng ngày', 'EXPENSE', CURRENT_TIMESTAMP);
INSERT INTO categories (name, type, created_at) VALUES ('Tiền trọ & Điện nước', 'EXPENSE', CURRENT_TIMESTAMP);
INSERT INTO categories (name, type, created_at) VALUES ('Giải trí & Cà phê', 'EXPENSE', CURRENT_TIMESTAMP);
INSERT INTO categories (name, type, created_at) VALUES ('Mua sắm cá nhân', 'EXPENSE', CURRENT_TIMESTAMP);

INSERT INTO transactions (category_id, amount, note, transaction_date, created_at) VALUES (1, 15000000.00, 'Lương tháng vừa rồi', '2026-03-05', CURRENT_TIMESTAMP);
INSERT INTO transactions (category_id, amount, note, transaction_date, created_at) VALUES (4, 3500000.00, 'Chuyển khoản tiền nhà tháng 3', '2026-03-06', CURRENT_TIMESTAMP);
INSERT INTO transactions (category_id, amount, note, transaction_date, created_at) VALUES (3, 45000.00, 'Ăn sáng phở bò', '2026-03-08', CURRENT_TIMESTAMP);
INSERT INTO transactions (category_id, amount, note, transaction_date, created_at) VALUES (3, 55000.00, 'Cơm tấm sườn bì', '2026-03-08', CURRENT_TIMESTAMP);
INSERT INTO transactions (category_id, amount, note, transaction_date, created_at) VALUES (5, 65000.00, 'Phê La với bạn', '2026-03-08', CURRENT_TIMESTAMP);
INSERT INTO transactions (category_id, amount, note, transaction_date, created_at) VALUES (2, 2500000.00, 'Tiền job freelance', '2026-03-09', CURRENT_TIMESTAMP);
INSERT INTO transactions (category_id, amount, note, transaction_date, created_at) VALUES (6, 450000.00, 'Mua áo thun trên Shopee', '2026-03-09', CURRENT_TIMESTAMP);