import { useAuth } from '../../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Emergency Profile</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Critical health information accessible by first responders and providers.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 bg-blue-600 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500 rounded-full opacity-50"></div>
          <div className="relative flex items-center space-x-5">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-blue-600 shadow-md">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-blue-100">{user?.email}</p>
              <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white border border-blue-400">
                {user?.role?.toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 mb-4">Vital Statistics</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Blood Group</dt>
                <dd className="mt-1 text-sm text-slate-900 dark:text-white font-semibold flex items-center">
                  <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                  {user?.bloodGroup || 'Not provided'}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Date of Birth</dt>
                <dd className="mt-1 text-sm text-slate-900 dark:text-white">{user?.dob || 'Not provided'}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Known Allergies</dt>
                <dd className="mt-1 text-sm text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700">{user?.allergies || 'No known allergies'}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-2 mb-4">Emergency Contacts</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Primary Contact Phone</dt>
                <dd className="mt-1 text-sm text-slate-900 dark:text-white font-medium">{user?.emergencyContact || 'Not provided'}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">Relationship</dt>
                <dd className="mt-1 text-sm text-slate-900 dark:text-white">Family Member</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
