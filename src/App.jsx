import { useEffect, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import ProjectDetail from './components/ProjectDetail.jsx';
import Admin from './components/Admin.jsx';

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/projects/:slug" element={<ProjectDetail theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}