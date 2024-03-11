import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { getAdmin } from '@services/users';
import { LoggedInUser } from '@customTypes/Types';

const AdminLayout = () => {
  const params = useParams();
  const userState = useSelector((state: any) => state.user);
  const [adminData, setAdminData] = useState<LoggedInUser | null>(null); // Use null for initial state

  useEffect(() => {
    const fetchData = async () => {
      const token = userState.userInfo.token;
      const data: LoggedInUser = await getAdmin(token, params.id);
      setAdminData(data);
      console.log(data);
      
    };

    fetchData();
  }, [params.id]);
  console.log(adminData);
  

  return (
    <div className="md:grid md:grid-cols-3">
      {adminData && (
        <div className="md:col-span-1">
          <AdminHeader adminData={adminData} />
        </div>
      )}
      <div className="md:col-span-2 -ml-7">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
