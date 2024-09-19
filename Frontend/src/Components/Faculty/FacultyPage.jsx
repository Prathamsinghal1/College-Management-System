import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Search, ChevronDown, ChevronUp, Mail, Phone, Pencil, Trash } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationPopup from './ConfirmationPopup'; // Adjust the import path as necessary

export default function FacultyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [facultyData, setFacultyData] = useState([]);
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedFacultyId, setSelectedFacultyId] = useState(null);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  const filteredFaculty = facultyData.filter(
    (faculty) =>
      faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faculty.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedFaculty = [...filteredFaculty].sort((a, b) => {
    if (sortColumn) {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://college-management-backend-4zro.onrender.com/faculty/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFacultyData(facultyData.filter((faculty) => faculty._id !== id));
      toast.success('Faculty member deleted successfully', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error deleting faculty:', error);
      toast.error('Failed to delete faculty', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Full-Time':
        return 'bg-green-100 text-green-800';
      case 'Part-Time':
        return 'bg-blue-100 text-blue-800';
      case 'Adjunct':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await axios.get('https://college-management-backend-4zro.onrender.com/faculty', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setFacultyData(response.data);
      } catch (error) {
        console.error('Error fetching faculty:', error);
        toast.error('Failed to load faculty data', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchFaculty();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 p-8 lg:pr-16">
      <div className="lg:mr-16">
        <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="flex md:flex-row flex-col items-center justify-between mb-4">
            <h1 className="md:text-5xl text-4xl font-extrabold text-purple-700 lg:ml-10 my-5">
              Faculty
            </h1>
            {role === "admin" && (
              <Link
                to="/faculty/add-faculty"
                className="bg-gradient-to-br from-purple-300 to-indigo-300 hover:from-purple-400 hover:to-indigo-400 transition-all duration-300 transform hover:scale-105 text-white py-2 px-4 rounded-[30px] flex items-center gap-2"
              >
                <UserPlus className="mr-2 h-4 w-4 inline-block" /> Add Faculty
              </Link>
            )}
          </div>

          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Search faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 mt-1 block border border-gray-300 rounded-lg border-2 border-[text-[hsl(0,0%,40%)]] rounded-[30px] outline-none focus:border-[hsl(271,76%,53%)] text-[hsl(0,0%,40%)]"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(0,0%,40%)]"
              size={18}
            />
          </div>

          <div className="overflow-hidden border rounded-md overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th
                    onClick={() => handleSort("name")}
                    className="cursor-pointer hover:bg-purple-50 p-4 text-[hsl(0,0%,40%)]"
                  >
                    Name{" "}
                    {sortColumn === "name" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="inline" />
                      ) : (
                        <ChevronDown className="inline" />
                      ))}
                  </th>
                  <th
                    onClick={() => handleSort("department")}
                    className="cursor-pointer hover:bg-purple-50 p-4 text-[hsl(0,0%,40%)]"
                  >
                    Department{" "}
                    {sortColumn === "department" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="inline" />
                      ) : (
                        <ChevronDown className="inline" />
                      ))}
                  </th>
                  <th className="p-4 text-[hsl(0,0%,40%)]">Contact</th>
                  <th
                    onClick={() => handleSort("status")}
                    className="cursor-pointer hover:bg-purple-50 p-4 text-[hsl(0,0%,40%)]"
                  >
                    Status{" "}
                    {sortColumn === "status" &&
                      (sortDirection === "asc" ? (
                        <ChevronUp className="inline" />
                      ) : (
                        <ChevronDown className="inline" />
                      ))}
                  </th>
                  {role === "admin" && (
                    <th className="p-4 text-[hsl(0,0%,40%)]">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {sortedFaculty.map((faculty) => (
                  <tr
                    key={faculty._id}
                    className="hover:bg-purple-50 transition-colors text-[hsl(0,0%,50%)]"
                  >
                    <td className="p-4">{faculty.name}</td>
                    <td className="p-4">{faculty.department}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-[hsl(0,0%,40%)]" />
                        <span>{faculty.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Phone className="h-4 w-4 text-[hsl(0,0%,40%)]" />
                        <span>{faculty.phoneNo}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`${getStatusColor(
                          faculty.status
                        )} px-2 inline-flex text-xs leading-5 font-semibold rounded-full whitespace-nowrap`}
                      >
                        {faculty.status}
                      </span>
                    </td>

                    {role === 'admin' && (
                      <td className="p-4 flex gap-3">
                        <button
                          onClick={() => navigate(`/faculty/edit-faculty/${faculty._id}`)}
                          className="bg-gradient-to-br from-purple-300 to-indigo-300 hover:from-purple-400 hover:to-indigo-400 transition-all duration-300 transform hover:scale-105 text-white px-2 py-1 rounded-lg "
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedFacultyId(faculty._id);
                            setIsPopupOpen(true);
                          }}
                          className="bg-gradient-to-br from-pink-300 to-pink-400 hover:from-red-500 hover:to-red-500 transition-all duration-300 transform hover:scale-105 text-white px-2 py-1 rounded-lg "
                        >
                          <Trash size={16} />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={() => {
          if (selectedFacultyId) {
            handleDelete(selectedFacultyId);
          }
        }}
      />
      <ToastContainer />
    </div>
  );
}
