import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionDashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalBalance, setTotalBalance] = useState(0);
    const [filteredTotal, setFilteredTotal] = useState(0);

    const [formData, setFormData] = useState({
        categoryId: '', amount: '', note: '',
        transactionDate: new Date().toISOString().split('T')[0]
    });

    const [newCategory, setNewCategory] = useState({ name: '', type: 'EXPENSE' });
    const [isAddingCategory, setIsAddingCategory] = useState(false);

    const [filters, setFilters] = useState({ startDate: '', endDate: '', categoryId: '', type: '' });

    const [editRowId, setEditRowId] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/categories');
            setCategories(response.data.data);
            if (response.data.data.length > 0 && !formData.categoryId) {
                setFormData(prev => ({ ...prev, categoryId: response.data.data[0].id }));
            }
        } catch (error) { console.error("Lỗi tải danh mục:", error); }
    };

    const fetchGlobalBalance = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/transactions/balance');
            setTotalBalance(response.data.data);
        } catch (error) { console.error("Lỗi tải tổng tài sản:", error); }
    };

    const fetchTransactionsAndFilteredTotal = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({ page: 0, size: 50 });

            if (filters.startDate) queryParams.append('startDate', filters.startDate);
            if (filters.endDate) queryParams.append('endDate', filters.endDate);

            if (filters.categoryId) queryParams.append('categoryId', filters.categoryId);
            if (filters.type) queryParams.append('type', filters.type);

            const resData = await axios.get(`http://localhost:8080/api/transactions?${queryParams.toString()}`);
            setTransactions(resData.data.data.content);

            const tempTotal = resData.data.data.content.reduce((sum, t) => {
                return t.categoryType === 'INCOME' ? sum + t.amount : sum - t.amount;
            }, 0);
            setFilteredTotal(tempTotal);

        } catch (error) { console.error("Lỗi tải dữ liệu:", error); }
        finally { setLoading(false); }
    };

    useEffect(() => {
        fetchCategories();
        fetchGlobalBalance();
    }, []);

    useEffect(() => {
        fetchTransactionsAndFilteredTotal();
    }, [filters]);

    const handleAddCategory = async () => {
        if (!newCategory.name) return alert("Vui lòng nhập tên danh mục!");
        try {
            const response = await axios.post('http://localhost:8080/api/categories', newCategory);
            const savedCategory = response.data.data;

            await fetchCategories();
            setFormData(prev => ({ ...prev, categoryId: savedCategory.id }));
            setIsAddingCategory(false);
            setNewCategory({ name: '', type: 'EXPENSE' });
            alert("Thêm danh mục thành công!");
        } catch (error) { console.error("Lỗi:", error); }
    };

    const handleSubmitTransaction = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/transactions', formData);
            fetchTransactionsAndFilteredTotal();
            fetchGlobalBalance();
            setFormData(prev => ({ ...prev, amount: '', note: '' }));
        } catch (error) { console.error("Lỗi:", error); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa giao dịch này không?")) {
            try {
                await axios.delete(`http://localhost:8080/api/transactions/${id}`);
                fetchTransactionsAndFilteredTotal();
                fetchGlobalBalance();
            } catch (error) { console.error("Lỗi xóa:", error); }
        }
    };

    const startEdit = (t) => {
        setEditRowId(t.id);
        setEditFormData({
            categoryId: t.categoryId,
            amount: t.amount,
            note: t.note,
            transactionDate: t.transactionDate
        });
    };

    const handleSaveEdit = async (id) => {
        try {
            await axios.put(`http://localhost:8080/api/transactions/${id}`, editFormData);
            setEditRowId(null);
            fetchTransactionsAndFilteredTotal();
            fetchGlobalBalance();
        } catch (error) { console.error("Lỗi cập nhật:", error); }
    };

    const formatDateDisplay = (dateString) => {
        if (!dateString) return '';
        const parts = dateString.split('-');
        if (parts.length !== 3) return dateString;
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    };

    return (
        <>
            <style>
                {`
                    .animated-bg {
                        background: linear-gradient(-45deg, #1e3c72, #2a5298, #ff6a00, #ee0979);
                        background-size: 400% 400%;
                        animation: gradientBG 15s ease infinite;
                        min-height: 100vh;
                        padding: 30px 15px;
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        color: #fff;
                    }
                    @keyframes gradientBG {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    .glass-panel {
                        background: rgba(255, 255, 255, 0.15);
                        backdrop-filter: blur(16px);
                        -webkit-backdrop-filter: blur(16px);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        border-radius: 16px;
                        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
                        padding: 20px;
                        margin-bottom: 25px;
                    }
                    .glass-input {
                        background: rgba(255, 255, 255, 0.2);
                        border: 1px solid rgba(255, 255, 255, 0.5);
                        color: #fff;
                        padding: 8px 12px;
                        border-radius: 6px;
                        outline: none;
                    }
                    .glass-input option { color: #000; }
                    .glass-table th { background: rgba(0, 0, 0, 0.3); color: #fff; padding: 12px; }
                    .glass-table td { padding: 10px; border-bottom: 1px solid rgba(255, 255, 255, 0.2); }
                    .action-btn { background: none; border: none; font-size: 18px; cursor: pointer; margin: 0 5px; transition: transform 0.2s;}
                    .action-btn:hover { transform: scale(1.2); }
                `}
            </style>

            <div className="animated-bg">
                <div style={{ maxWidth: '1000px', margin: 'auto' }}>

                    <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h1 style={{ margin: 0, textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>Miuky's Finance</h1>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '14px', opacity: 0.8 }}>Tổng Tài Sản Hiện Tại</div>
                            <div style={{ fontSize: '28px', fontWeight: 'bold', color: totalBalance >= 0 ? '#b9f6ca' : '#ff8a80' }}>
                                {totalBalance >= 0 ? '+' : ''}{totalBalance.toLocaleString()} đ
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        <div className="glass-panel" style={{ flex: '1 1 300px' }}>
                            <h3>➕ Thêm Giao Dịch</h3>
                            <form onSubmit={handleSubmitTransaction}>

                                <div style={{ marginBottom: '15px' }}>
                                    <label>Danh mục: </label>
                                    <div style={{ display: 'flex', gap: '5px' }}>
                                        <select
                                            className="glass-input"
                                            style={{ flex: 1 }}
                                            value={formData.categoryId}
                                            onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
                                        >
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                        <button type="button" className="glass-input" onClick={() => setIsAddingCategory(!isAddingCategory)}>
                                            {isAddingCategory ? 'Hủy' : '+ Mới'}
                                        </button>
                                    </div>

                                    {isAddingCategory && (
                                        <div style={{ display: 'flex', gap: '5px', marginTop: '10px', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px' }}>
                                            <input type="text" className="glass-input" placeholder="Tên danh mục..." style={{ flex: 1 }}
                                                   value={newCategory.name} onChange={e => setNewCategory({...newCategory, name: e.target.value})} />
                                            <select className="glass-input" value={newCategory.type} onChange={e => setNewCategory({...newCategory, type: e.target.value})}>
                                                <option value="EXPENSE">CHI</option>
                                                <option value="INCOME">THU</option>
                                            </select>
                                            <button type="button" className="glass-input" style={{ background: '#4caf50', color: '#fff' }} onClick={handleAddCategory}>Lưu</button>
                                        </div>
                                    )}
                                </div>

                                <div style={{ marginBottom: '15px' }}>
                                    <label>Số tiền (VNĐ): </label>
                                    <input type="number" className="glass-input" style={{ width: '100%', boxSizing: 'border-box' }} required
                                           value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
                                </div>
                                <div style={{ marginBottom: '15px' }}>
                                    <label>Ghi chú: </label>
                                    <input type="text" className="glass-input" style={{ width: '100%', boxSizing: 'border-box' }}
                                           value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} />
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <label>Ngày: </label>
                                    <input type="date" className="glass-input" style={{ width: '100%', boxSizing: 'border-box' }} required
                                           value={formData.transactionDate} onChange={e => setFormData({...formData, transactionDate: e.target.value})} />
                                </div>
                                <button type="submit" className="glass-input" style={{ width: '100%', background: '#2196f3', color: '#fff', fontWeight: 'bold' }}>
                                    LƯU GIAO DỊCH
                                </button>
                            </form>
                        </div>

                        <div className="glass-panel" style={{ flex: '2 1 500px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                <h3 style={{ margin: 0 }}>📋 Danh sách Giao Dịch</h3>
                                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '5px 15px', borderRadius: '20px' }}>
                                    Tổng khoản đang lọc: <strong style={{ color: filteredTotal >= 0 ? '#b9f6ca' : '#ff8a80' }}>
                                    {filteredTotal >= 0 ? '+' : ''}{filteredTotal.toLocaleString()} đ
                                </strong>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                                <input type="date" className="glass-input" title="Từ ngày"
                                       value={filters.startDate} onChange={e => setFilters({...filters, startDate: e.target.value})} />
                                <input type="date" className="glass-input" title="Đến ngày"
                                       value={filters.endDate} onChange={e => setFilters({...filters, endDate: e.target.value})} />
                                <select className="glass-input" value={filters.categoryId} onChange={e => setFilters({...filters, categoryId: e.target.value})}>
                                    <option value="">-- Tất cả danh mục --</option>
                                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                </select>
                                <select className="glass-input" value={filters.type} onChange={e => setFilters({...filters, type: e.target.value})}>
                                    <option value="">-- Tất cả loại --</option>
                                    <option value="INCOME">Thu Nhập</option>
                                    <option value="EXPENSE">Chi Tiêu</option>
                                </select>
                                <button className="glass-input" onClick={() => setFilters({ startDate: '', endDate: '', categoryId: '', type: '' })}>Xóa Lọc</button>
                            </div>

                            {loading ? <p>Đang tải...</p> : (
                                <div style={{ overflowX: 'auto' }}>
                                    <table className="glass-table" width="100%" style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
                                        <thead>
                                        <tr>
                                            <th>Ngày</th>
                                            <th>Danh Mục</th>
                                            <th>Số Tiền</th>
                                            <th>Ghi Chú</th>
                                            <th style={{ textAlign: 'center' }}>Hành Động</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {transactions.map(t => (
                                            <tr key={t.id} style={{ background: editRowId === t.id ? 'rgba(255,255,255,0.2)' : 'transparent' }}>
                                                {editRowId === t.id ? (
                                                    <>
                                                        <td><input type="date" className="glass-input" style={{ width: '120px' }} value={editFormData.transactionDate} onChange={e => setEditFormData({...editFormData, transactionDate: e.target.value})} /></td>
                                                        <td>
                                                            <select className="glass-input" value={editFormData.categoryId} onChange={e => setEditFormData({...editFormData, categoryId: e.target.value})}>
                                                                {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                                                            </select>
                                                        </td>
                                                        <td><input type="number" className="glass-input" style={{ width: '100px' }} value={editFormData.amount} onChange={e => setEditFormData({...editFormData, amount: e.target.value})} /></td>
                                                        <td><input type="text" className="glass-input" style={{ width: '120px' }} value={editFormData.note} onChange={e => setEditFormData({...editFormData, note: e.target.value})} /></td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <button className="action-btn" title="Lưu" onClick={() => handleSaveEdit(t.id)}>✅</button>
                                                            <button className="action-btn" title="Hủy" onClick={() => setEditRowId(null)}>❌</button>
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td>{formatDateDisplay(t.transactionDate)}</td>
                                                        <td>{t.categoryName}</td>
                                                        <td style={{ color: t.categoryType === 'INCOME' ? '#b9f6ca' : '#ff8a80', fontWeight: 'bold' }}>
                                                            {t.amount.toLocaleString()} đ
                                                        </td>
                                                        <td>{t.note}</td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <button className="action-btn" title="Sửa" onClick={() => startEdit(t)}>✏️</button>
                                                            <button className="action-btn" title="Xóa" onClick={() => handleDelete(t.id)}>🗑️</button>
                                                        </td>
                                                    </>
                                                )}
                                            </tr>
                                        ))}
                                        {transactions.length === 0 && (
                                            <tr><td colSpan="5" style={{ textAlign: 'center' }}>Không có dữ liệu</td></tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TransactionDashboard;