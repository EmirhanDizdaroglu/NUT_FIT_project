import React from 'react';
import { createRoot } from 'react-dom/client'; // React 18'den
import App from './App'; // Uygulama bileşeniniz
import './styles/style.css'; // Stil dosyasını burada import et
//import './styles/tailwindcss';


createRoot(root).render(<App />); // `render` yerine `createRoot` kullanın
