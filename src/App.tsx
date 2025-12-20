import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import AppLayout from './components/layout/AppLayout';
import Overview from './pages/Overview';
import UsersPage from './pages/Users';
import CouriersPage from './pages/Couriers';
import WPointsPage from './pages/WPoints';
import DeliveriesPage from './pages/Deliveries';
import ReportsPage from './pages/Reports';
import SystemPage from './pages/System';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Overview />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="couriers" element={<CouriersPage />} />
          <Route path="w-points" element={<WPointsPage />} />
          <Route path="deliveries" element={<DeliveriesPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="system" element={<SystemPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster theme="dark" position="bottom-right" />
    </Router>
  );
}

export default App;
