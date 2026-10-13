import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { Footer } from './components/common/Footer';
import { ModeIndicatorBanner } from './components/common/ModeIndicatorBanner';
import { SearchModal } from './components/common/SearchModal';
import { PageTransition } from './components/common/PageTransition';
import { CloudMascot } from './components/common/CloudMascot';

// Pages
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { UnitsPage } from './pages/UnitsPage';
import { UnitDetailPage } from './pages/UnitDetailPage';
import { TopicDetailPage } from './pages/TopicDetailPage';
import { LabsPage } from './pages/LabsPage';
import { ProvidersPage } from './pages/ProvidersPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { QuizPage } from './pages/QuizPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppLayout: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600/15 selection:text-blue-900">
      <ModeIndicatorBanner />
      <Navbar
        onToggleMobileSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
        isMobileSidebarOpen={isMobileSidebarOpen}
      />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex">
        {/* Render Sidebar only on internal app pages or drawer */}
        {!isLandingPage && (
          <Sidebar
            isOpen={isMobileSidebarOpen}
            onClose={() => setIsMobileSidebarOpen(false)}
          />
        )}

        <main className={`flex-1 min-w-0 py-6 sm:py-8 ${!isLandingPage ? 'md:pl-8' : ''}`}>
          <PageTransition>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/units" element={<UnitsPage />} />
              <Route path="/units/:slug" element={<UnitDetailPage />} />
              <Route path="/topics/:slug" element={<TopicDetailPage />} />

              {/* Labs Directory and direct category routes */}
              <Route path="/labs" element={<LabsPage />} />
              <Route path="/labs/architecture" element={<LabsPage />} />
              <Route path="/labs/virtualization" element={<LabsPage />} />
              <Route path="/labs/security" element={<LabsPage />} />
              <Route path="/labs/storage" element={<LabsPage />} />
              <Route path="/labs/future-cloud" element={<LabsPage />} />

              <Route path="/providers" element={<ProvidersPage />} />
              <Route path="/case-studies" element={<CaseStudiesPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/glossary" element={<GlossaryPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </PageTransition>
        </main>
      </div>

      <Footer />
      <SearchModal />
      <CloudMascot />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <DataProvider>
      <Router>
        <AppLayout />
      </Router>
    </DataProvider>
  );
};

export default App;
