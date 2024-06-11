import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([]);

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      return;
    }
    setFile(selectedFile);
    setMessages(prev => [...prev, { text: `Selected file: ${selectedFile.name}`, sender: 'user' }]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }
    setMessages(prev => [...prev, { text: 'Uploading file...', sender: 'user' }]);

    const formData = new FormData();
    formData.append('file', file);

    // Send the file to the backend
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    setMessages(prev => [...prev, { text: `File uploaded! Detected: ${result.description}`, sender: 'agent' }]);
  };

  return (
    <div className="App">
      <Header />
      <div className="chat-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        <div className="file-upload-container">
          <input type="file" onChange={handleFileSelect} className="file-input" />
          <button onClick={handleUpload} className="upload-button">Upload</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
