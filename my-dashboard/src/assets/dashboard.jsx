import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/style.css";

const Dashboard = () => {
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
      name: "Dr. Amelia Carter",
      position: "Senior AI Researcher",
      description: "Expert in ML and AI with 10+ years of experience.",
      profilePic: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      name: "James Smith",
      position: "Software Engineer at Google",
      description: "Full-stack developer specializing in React and Node.js.",
      profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sophia Johnson",
      position: "CTO at TechStart",
      description: "Passionate about startups and innovation.",
      profilePic: "https://randomuser.me/api/portraits/women/50.jpg",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    about: "",
    education: "",
    experience: "",
    skills: "",
  });

  useEffect(() => {
    // Fetch data from backend (if needed)
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setStudent((prevStudent) => ({ ...prevStudent, ...formData }));
    setShowModal(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen p-6 bg-gradient-to-r from-blue-50 to-blue-100">
      {/* Left Side - Student Profile */}
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
        <p className="text-sm text-gray-700">
          Experience: {student.experience}
        </p>
        <p className="text-sm text-gray-700">Skills: {student.skills}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => setShowModal(true)}
        >
          Update Profile
        </button>
      </div>

      {/* Right Side - Mentor Profiles */}
      <div className="md:w-3/4 p-6">
        <h2 className="text-3xl font-semibold mb-6 text-gray-700">Mentors</h2>
        <div className="flex flex-col space-y-6">
          {mentors.map((mentor, index) => (
            <div
              key={index}
              className="flex items-center bg-white p-6 rounded-2xl shadow-md transition hover:shadow-xl w-full"
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

      {/* Update Profile Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-900 bg-opacity-30 backdrop-blur-md"></div>
          <div className="bg-white p-6 rounded-lg w-1/3 shadow-xl z-10">
            <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
            <input
              name="about"
              placeholder="About"
              className="w-full p-2 border mb-2"
              onChange={handleInputChange}
            />
            <input
              name="education"
              placeholder="Education"
              className="w-full p-2 border mb-2"
              onChange={handleInputChange}
            />
            <input
              name="experience"
              placeholder="Experience"
              className="w-full p-2 border mb-2"
              onChange={handleInputChange}
            />
            <input
              name="skills"
              placeholder="Skills"
              className="w-full p-2 border mb-4"
              onChange={handleInputChange}
            />
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-gray-400 text-white rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
