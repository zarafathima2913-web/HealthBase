import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Upload = () => {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Prescription');
  const [uploading, setUploading] = useState(false);

  const handleUpload = (e) => {
    e.preventDefault();
    setUploading(true);
    // Simulate upload delay
    setTimeout(() => {
      setUploading(false);
      setFile(null);
      setTitle('');
      alert('Document uploaded successfully!');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Upload Medical Record</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Securely upload a new medical document, lab result, or prescription.</p>
      </div>

      <form onSubmit={handleUpload} className="bg-white dark:bg-slate-800 p-8 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Document Title</label>
          <input 
            type="text" 
            required 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition-colors" 
            placeholder="e.g. October Blood Work"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Document Type</label>
          <select 
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option>Prescription</option>
            <option>Lab Result</option>
            <option>Vaccination Record</option>
            <option>Doctor Note</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Upload File</label>
          <div className="mt-1 flex justify-center px-6 pt-10 pb-12 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-xl bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative group">
            <div className="space-y-1 text-center">
              <svg className="mx-auto h-12 w-12 text-slate-400 group-hover:text-blue-500 transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-slate-600 dark:text-slate-400 justify-center">
                <label className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e) => setFile(e.target.files[0])} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-500">PNG, JPG, PDF up to 10MB</p>
            </div>
          </div>
          {file && <p className="mt-2 text-sm text-green-600 dark:text-green-400 font-medium flex items-center"><svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Selected: {file.name}</p>}
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-end">
          <button 
            type="submit"
            disabled={uploading || !file}
            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 dark:disabled:bg-slate-600 transition-colors"
          >
            {uploading ? 'Uploading...' : 'Secure Upload'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
