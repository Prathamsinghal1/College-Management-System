import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Search, ChevronDown, ChevronUp, Trash, Pencil } from 'lucide-react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ConfirmDeleteModal from './ConfirmDeleteModal'; // Import the modal component

export default function StudentPage() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null); // Track which student to delete
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:1000/students', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
        setError('Error fetching students');
        toast.error('Failed to load students');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:1000/students/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 200 || response.status === 204) {
        setStudents(students.filter((student) => student._id !== deleteId));
        toast.success("Student deleted successfully!");
      } else {
        throw new Error("Unexpected response from the server");
      }
    } catch (error) {
      toast.error(`Error deleting student: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
      setIsModalOpen(false); // Close the modal after deletion
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
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

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 p-8 lg:pr-16">
      <div className="lg:pr-16 lg:mr-8">
        <div className="w-full max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <div className="flex md:flex-row flex-col items-center justify-between mb-4">
            <h1 className="md:text-5xl text-4xl font-extrabold text-purple-700 lg:ml-10 my-5">Students</h1>
            {role !== "student" && <Link to="/student/add-student" className="bg-gradient-to-br from-purple-300 to-indigo-300 hover:from-purple-400 hover:to-indigo-400 transition-all duration-300 transform hover:scale-105 text-white py-2 px-4 rounded-[30px] flex items-center gap-2">
              <UserPlus className="mr-2 h-4 w-4 inline-block" /> Add Student
            </Link>}
          </div>

          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 mt-1 block border border-gray-300 rounded-lg border-2 border-[text-[hsl(0,0%,40%)]] rounded-[30px] outline-none focus:border-[hsl(271,76%,53%)] text-[hsl(0,0%,40%)]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(0,0%,40%)]" size={18} />
          </div>

          <div className="overflow-hidden border rounded-md overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th
                    onClick={() => handleSort('name')}
                    className="cursor-pointer hover:bg-purple-50 p-4 text-[hsl(0,0%,40%)]"
                  >
                    Name {sortColumn === 'name' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                  </th>
                  <th
                    onClick={() => handleSort('email')}
                    className="cursor-pointer hover:bg-purple-50 p-4 text-[hsl(0,0%,40%)]"
                  >
                    Email {sortColumn === 'email' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                  </th>
                  <th
                    className="hover:bg-purple-50 p-4 text-[hsl(0,0%,40%)]"
                  >
                    Courses 
                  </th>
                  <th
                    onClick={() => handleSort('yearOfStudy')}
                    className="cursor-pointer hover:bg-purple-50 p-4 text-[hsl(0,0%,40%)]"
                  >
                    Year {sortColumn === 'yearOfStudy' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
                  </th>
                  {role !== "student" && <th className="p-4 text-[hsl(0,0%,40%)]">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {sortedStudents.map((student) => (
                  <tr key={student._id} className="cursor-pointer hover:bg-purple-50 transition-colors text-[hsl(0,0%,50%)]">
                    <td className="p-4">{student.name}</td>
                    <td className="p-4">{student.email}</td>
                    <td className="p-4 border-b">
                      {student.courses.map((course,index) => (
                        <div key={index}>{index+1}. {course.name}</div> // Display course name
                      ))}
                    </td>
                    <td className="p-4">{student.yearOfStudy}</td>
                    {role !== "student" && <td className="p-4 flex gap-3">
                      <button
                        onClick={() => {
                          setDeleteId(student._id);
                          setIsModalOpen(true);
                        }}
                        className="bg-gradient-to-br from-pink-300 to-pink-400 hover:from-red-500 hover:to-red-500 transition-all duration-300 transform hover:scale-105 text-white px-2 py-1 rounded-lg"
                      >
                        <Trash size={18} />
                      </button>
                      <button
                        onClick={() => navigate(`/student/edit-student/${student._id}`)}
                        className="bg-gradient-to-br from-purple-300 to-indigo-300 hover:from-purple-400 hover:to-indigo-400 transition-all duration-300 transform hover:scale-105 text-white px-2 py-1 rounded-lg"
                      >

                          <Pencil size={16} />
                        </button>

                    </td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
      
      <ToastContainer />
    </div>
  );
}
