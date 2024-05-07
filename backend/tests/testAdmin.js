const axios = require('axios');

async function testAdminLogin() {
  try {
    const response = await axios.post('http://localhost:5000/api/adminLogin', {
      username: "Admin1", // Admin kullanıcı adı
      password: "strongpassword"  // Admin şifresi
    });

    console.log('Admin login successful:', response.data);
  } catch (error) {
    console.error('Admin login failed:', error.response ? error.response.data : error);
  }
}

// Admin giriş testini çağır
testAdminLogin();
