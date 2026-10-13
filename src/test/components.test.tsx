import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ModeIndicatorBanner } from '../components/common/ModeIndicatorBanner';
import { DataProvider } from '../context/DataContext';

describe('UI Component Specifications', () => {
  describe('Navbar Component', () => {
    it('renders CloudLab branding and navigation links', () => {
      render(
        <MemoryRouter>
          <DataProvider>
            <Navbar onToggleMobileSidebar={() => {}} isMobileSidebarOpen={false} />
          </DataProvider>
        </MemoryRouter>
      );

      // Verify branding and academic subject
      expect(screen.getByText((_content, element) => element?.textContent?.trim() === 'CloudLab')).toBeInTheDocument();
      expect(screen.getByText(/FCC/)).toBeInTheDocument();

      // Verify essential public navigation
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Syllabus Units')).toBeInTheDocument();
      expect(screen.getByText('Interactive Labs')).toBeInTheDocument();
      expect(screen.getByText('Providers')).toBeInTheDocument();
      expect(screen.getByText('Case Studies')).toBeInTheDocument();
    });

    it('STRICT REQUIREMENT: Contains NO authentication, login, or registration buttons', () => {
      render(
        <MemoryRouter>
          <DataProvider>
            <Navbar onToggleMobileSidebar={() => {}} isMobileSidebarOpen={false} />
          </DataProvider>
        </MemoryRouter>
      );

      // Verify that no auth/account controls exist
      expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/sign up/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/register/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/my account/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/password/i)).not.toBeInTheDocument();
    });
  });

  describe('Breadcrumbs Component', () => {
    it('renders hierarchical breadcrumb items with links', () => {
      const items = [
        { label: 'Units', path: '/units' },
        { label: 'Unit 1: Introduction', path: '/units/unit-1' },
        { label: 'Topic 1.1' },
      ];

      render(
        <MemoryRouter>
          <Breadcrumbs items={items} />
        </MemoryRouter>
      );

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Units')).toBeInTheDocument();
      expect(screen.getByText('Unit 1: Introduction')).toBeInTheDocument();
      expect(screen.getByText('Topic 1.1')).toBeInTheDocument();
    });
  });

  describe('ModeIndicatorBanner Component', () => {
    it('renders the database connection / local demo status bar', () => {
      render(
        <MemoryRouter>
          <DataProvider>
            <ModeIndicatorBanner />
          </DataProvider>
        </MemoryRouter>
      );

      // Either Local Demo or Live MongoDB will be visible
      const hasDemo = screen.queryByText(/Local Demo Mode/i);
      const hasLive = screen.queryByText(/Connected/i);

      expect(hasDemo || hasLive).toBeTruthy();
    });
  });
});
