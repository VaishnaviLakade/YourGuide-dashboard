import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    profilePic: "https://randomuser.me/api/portraits/men/75.jpg",
    about: "",
    education: "",
    experience: "",
    skills: "",
  });

  const [mentors, setMentors] = useState([
    {
      id: 1,
      name: "Dr. Amelia Carter",
      position: "Senior AI Researcher",
      description: "Expert in ML and AI with 10+ years of experience.",
      profilePic: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      id: 2,
      name: "James Smith",
      position: "Software Engineer at Google",
      description: "Full-stack developer specializing in React and Node.js.",
      profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      name: "Sophia Johnson",
      position: "CTO at TechStart",
      description: "Passionate about startups and innovation.",
      profilePic: "https://randomuser.me/api/portraits/women/50.jpg",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formPage, setFormPage] = useState(1);
  const [formData, setFormData] = useState({
    about: "",
    education: "",
    experience: "",
    skills: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setStudent((prev) => ({ ...prev, ...formData }));
    setShowModal(false);
    setFormPage(1);
  };

  const handleMentorClick = (id) => {
    navigate(`/mentor/${id}`);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen p-6 bg-gradient-to-r from-blue-50 to-blue-100">
      {/* Student Profile */}
      <div className="md:w-1/4 bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center">
        <img
          src={student.profilePic}
          alt="Student Profile"
          className="w-32 h-32 rounded-full mb-4 shadow-md border-4 border-blue-500"
        />
        <h2 className="text-2xl font-semibold">{student.name}</h2>
        <p className="text-lg text-gray-500 mb-2">{student.email}</p>
        <p className="text-sm text-gray-700">{student.about}</p>
        <p className="text-sm text-gray-700">Education: {student.education}</p>
        <p className="text-sm text-gray-700">Experience: {student.experience}</p>
        <p className="text-sm text-gray-700">Skills: {student.skills}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => setShowModal(true)}
        >
          Update Profile
        </button>
      </div>

      {/* Mentors Section */}
      <div className="md:w-3/4 p-6 overflow-auto">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">Mentors</h2>
        <div className="flex flex-col space-y-6">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="flex items-center bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer"
              onClick={() => handleMentorClick(mentor.id)}
            >
              <img
                src={mentor.profilePic}
                alt={mentor.name}
                className="w-24 h-24 rounded-full shadow-md border-2 border-gray-300"
              />
              <div className="ml-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {mentor.name}
                </h3>
                <p className="text-lg text-gray-500">{mentor.position}</p>
                <p className="text-base text-gray-600 mt-2">
                  {mentor.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal with Blur Background */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background Blur Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-md"></div>

          {/* Modal Box */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-[90%] md:w-[35rem] p-6 z-50">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl font-bold"
              onClick={() => {
                setShowModal(false);
                setFormPage(1);
              }}
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Update Profile
            </h2>

            {formPage === 1 && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-600 mb-1">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const imageUrl = URL.createObjectURL(file);
                        setStudent((prev) => ({
                          ...prev,
                          profilePic: imageUrl,
                        }));
                      }
                    }}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 mb-1">About</label>
                  <textarea
                    name="about"
                    rows="3"
                    placeholder="Tell something about yourself"
                    className="w-full border px-3 py-2 rounded"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-600 mb-1">Education</label>
                  <input
                    name="education"
                    placeholder="e.g., B.E. in Computer Engineering"
                    className="w-full border px-3 py-2 rounded"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    onClick={() => setFormPage(2)}
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {formPage === 2 && (
              <>
                <div className="mb-6">
                  <label className="block text-gray-600 mb-1">Experience</label>
                  <input
                    name="experience"
                    placeholder="e.g., 2 years as a web developer"
                    className="w-full border px-3 py-2 rounded"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-600 mb-1">Skills</label>
                  <textarea
                    name="skills"
                    rows="2"
                    placeholder="e.g., JavaScript, React, Node.js"
                    className="w-full border px-3 py-2 rounded"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-600 mb-1">
                    Upload Resume / Certificate (PDF)
                  </label>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="w-full border px-3 py-2 rounded"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        console.log("PDF uploaded:", file.name);
                      }
                    }}
                    required
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                    onClick={() => setFormPage(1)}
                  >
                    Back
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
