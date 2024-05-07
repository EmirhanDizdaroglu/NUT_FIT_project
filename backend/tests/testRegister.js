// testRegister.js
const axios = require('axios');

async function testRegister() {
  try {
    const response = await axios.post('http://localhost:5000/api/register', {
      name: "Testt",
      surname: "Userr",
      nickname: "testUserr",
      Weight: 70,
      Height: 175,
      email: "testuse32er@example.com",
      phoneNumber: "1234567890",
      password: "StrongPassword123",
      aim: "Fitness"
    });

    console.log('User registered successfully:', response.data);
  } catch (error) {
    console.error('Registration failed:', error.response ? error.response.data : error);
  }
}

// Call the test function
testRegister();
