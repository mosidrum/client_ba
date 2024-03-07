import AdminHeader from './AdminHeader';

type Props = {};

const Admin = (props: Props) => {
  return (
    <div className="flex h-screen lg:flex-row">
      <AdminHeader />
    </div>
  );
};

export default Admin;
