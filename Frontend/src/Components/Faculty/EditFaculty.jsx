import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditFacultyPage() {
  const { id } = useParams(); // Get faculty ID from URL
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    phoneNo: '',
    status: ''
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch faculty data based on ID
    const fetchFaculty = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/faculty/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setFormData(response.data);
        setIsLoading(false);
      } catch (error) {
        toast.error(`Error fetching faculty data: ${error.response?.data?.message || error.message}`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setIsLoading(false);
      }
    };

    fetchFaculty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:1000/faculty/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      toast.success('Faculty member updated successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => navigate('/faculty'), 3000);
    } catch (error) {
      toast.error(`Error updating faculty: ${error.response?.data?.message || error.message}`, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 p-8">
      <ToastContainer />
      <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/faculty')}
            className="text-purple-600 hover:text-purple-800 transition-colors flex items-center font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Faculty
          </button>
          <h2 className="text-3xl font-bold text-purple-700">Edit Faculty Member</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-[hsl(0,0%,40%)]">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-lg border-2 border-[text-[hsl(0,0%,40%)]] rounded-[30px] outline-none focus:border-[hsl(271,76%,53%)] text-[hsl(0,0%,40%)]"
              placeholder="Enter faculty member's full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-[hsl(0,0%,40%)]">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-lg border-2 border-[text-[hsl(0,0%,40%)]] rounded-[30px] outline-none focus:border-[hsl(271,76%,53%)] text-[hsl(0,0%,40%)]"
              placeholder="Enter faculty member's email address"
            />
          </div>
          <div>
            <label htmlFor="department" className="text-sm font-medium text-[hsl(0,0%,40%)]">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-lg border-2 border-[text-[hsl(0,0%,40%)]] rounded-[30px] outline-none focus:border-[hsl(271,76%,53%)] text-[hsl(0,0%,40%)]"
            >
              <option value="" disabled>Select a department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
            </select>
          </div>
          <div>
            <label htmlFor="phoneNo" className="text-sm font-medium text-[hsl(0,0%,40%)]">Phone Number</label>
            <input
              id="phoneNo"
              name="phoneNo"
              type="tel"
              value={formData.phoneNo}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-lg border-2 border-[text-[hsl(0,0%,40%)]] rounded-[30px] outline-none focus:border-[hsl(271,76%,53%)] text-[hsl(0,0%,40%)]"
              placeholder="Enter faculty member's phone number"
            />
          </div>
          <div>
            <label htmlFor="status" className="text-sm font-medium text-[hsl(0,0%,40%)]">Employment Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-lg border-2 border-[text-[hsl(0,0%,40%)]] rounded-[30px] outline-none focus:border-[hsl(271,76%,53%)] text-[hsl(0,0%,40%)]"
            >
              <option value="" disabled>Select employment status</option>
              <option value="Full-Time">Full-time</option>
              <option value="Part-Time">Part-time</option>
              <option value="Adjunct">Adjunct</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[75%] my-2 bg-gradient-to-br from-purple-300 to-indigo-300 hover:from-purple-400 hover:to-indigo-400 transition-all duration-300 transform hover:scale-105 text-white py-2 px-4 rounded-[30px] flex items-center justify-center"
            >
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
