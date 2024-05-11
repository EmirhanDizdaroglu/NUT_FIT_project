import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/style.css'; // Stil dosyasını doğru yoldan import edin

function AP_DietList() {
    const [dietList, setDietList] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        portionSize: '',
        carbohydrates: '',
        protein: '',
        fat: '',
        calories: '',
        mealType: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDietList();
    }, []);

    const fetchDietList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/dietList');
            setDietList(response.data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching diet list: ' + error.message);
            setLoading(false);
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingItem ? 'put' : 'post';
        const url = `http://localhost:5000/api/dietList${editingItem ? '/' + editingItem._id : ''}`;
        try {
            const response = await axios[method](url, formData);
            if (editingItem) {
                setDietList(dietList.map(item => item._id === editingItem._id ? response.data : item));
            } else {
                setDietList([...dietList, response.data]);
            }
            setFormData({
                name: '',
                portionSize: '',
                carbohydrates: '',
                protein: '',
                fat: '',
                calories: '',
                mealType: ''
            });
            setEditingItem(null);
        } catch (error) {
            setError('Error saving diet item: ' + error.message);
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData(item);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/dietList/${id}`);
            setDietList(dietList.filter(item => item._id !== id));
        } catch (error) {
            setError('Error deleting diet item: ' + error.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Diet List Management</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Food Name" />
                <input type="text" name="portionSize" value={formData.portionSize} onChange={handleFormChange} placeholder="Portion Size" />
                <input type="number" name="carbohydrates" value={formData.carbohydrates} onChange={handleFormChange} placeholder="Carbohydrates (g)" />
                <input type="number" name="protein" value={formData.protein} onChange={handleFormChange} placeholder="Protein (g)" />
                <input type="number" name="fat" value={formData.fat} onChange={handleFormChange} placeholder="Fat (g)" />
                <input type="number" name="calories" value={formData.calories} onChange={handleFormChange} placeholder="Calories" />
                <input type="text" name="mealType" value={formData.mealType} onChange={handleFormChange} placeholder="Meal Type" />
                <button type="submit" className="edit-btn">{editingItem ? 'Update Item' : 'Add Item'}</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Portion Size</th>
                        <th>Carbohydrates</th>
                        <th>Protein</th>
                        <th>Fat</th>
                        <th>Calories</th>
                        <th>Meal Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {dietList.map(item => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.portionSize}</td>
                            <td>{item.carbohydrates}</td>
                            <td>{item.protein}</td>
                            <td>{item.fat}</td>
                            <td>{item.calories}</td>
                            <td>{item.mealType}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AP_DietList;
