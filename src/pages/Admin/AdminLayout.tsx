import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';

const AdminLayout = () => {
  return (
    <div className="md:grid md:grid-cols-3">
      <div className="md:col-span-1">
        <AdminHeader />
      </div>
      <div className="md:col-span-2">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
