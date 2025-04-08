import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const mentors = [
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
];

const MentorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const mentorId = parseInt(id);
  const mentor = mentors.find((m) => m.id === mentorId);

  const [showChat, setShowChat] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleData, setScheduleData] = useState({ date: "", time: "" });

  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (messageInput.trim() !== "") {
      setMessages([...messages, messageInput]);
      setMessageInput("");
    }
  };

  const handleScheduleSubmit = () => {
    alert(`Call scheduled on ${scheduleData.date} at ${scheduleData.time}`);
  };

  if (!mentor) {
    return <div className="p-6 text-center text-red-600">Mentor not found</div>;
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        ← Back to Dashboard
      </button>

      <div className="flex flex-col lg:flex-row mt-20">
        {/* Left - Mentor Profile */}
        <div className={`w-full ${showChat || showSchedule ? "lg:w-1/2" : ""} p-4`}>
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <img
              src={mentor.profilePic}
              alt={mentor.name}
              className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500 mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800">{mentor.name}</h2>
            <p className="text-lg text-gray-600 mb-2">{mentor.position}</p>
            <p className="text-gray-700 mb-6">{mentor.description}</p>

            <div className="flex justify-center space-x-4">
              <button
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                onClick={() => {
                  setShowChat(true);
                  setShowSchedule(false);
                }}
              >
                Chat
              </button>
              <button
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                onClick={() => {
                  setShowChat(false);
                  setShowSchedule(true);
                }}
              >
                Schedule Call
              </button>
            </div>
          </div>
        </div>

        {/* Right - Chat Section */}
        {showChat && (
          <div className="w-full lg:w-1/2 p-4">
            <div className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Chat with {mentor.name}
              </h3>
              <div className="flex-1 overflow-y-auto bg-gray-100 p-4 rounded mb-4 space-y-2">
                {messages.length === 0 ? (
                  <p className="text-gray-600 italic">No messages yet.</p>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className="bg-blue-100 p-2 rounded-lg w-fit max-w-xs"
                    >
                      {msg}
                    </div>
                  ))
                )}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-l"
                />
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
                  onClick={handleSendMessage}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Right - Schedule Call Section */}
        {showSchedule && (
          <div className="w-full lg:w-1/2 p-4">
            <div className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Schedule a Call with {mentor.name}
              </h3>
              <div className="flex flex-col space-y-4">
                <label className="text-gray-700">
                  Select Date:
                  <input
                    type="date"
                    className="w-full mt-1 p-2 border rounded"
                    onChange={(e) =>
                      setScheduleData({ ...scheduleData, date: e.target.value })
                    }
                  />
                </label>
                <label className="text-gray-700">
                  Select Time:
                  <input
                    type="time"
                    className="w-full mt-1 p-2 border rounded"
                    onChange={(e) =>
                      setScheduleData({ ...scheduleData, time: e.target.value })
                    }
                  />
                </label>
                <button
                  onClick={handleScheduleSubmit}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 mt-4"
                >
                  Confirm Schedule
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorProfile;
