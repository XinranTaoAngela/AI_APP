import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessages([...messages, { text: `Selected file - ${event.target.files[0].name}`, sender: 'user' }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Please select a file first.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    setMessages([...messages, { text: 'Uploading...', sender: 'system' }]);

    // Send the file to the backend
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    setMessages([...messages, { text: `File uploaded! Detected: ${result.description}`, sender: 'system' }]);
  };

  return (
    <div className="App">
      <div className="chat-box">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="message-form">
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
