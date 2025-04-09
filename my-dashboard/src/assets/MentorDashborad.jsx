import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";

const MentorDashboard = () => {
  const navigate = useNavigate();

  const defaultMentor = {
    name: "Dr. Amelia Carter",
    email: "amelia.carter@example.com",
    profilePic: "https://randomuser.me/api/portraits/women/45.jpg",
    about: "Expert in AI and ML with 10+ years of experience.",
    education: "PhD in Artificial Intelligence",
    experience: "10+ years in research and development",
    skills: "Python, TensorFlow, AI Ethics",
  };

  const [mentorProfile, setMentorProfile] = useState(defaultMentor);
  const [selectedMentee, setSelectedMentee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formPage, setFormPage] = useState(1);
  const [student, setStudent] = useState(defaultMentor);

  const mentees = [
    {
      id: 1,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      profilePic: "https://randomuser.me/api/portraits/women/75.jpg",
      about: "Aspiring developer passionate about ML",
      education: "B.E. in IT",
      experience: "Intern at ABC Corp.",
      skills: "React, Python",
    },
    {
      id: 2,
      name: "John Smith",
      email: "john.smith@example.com",
      profilePic: "https://randomuser.me/api/portraits/men/35.jpg",
      about: "Final year student interested in backend dev",
      education: "B.E. in CS",
      experience: "Project intern at XYZ",
      skills: "Node.js, Express, MongoDB",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMentorProfile(student);
    setShowModal(false);
    setFormPage(1);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen p-6 bg-gradient-to-r from-blue-50 to-blue-100 relative">
      {/* Left: Profile (Mentor or selected Mentee) */}
      <div className="w-full md:w-[30%] bg-white p-6 rounded-r-2xl shadow-lg overflow-y-auto relative">
        <img
          src={(selectedMentee || mentorProfile).profilePic}
          alt="Profile"
          className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-blue-500 shadow-md"
        />
        <h2 className="text-2xl text-center font-bold text-gray-800">
          {(selectedMentee || mentorProfile).name}
        </h2>
        <p className="text-center text-gray-500 mb-4">
          {(selectedMentee || mentorProfile).email}
        </p>
        <div className="text-sm text-gray-700 space-y-2">
          <p><strong>About:</strong> {(selectedMentee || mentorProfile).about}</p>
          <p><strong>Education:</strong> {(selectedMentee || mentorProfile).education}</p>
          <p><strong>Experience:</strong> {(selectedMentee || mentorProfile).experience}</p>
          <p><strong>Skills:</strong> {(selectedMentee || mentorProfile).skills}</p>
        </div>

        {!selectedMentee && (
          <button
            onClick={() => setShowModal(true)}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Right: Either List of Mentees or Chat */}
      <div className="w-full md:w-[70%] p-6 overflow-y-auto">
        {!selectedMentee ? (
          <>
            <h2 className="text-3xl font-semibold mb-6 text-gray-700">
              Mentee List
            </h2>
            <div className="space-y-6">
              {mentees.map((mentee) => (
                <div
                  key={mentee.id}
                  className="flex items-center bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-xl transition"
                  onClick={() => setSelectedMentee(mentee)}
                >
                  <img
                    src={mentee.profilePic}
                    alt={mentee.name}
                    className="w-20 h-20 rounded-full border-2 border-gray-300"
                  />
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold">{mentee.name}</h3>
                    <p className="text-gray-600">{mentee.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white h-full rounded-xl shadow-md p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Chat with {selectedMentee.name}
              </h2>
              <button
                className="text-sm text-blue-600 hover:underline"
                onClick={() => setSelectedMentee(null)}
              >
                ← Back to Mentee List
              </button>
            </div>
            <div className="flex-1 bg-gray-100 rounded-lg p-4 mb-4 overflow-y-auto">
              {/* Chat messages */}
              <p className="text-gray-600 text-center mt-10">
                Chat UI coming soon...
              </p>
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700">
                Send
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal with Form and Blur Background */}
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

            <form onSubmit={handleSubmit}>
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
                      type="button"
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
                      type="button"
                      className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                      onClick={() => setFormPage(1)}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                    >
                      Save
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorDashboard;
