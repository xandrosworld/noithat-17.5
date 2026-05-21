import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import AdminDemo from './pages/AdminDemo';
import Services from './pages/Services';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import FloatingButtons from './components/FloatingButtons';
import './index.css';

const PublicShell = () => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Header />
    <main style={{ flexGrow: 1, paddingTop: 80 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/du-an" element={<Projects />} />
        <Route path="/du-an/:id" element={<ProjectDetail />} />
        <Route path="/lien-he" element={<Contact />} />
        <Route path="/dich-vu" element={<Services />} />
        <Route path="/ve-chung-toi" element={<About />} />
        <Route path="/tin-tuc" element={<Blog />} />
        <Route path="/tin-tuc/:slug" element={<BlogDetail />} />
      </Routes>
    </main>
    <Footer />
    <FloatingButtons />
  </div>
);

const AppShell = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminDemo />} />
      </Routes>
    );
  }

  return <PublicShell />;
};

function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
