import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Haversine formula to calculate distance between two coordinates in km
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return (R * c).toFixed(1);
};

const WorkerDashboard = () => {
  const { user } = useAuth();
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [hospitals, setHospitals] = useState([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  
  const [manualLocation, setManualLocation] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const fetchHospitals = async (lat, lng) => {
    setLoadingHospitals(true);
    setLocationError('');
    try {
      const radius = 5000; // 5km
      const query = `
        [out:json];
        (
          node["amenity"="hospital"](around:${radius},${lat},${lng});
          node["amenity"="clinic"](around:${radius},${lat},${lng});
          node["amenity"="pharmacy"](around:${radius},${lat},${lng});
        );
        out body 10;
      `;
      const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (data.elements && data.elements.length > 0) {
        const realHospitals = data.elements.map((el) => {
          const type = el.tags.amenity === 'hospital' ? 'General Hospital' 
                     : el.tags.amenity === 'clinic' ? 'Medical Clinic' 
                     : 'Pharmacy';
          return {
            id: el.id,
            name: el.tags.name || `Unnamed ${type}`,
            lat: el.lat,
            lng: el.lon,
            distance: calculateDistance(lat, lng, el.lat, el.lon),
            type: type,
            status: el.tags.opening_hours ? 'Open' : 'Hours Unknown',
          };
        });
        
        realHospitals.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
        setHospitals(realHospitals.slice(0, 5));
      } else {
        setHospitals([]);
      }
    } catch (err) {
      console.error("Failed to fetch hospitals:", err);
      setLocationError("Could not fetch real hospital data. Try again later.");
    } finally {
      setLoadingHospitals(false);
    }
  };

  const handleManualSearch = async (e) => {
    e.preventDefault();
    if (!manualLocation.trim()) return;
    
    setIsSearching(true);
    setLocationError('');
    try {
      // Use Nominatim OpenStreetMap API for geocoding
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(manualLocation)}&limit=1`);
      const data = await res.json();
      
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        setLocation({ lat, lng });
        await fetchHospitals(lat, lng);
      } else {
        setLocationError(`Could not find coordinates for "${manualLocation}". Try another city or zip code.`);
      }
    } catch (err) {
      setLocationError("Failed to search location. Please check your internet connection.");
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation({ lat, lng });
          fetchHospitals(lat, lng);
        },
        (error) => {
          setLocationError('Location access denied. Please use the manual search below.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
    }
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Premium Header */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-10 shadow-2xl overflow-hidden text-white">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-48 h-48 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-48 h-48 bg-indigo-400 opacity-20 rounded-full blur-2xl"></div>
        
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Welcome back, {user?.name || 'User'}</h1>
            <p className="mt-2 text-blue-100 text-lg">Your health profile and medical dashboard are up to date.</p>
          </div>
          <div className="mt-6 sm:mt-0">
            <Link to={`/${user?.role}/upload`} className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-lg text-sm font-bold text-blue-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all transform hover:-translate-y-1">
              + Upload New Record
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Health Profile & Meds */}
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center mr-3">❤️</span>
              Emergency Profile
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Blood Group</span>
                <span className="text-sm font-bold text-red-600 dark:text-red-400">{user?.bloodGroup || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Allergies</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{user?.allergies || 'None'}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Conditions</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{user?.existingConditions || 'None'}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Contact</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{user?.emergencyContact || 'N/A'}</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3">💊</span>
              Current Medications
            </h2>
            {user?.medications ? (
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/30 rounded-2xl">
                <p className="text-sm text-indigo-900 dark:text-indigo-200 font-medium whitespace-pre-wrap">{user.medications}</p>
              </div>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">No active medications registered.</p>
            )}
          </motion.div>
        </div>

        {/* Right Column: Location & Hospitals */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center z-10 relative">
              <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3">🏥</span>
              Nearby Hospitals & Specialists
            </h2>
            
            {locationError ? (
              <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-2xl text-center">
                <p className="text-red-600 dark:text-red-400 font-medium mb-4">{locationError}</p>
                <form onSubmit={handleManualSearch} className="flex max-w-sm mx-auto space-x-2">
                  <input type="text" value={manualLocation} onChange={(e) => setManualLocation(e.target.value)} placeholder="Enter city or zip code" className="flex-1 px-4 py-2 bg-white dark:bg-slate-950 border border-red-200 dark:border-red-800 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:border-red-500" />
                  <button type="submit" disabled={isSearching || !manualLocation.trim()} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold disabled:opacity-50">
                    {isSearching ? '...' : 'Search'}
                  </button>
                </form>
                <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 text-red-600 dark:text-red-400 text-xs font-bold hover:underline">
                  Or Retry Auto Location Access
                </button>
              </div>
            ) : !location || loadingHospitals ? (
              <div className="flex flex-col items-center justify-center p-12">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-slate-500 font-medium">{!location ? 'Locating your position...' : 'Fetching real nearby medical facilities...'}</p>
              </div>
            ) : (
              <div className="space-y-4 relative z-10">
                <div className="mb-4">
                  <form onSubmit={handleManualSearch} className="flex max-w-md space-x-2">
                    <input type="text" value={manualLocation} onChange={(e) => setManualLocation(e.target.value)} placeholder="Search a different city or area..." className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-500" />
                    <button type="submit" disabled={isSearching || !manualLocation.trim()} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold disabled:opacity-50">
                      {isSearching ? 'Searching...' : 'Search'}
                    </button>
                  </form>
                </div>
                
                {/* Real Interactive Embed Map */}
                <div className="h-64 w-full bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden relative mb-6 border border-slate-200 dark:border-slate-700">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight="0" 
                    marginWidth="0" 
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.lng-0.02}%2C${location.lat-0.02}%2C${location.lng+0.02}%2C${location.lat+0.02}&layer=mapnik&marker=${location.lat}%2C${location.lng}`}
                    className="absolute inset-0"
                  ></iframe>
                </div>

                {hospitals.length === 0 && !loadingHospitals ? (
                  <p className="text-center text-slate-500 py-4">No hospitals found in this area. Try searching a larger city.</p>
                ) : hospitals.map((hospital, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.1 + (index * 0.1) }}
                    key={hospital.id || index} 
                    className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-800 rounded-2xl hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all group bg-white dark:bg-slate-900/50"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-lg mr-4 group-hover:scale-110 transition-transform">
                        {hospital.distance}
                        <span className="text-[10px] ml-0.5 mt-1">km</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">{hospital.name}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 capitalize">{hospital.type}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <span className="inline-block px-3 py-1 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold rounded-full mb-2">
                        {hospital.status}
                      </span>
                      <a 
                        href={`https://www.google.com/maps/dir/?api=1&origin=${location.lat},${location.lng}&destination=${hospital.lat},${hospital.lng}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="block text-xs text-blue-600 dark:text-blue-400 font-medium cursor-pointer hover:underline"
                      >
                        Get Directions →
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
                <span className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mr-3">📄</span>
                Recent Reports
              </h2>
              <Link to={`/${user?.role}/records`} className="text-sm font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">View All →</Link>
            </div>
            
            {user?.reports ? (
               <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                 <p className="text-sm text-slate-700 dark:text-slate-300 font-medium whitespace-pre-wrap">{user.reports}</p>
               </div>
            ) : (
              <div className="overflow-hidden border border-slate-100 dark:border-slate-800 rounded-2xl">
                <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800">
                  <thead className="bg-slate-50 dark:bg-slate-900/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-500">Oct 12, 2026</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-slate-900 dark:text-white">General Checkup</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm"><button className="text-blue-600 font-medium hover:underline">Download</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
        
      </div>
    </div>
  );
};

export default WorkerDashboard;
