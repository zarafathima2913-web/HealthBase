import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Dashboards
import WorkerDashboard from './pages/dashboard/worker/WorkerDashboard';
import AthleteDashboard from './pages/dashboard/athlete/AthleteDashboard';
import DoctorDashboard from './pages/dashboard/doctor/DoctorDashboard';
import AdminDashboard from './pages/dashboard/admin/AdminDashboard';

// Features
import Records from './pages/features/Records';
import Upload from './pages/features/Upload';
import Profile from './pages/features/Profile';
import Settings from './pages/features/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/user" element={<WorkerDashboard />} />
            <Route path="/athlete" element={<AthleteDashboard />} />
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            
            {/* Feature Routes */}
            <Route path="/:role/records" element={<Records />} />
            <Route path="/:role/upload" element={<Upload />} />
            <Route path="/:role/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
