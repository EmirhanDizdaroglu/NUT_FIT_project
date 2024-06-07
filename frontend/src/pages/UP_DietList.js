import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UP_DietList = () => {
    const navigate = useNavigate();
    const [dietList, setDietList] = useState([]);
    const [bmiCategory, setBmiCategory] = useState('');
    const [currentCategory, setCurrentCategory] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/userProfile', {
                    withCredentials: true
                });
                const user = response.data;
                const bmi = user.BMI;

                let category = '';
                if (bmi < 18.5) {
                    category = 'weight_gain';
                } else if (bmi >= 18.5 && bmi < 24.9) {
                    category = 'weight_maintenance';
                } else {
                    category = 'weight_loss';
                }

                setBmiCategory(category);
                setCurrentCategory(category);
                setDietList(getWeeklyDietList(category));
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigate('/login'); // If user data cannot be fetched, redirect to login page
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const getWeeklyDietList = (category) => {
        const dietLists = {
            weight_gain: [
                {
                    day: 'Monday',
                    meals: [
                        { type: 'Breakfast', name: 'Oatmeal', portionSize: '1 bowl', carbohydrates: 27, protein: 5, fat: 2.5, calories: 150 },
                        { type: 'Lunch', name: 'Chicken Breast', portionSize: '200 grams', carbohydrates: 0, protein: 46, fat: 2.5, calories: 220 },
                        { type: 'Dinner', name: 'Peanut Butter', portionSize: '2 tbsp', carbohydrates: 6, protein: 8, fat: 16, calories: 190 },
                        { type: 'Snack', name: 'Banana', portionSize: '1 piece', carbohydrates: 27, protein: 1, fat: 0.3, calories: 105 }
                    ]
                },
                {
                    day: 'Tuesday',
                    meals: [
                        { type: 'Breakfast', name: 'Greek Yogurt', portionSize: '1 cup', carbohydrates: 10, protein: 20, fat: 0, calories: 100 },
                        { type: 'Lunch', name: 'Salmon', portionSize: '150 grams', carbohydrates: 0, protein: 30, fat: 10, calories: 200 },
                        { type: 'Dinner', name: 'Almonds', portionSize: '1/4 cup', carbohydrates: 6, protein: 6, fat: 14, calories: 160 },
                        { type: 'Snack', name: 'Apple', portionSize: '1 medium', carbohydrates: 25, protein: 0.5, fat: 0.3, calories: 95 }
                    ]
                },
                {
                    day: 'Wednesday',
                    meals: [
                        { type: 'Breakfast', name: 'Scrambled Eggs', portionSize: '3 eggs', carbohydrates: 1, protein: 18, fat: 15, calories: 210 },
                        { type: 'Lunch', name: 'Brown Rice', portionSize: '1 cup', carbohydrates: 45, protein: 5, fat: 1, calories: 215 },
                        { type: 'Dinner', name: 'Avocado', portionSize: '1 whole', carbohydrates: 12, protein: 3, fat: 21, calories: 240 },
                        { type: 'Snack', name: 'Carrot Sticks', portionSize: '1 cup', carbohydrates: 12, protein: 1, fat: 0.2, calories: 50 }
                    ]
                },
                {
                    day: 'Thursday',
                    meals: [
                        { type: 'Breakfast', name: 'Protein Smoothie', portionSize: '1 glass', carbohydrates: 30, protein: 25, fat: 5, calories: 200 },
                        { type: 'Lunch', name: 'Quinoa Salad', portionSize: '1 bowl', carbohydrates: 40, protein: 10, fat: 5, calories: 240 },
                        { type: 'Dinner', name: 'Steak', portionSize: '200 grams', carbohydrates: 0, protein: 50, fat: 20, calories: 400 },
                        { type: 'Snack', name: 'Mixed Nuts', portionSize: '1/4 cup', carbohydrates: 5, protein: 5, fat: 20, calories: 200 }
                    ]
                },
                {
                    day: 'Friday',
                    meals: [
                        { type: 'Breakfast', name: 'Whole Grain Toast with Avocado', portionSize: '2 slices', carbohydrates: 40, protein: 8, fat: 15, calories: 280 },
                        { type: 'Lunch', name: 'Turkey Wrap', portionSize: '1 wrap', carbohydrates: 30, protein: 20, fat: 10, calories: 250 },
                        { type: 'Dinner', name: 'Baked Sweet Potato', portionSize: '1 medium', carbohydrates: 23, protein: 2, fat: 0, calories: 100 },
                        { type: 'Snack', name: 'Protein Bar', portionSize: '1 bar', carbohydrates: 20, protein: 15, fat: 10, calories: 250 }
                    ]
                },
                {
                    day: 'Saturday',
                    meals: [
                        { type: 'Breakfast', name: 'Pancakes with Syrup', portionSize: '3 pancakes', carbohydrates: 60, protein: 8, fat: 10, calories: 350 },
                        { type: 'Lunch', name: 'Grilled Chicken Salad', portionSize: '1 bowl', carbohydrates: 15, protein: 30, fat: 5, calories: 250 },
                        { type: 'Dinner', name: 'Spaghetti with Meatballs', portionSize: '1 plate', carbohydrates: 45, protein: 20, fat: 15, calories: 450 },
                        { type: 'Snack', name: 'Fruit Smoothie', portionSize: '1 glass', carbohydrates: 30, protein: 5, fat: 0.5, calories: 140 }
                    ]
                },
                {
                    day: 'Sunday',
                    meals: [
                        { type: 'Breakfast', name: 'Bagel with Cream Cheese', portionSize: '1 bagel', carbohydrates: 50, protein: 10, fat: 15, calories: 300 },
                        { type: 'Lunch', name: 'Grilled Cheese Sandwich', portionSize: '1 sandwich', carbohydrates: 30, protein: 15, fat: 20, calories: 350 },
                        { type: 'Dinner', name: 'Roast Beef', portionSize: '200 grams', carbohydrates: 0, protein: 40, fat: 15, calories: 300 },
                        { type: 'Snack', name: 'Yogurt with Honey', portionSize: '1 cup', carbohydrates: 20, protein: 10, fat: 5, calories: 150 }
                    ]
                }
            ],
            weight_maintenance: [
                {
                    day: 'Monday',
                    meals: [
                        { type: 'Breakfast', name: 'Vegetable Soup', portionSize: '1 bowl', carbohydrates: 15, protein: 3, fat: 0.5, calories: 80 },
                        { type: 'Lunch', name: 'Grilled Fish', portionSize: '150 grams', carbohydrates: 0, protein: 30, fat: 5, calories: 180 },
                        { type: 'Dinner', name: 'Apple', portionSize: '1 medium', carbohydrates: 25, protein: 0.5, fat: 0.3, calories: 95 },
                        { type: 'Snack', name: 'Greek Yogurt', portionSize: '1 cup', carbohydrates: 10, protein: 20, fat: 0, calories: 100 }
                    ]
                },
                {
                    day: 'Tuesday',
                    meals: [
                        { type: 'Breakfast', name: 'Smoothie', portionSize: '1 glass', carbohydrates: 30, protein: 5, fat: 0.5, calories: 140 },
                        { type: 'Lunch', name: 'Turkey Sandwich', portionSize: '1 sandwich', carbohydrates: 40, protein: 25, fat: 7, calories: 300 },
                        { type: 'Dinner', name: 'Carrot Sticks', portionSize: '1 cup', carbohydrates: 12, protein: 1, fat: 0.2, calories: 50 },
                        { type: 'Snack', name: 'Almonds', portionSize: '1/4 cup', carbohydrates: 6, protein: 6, fat: 14, calories: 160 }
                    ]
                },
                {
                    day: 'Wednesday',
                    meals: [
                        { type: 'Breakfast', name: 'Omelette', portionSize: '2 eggs', carbohydrates: 1, protein: 12, fat: 10, calories: 140 },
                        { type: 'Lunch', name: 'Brown Rice', portionSize: '1 cup', carbohydrates: 45, protein: 5, fat: 1, calories: 215 },
                        { type: 'Dinner', name: 'Grilled Chicken', portionSize: '150 grams', carbohydrates: 0, protein: 35, fat: 5, calories: 220 },
                        { type: 'Snack', name: 'Apple', portionSize: '1 medium', carbohydrates: 25, protein: 0.5, fat: 0.3, calories: 95 }
                    ]
                },
                {
                    day: 'Thursday',
                    meals: [
                        { type: 'Breakfast', name: 'Whole Grain Cereal', portionSize: '1 bowl', carbohydrates: 30, protein: 5, fat: 2, calories: 150 },
                        { type: 'Lunch', name: 'Chicken Salad', portionSize: '1 bowl', carbohydrates: 10, protein: 25, fat: 10, calories: 200 },
                        { type: 'Dinner', name: 'Steamed Vegetables', portionSize: '1 bowl', carbohydrates: 20, protein: 5, fat: 1, calories: 90 },
                        { type: 'Snack', name: 'Protein Shake', portionSize: '1 glass', carbohydrates: 10, protein: 20, fat: 1, calories: 150 }
                    ]
                },
                {
                    day: 'Friday',
                    meals: [
                        { type: 'Breakfast', name: 'Yogurt Parfait', portionSize: '1 bowl', carbohydrates: 40, protein: 10, fat: 5, calories: 200 },
                        { type: 'Lunch', name: 'Tuna Sandwich', portionSize: '1 sandwich', carbohydrates: 30, protein: 20, fat: 10, calories: 250 },
                        { type: 'Dinner', name: 'Quinoa', portionSize: '1 cup', carbohydrates: 39, protein: 8, fat: 3.5, calories: 222 },
                        { type: 'Snack', name: 'Cottage Cheese', portionSize: '1 cup', carbohydrates: 8, protein: 28, fat: 2.2, calories: 206 }
                    ]
                },
                {
                    day: 'Saturday',
                    meals: [
                        { type: 'Breakfast', name: 'Smoothie Bowl', portionSize: '1 bowl', carbohydrates: 50, protein: 10, fat: 5, calories: 250 },
                        { type: 'Lunch', name: 'Chicken Wrap', portionSize: '1 wrap', carbohydrates: 30, protein: 20, fat: 10, calories: 300 },
                        { type: 'Dinner', name: 'Pasta with Marinara Sauce', portionSize: '1 plate', carbohydrates: 45, protein: 10, fat: 5, calories: 300 },
                        { type: 'Snack', name: 'Fruit Salad', portionSize: '1 bowl', carbohydrates: 20, protein: 2, fat: 0.5, calories: 100 }
                    ]
                },
                {
                    day: 'Sunday',
                    meals: [
                        { type: 'Breakfast', name: 'Bagel with Cream Cheese', portionSize: '1 bagel', carbohydrates: 50, protein: 10, fat: 15, calories: 300 },
                        { type: 'Lunch', name: 'Grilled Cheese Sandwich', portionSize: '1 sandwich', carbohydrates: 30, protein: 15, fat: 20, calories: 350 },
                        { type: 'Dinner', name: 'Roast Beef', portionSize: '200 grams', carbohydrates: 0, protein: 40, fat: 15, calories: 300 },
                        { type: 'Snack', name: 'Yogurt with Honey', portionSize: '1 cup', carbohydrates: 20, protein: 10, fat: 5, calories: 150 }
                    ]
                }
            ],
            weight_loss: [
                {
                    day: 'Monday',
                    meals: [
                        { type: 'Breakfast', name: 'Green Salad', portionSize: '1 bowl', carbohydrates: 5, protein: 2, fat: 0, calories: 25 },
                        { type: 'Lunch', name: 'Grilled Chicken', portionSize: '100 grams', carbohydrates: 0, protein: 23, fat: 1, calories: 110 },
                        { type: 'Dinner', name: 'Broccoli', portionSize: '1 bowl', carbohydrates: 6, protein: 2.6, fat: 0.3, calories: 31 },
                        { type: 'Snack', name: 'Hard Boiled Eggs', portionSize: '2 eggs', carbohydrates: 1.2, protein: 12, fat: 10, calories: 140 }
                    ]
                },
                {
                    day: 'Tuesday',
                    meals: [
                        { type: 'Breakfast', name: 'Oatmeal', portionSize: '1 bowl', carbohydrates: 27, protein: 5, fat: 2.5, calories: 150 },
                        { type: 'Lunch', name: 'Turkey Wrap', portionSize: '1 wrap', carbohydrates: 30, protein: 20, fat: 5, calories: 250 },
                        { type: 'Dinner', name: 'Spinach Salad', portionSize: '1 bowl', carbohydrates: 7, protein: 3, fat: 0.5, calories: 40 },
                        { type: 'Snack', name: 'Carrot Sticks', portionSize: '1 cup', carbohydrates: 12, protein: 1, fat: 0.2, calories: 50 }
                    ]
                },
                {
                    day: 'Wednesday',
                    meals: [
                        { type: 'Breakfast', name: 'Greek Yogurt', portionSize: '1 cup', carbohydrates: 10, protein: 20, fat: 0, calories: 100 },
                        { type: 'Lunch', name: 'Quinoa Salad', portionSize: '1 bowl', carbohydrates: 30, protein: 8, fat: 5, calories: 180 },
                        { type: 'Dinner', name: 'Grilled Fish', portionSize: '150 grams', carbohydrates: 0, protein: 30, fat: 5, calories: 180 },
                        { type: 'Snack', name: 'Apple', portionSize: '1 medium', carbohydrates: 25, protein: 0.5, fat: 0.3, calories: 95 }
                    ]
                },
                {
                    day: 'Thursday',
                    meals: [
                        { type: 'Breakfast', name: 'Smoothie', portionSize: '1 glass', carbohydrates: 30, protein: 5, fat: 0.5, calories: 140 },
                        { type: 'Lunch', name: 'Chicken Salad', portionSize: '1 bowl', carbohydrates: 10, protein: 25, fat: 10, calories: 200 },
                        { type: 'Dinner', name: 'Steamed Vegetables', portionSize: '1 bowl', carbohydrates: 20, protein: 5, fat: 1, calories: 90 },
                        { type: 'Snack', name: 'Protein Shake', portionSize: '1 glass', carbohydrates: 10, protein: 20, fat: 1, calories: 150 }
                    ]
                },
                {
                    day: 'Friday',
                    meals: [
                        { type: 'Breakfast', name: 'Egg White Omelette', portionSize: '3 eggs', carbohydrates: 2, protein: 18, fat: 0.5, calories: 90 },
                        { type: 'Lunch', name: 'Vegetable Stir Fry', portionSize: '1 bowl', carbohydrates: 25, protein: 5, fat: 2, calories: 150 },
                        { type: 'Dinner', name: 'Baked Cod', portionSize: '150 grams', carbohydrates: 0, protein: 32, fat: 2, calories: 150 },
                        { type: 'Snack', name: 'Hummus and Veggies', portionSize: '1 cup', carbohydrates: 15, protein: 5, fat: 5, calories: 150 }
                    ]
                },
                {
                    day: 'Saturday',
                    meals: [
                        { type: 'Breakfast', name: 'Avocado Toast', portionSize: '2 slices', carbohydrates: 30, protein: 6, fat: 15, calories: 250 },
                        { type: 'Lunch', name: 'Chicken and Quinoa Bowl', portionSize: '1 bowl', carbohydrates: 40, protein: 25, fat: 10, calories: 300 },
                        { type: 'Dinner', name: 'Vegetable Soup', portionSize: '1 bowl', carbohydrates: 15, protein: 3, fat: 0.5, calories: 80 },
                        { type: 'Snack', name: 'Apple Slices with Peanut Butter', portionSize: '1 apple', carbohydrates: 25, protein: 4, fat: 8, calories: 200 }
                    ]
                },
                {
                    day: 'Sunday',
                    meals: [
                        { type: 'Breakfast', name: 'Smoothie Bowl', portionSize: '1 bowl', carbohydrates: 50, protein: 10, fat: 5, calories: 250 },
                        { type: 'Lunch', name: 'Chicken Wrap', portionSize: '1 wrap', carbohydrates: 30, protein: 20, fat: 10, calories: 300 },
                        { type: 'Dinner', name: 'Pasta with Marinara Sauce', portionSize: '1 plate', carbohydrates: 45, protein: 10, fat: 5, calories: 300 },
                        { type: 'Snack', name: 'Fruit Salad', portionSize: '1 bowl', carbohydrates: 20, protein: 2, fat: 0.5, calories: 100 }
                    ]
                }
            ]
        };

        return dietLists[category] || [];
    };

    const handleCategoryChange = (category) => {
        setCurrentCategory(category);
        setDietList(getWeeklyDietList(category));
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>;
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Diet Plan  </h1>
            <div style={buttonContainerStyle}>
                <button onClick={() => handleCategoryChange(bmiCategory)} style={{ ...buttonStyle, backgroundColor: '#007BFF' }}>Recommended ({formatCategory(bmiCategory)})</button>
                <button onClick={() => handleCategoryChange('weight_gain')} style={{ ...buttonStyle, backgroundColor: '#28A745' }}>Weight Gain</button>
                <button onClick={() => handleCategoryChange('weight_maintenance')} style={{ ...buttonStyle, backgroundColor: '#FFC107' }}>Weight Maintenance</button>
                <button onClick={() => handleCategoryChange('weight_loss')} style={{ ...buttonStyle, backgroundColor: '#DC3545' }}>Weight Loss</button>
            </div>
            {dietList.map((dayPlan, dayIndex) => (
                <div key={dayIndex} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                    <h2 style={{ color: '#333' }}>{dayPlan.day}</h2>
                    <ul style={{ listStyleType: 'none', padding: '0' }}>
                        {dayPlan.meals.map((meal, mealIndex) => (
                            <li key={mealIndex} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #eee', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                                <h3 style={{ margin: '0 0 5px 0', color: '#555' }}>{meal.type}: {meal.name}</h3>
                                <p style={{ margin: '0 0 5px 0', color: '#777' }}>Portion: {meal.portionSize}</p>
                                <p style={{ margin: '0 0 5px 0', color: '#777' }}>Carbohydrates: {meal.carbohydrates}g</p>
                                <p style={{ margin: '0 0 5px 0', color: '#777' }}>Protein: {meal.protein}g</p>
                                <p style={{ margin: '0 0 5px 0', color: '#777' }}>Fat: {meal.fat}g</p>
                                <p style={{ margin: '0 0 5px 0', color: '#777' }}>Calories: {meal.calories}kcal</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

const buttonStyle = {
    padding: '10px 20px',
    margin: '0 10px',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    display: 'inline-block'
};

const buttonContainerStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px' // Adds spacing between buttons
};

const formatCategory = (category) => {
    return category.replace(/_/g, ' ');
};
export default UP_DietList;
