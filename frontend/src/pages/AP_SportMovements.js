import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/style.css';

function AP_SportMovements() {
    const [movements, setMovements] = useState([]);
    const [editingMovement, setEditingMovement] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        caloriesBurned: '',
        sets: [],
        targetLimb: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMovements();
    }, []);

    const fetchMovements = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/sportMovements');
            setMovements(response.data);
            setLoading(false);
        } catch (error) {
            setError('Error fetching movements: ' + error.message);
            setLoading(false);
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSetChange = (index, field, value) => {
        const updatedSets = formData.sets.map((set, idx) => {
            if (idx === index) {
                return { ...set, [field]: Number(value) };
            }
            return set;
        });
        setFormData(prev => ({ ...prev, sets: updatedSets }));
    };

    const handleAddSet = () => {
        setFormData(prev => ({
            ...prev,
            sets: [...prev.sets, { reps: 0, repetitions: 0 }]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = editingMovement ? 'put' : 'post';
        const url = `http://localhost:5000/api/sportMovements${editingMovement ? '/' + editingMovement._id : ''}`;
        try {
            const response = await axios[method](url, formData);
            if (editingMovement) {
                setMovements(movements.map(movement => movement._id === editingMovement._id ? response.data : movement));
            } else {
                setMovements([...movements, response.data]);
            }
            setEditingMovement(null);
            setFormData({ name: '', caloriesBurned: '', sets: [], targetLimb: '' });
        } catch (error) {
            setError('Error saving movement: ' + error.message);
        }
    };

    const handleEdit = (movement) => {
        setEditingMovement(movement);
        setFormData(movement);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/sportMovements/${id}`);
            setMovements(movements.filter(movement => movement._id !== id));
        } catch (error) {
            setError('Error deleting movement: ' + error.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Sports Movements Management</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="Movement Name" />
                <input type="number" name="caloriesBurned" value={formData.caloriesBurned} onChange={handleFormChange} placeholder="Calories Burned" />
                {formData.sets.map((set, index) => (
                    <div key={index}>
                        <input type="number" placeholder="Reps" value={set.reps} onChange={(e) => handleSetChange(index, 'reps', e.target.value)} />
                        <input type="number" placeholder="Repetitions" value={set.repetitions} onChange={(e) => handleSetChange(index, 'repetitions', e.target.value)} />
                    </div>
                ))}
                <button type="button" onClick={handleAddSet}>Add Set</button>
                <input type="text" name="targetLimb" value={formData.targetLimb} onChange={handleFormChange} placeholder="Target Limb" />
                <button type="submit">{editingMovement ? 'Update Movement' : 'Add Movement'}</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Calories Burned</th>
                        <th>Sets</th>
                        <th>Target Limb</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {movements.map(movement => (
                        <tr key={movement._id}>
                            <td>{movement.name}</td>
                            <td>{movement.caloriesBurned}</td>
                            <td>{movement.sets.map(set => `${set.reps} reps, ${set.repetitions} times`).join(', ')}</td>
                            <td>{movement.targetLimb}</td>
                            <td>
                                <button onClick={() => handleEdit(movement)}>Edit</button>
                                <button onClick={() => handleDelete(movement._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AP_SportMovements;
