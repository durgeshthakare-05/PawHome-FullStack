import React, { useState } from 'react';
import './App.css';

const INITIAL_PETS = [
  { id: 1, name: "Bella", type: "Dog", breed: "Golden Retriever", age: "2 Yrs", status: "AVAILABLE", image: "/images/dog1.jpg" },
  { id: 2, name: "Milo", type: "Cat", breed: "Persian", age: "1 Yr", status: "AVAILABLE", image: "/images/cat1.jpg" },
  { id: 3, name: "Charlie", type: "Dog", breed: "Beagle", age: "3 Yrs", status: "FOSTERED", image: "/images/dog2.jpg" },
  { id: 4, name: "Luna", type: "Cat", breed: "Siamese", age: "6 Mos", status: "AVAILABLE", image: "/images/cat2.jpg" }
];

function App() {
  const [pets, setPets] = useState(INITIAL_PETS);
  const [filter, setFilter] = useState("ALL");
  const [selectedPet, setSelectedPet] = useState(null);
  const [requestType, setRequestType] = useState("ADOPT");
  const [notes, setNotes] = useState("");
  const [view, setView] = useState("CATALOG");
  const [requests, setRequests] = useState([
    { id: 101, petName: "Bella", applicant: "Rahul Sharma", type: "ADOPT", status: "PENDING", date: "2026-10-15" }
  ]);

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (!selectedPet) return;
    const newReq = {
      id: Date.now(),
      petName: selectedPet.name,
      applicant: "Current User",
      type: requestType,
      status: "PENDING",
      date: "2026-10-16"
    };
    setRequests([...requests, newReq]);
    setSelectedPet(null);
    setNotes("");
  };

  const handleAdminAction = (reqId, action) => {
    setRequests(requests.map(r => r.id === reqId ? { ...r, status: action } : r));
  };

  const filteredPets = pets.filter(p => filter === "ALL" || p.type.toUpperCase() === filter);

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="logo">PawHome</div>
        <nav className="nav-links">
          <button className={view === "CATALOG" ? "active" : ""} onClick={() => setView("CATALOG")}>Pet Catalog</button>
          <button className={view === "REQUESTS" ? "active" : ""} onClick={() => setView("REQUESTS")}>My Applications</button>
          <button className={view === "ADMIN" ? "active" : ""} onClick={() => setView("ADMIN")}>Admin Dashboard</button>
        </nav>
      </header>

      {view === "CATALOG" && (
        <main className="main-content">
          <div className="hero-banner">
            <h1>Find Your New Best Friend</h1>
            <p>Connect with local shelters for adoption and fostering opportunities.</p>
            <div className="filter-bar">
              <button className={filter === "ALL" ? "filter-btn active" : "filter-btn"} onClick={() => setFilter("ALL")}>All Pets</button>
              <button className={filter === "DOG" ? "filter-btn active" : "filter-btn"} onClick={() => setFilter("DOG")}>Dogs</button>
              <button className={filter === "CAT" ? "filter-btn active" : "filter-btn"} onClick={() => setFilter("CAT")}>Cats</button>
            </div>
          </div>

          <div className="pet-grid">
            {filteredPets.map(pet => (
              <div key={pet.id} className="pet-card">
                <div className="pet-img-placeholder">{pet.type === 'Dog' ? '🐶' : '🐱'}</div>
                <div className="pet-info">
                  <div className="pet-header">
                    <h3>{pet.name}</h3>
                    <span className={`status-badge ${pet.status.toLowerCase()}`}>{pet.status}</span>
                  </div>
                  <p className="pet-details">{pet.breed} - {pet.age}</p>
                  <div className="card-actions">
                    <button disabled={pet.status !== "AVAILABLE"} onClick={() => { setSelectedPet(pet); setRequestType("ADOPT"); }} className="btn btn-primary">Adopt</button>
                    <button disabled={pet.status !== "AVAILABLE"} onClick={() => { setSelectedPet(pet); setRequestType("FOSTER"); }} className="btn btn-secondary">Foster</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {selectedPet && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{requestType === "ADOPT" ? "Adoption" : "Foster"} Application for {selectedPet.name}</h2>
            <form onSubmit={handleRequestSubmit}>
              <div className="form-group">
                <label>Applicant Name</label>
                <input type="text" defaultValue="Current User" required />
              </div>
              <div className="form-group">
                <label>Why would you be a good fit?</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows="3" placeholder="Tell us about your home environment..." required></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setSelectedPet(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit Application</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {view === "REQUESTS" && (
        <main className="main-content">
          <h2>My Adoption & Foster Applications</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Pet Name</th>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req.id}>
                  <td>#{req.id}</td>
                  <td>{req.petName}</td>
                  <td>{req.type}</td>
                  <td>{req.date}</td>
                  <td><span className={`status-badge ${req.status.toLowerCase()}`}>{req.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      )}

      {view === "ADMIN" && (
        <main className="main-content">
          <h2>Admin Dashboard</h2>
          <div className="stats-cards">
            <div className="stat-card"><h3>4</h3><p>Total Pets</p></div>
            <div className="stat-card"><h3>3</h3><p>Available</p></div>
            <div className="stat-card"><h3>1</h3><p>Fostered</p></div>
            <div className="stat-card"><h3>{requests.length}</h3><p>Applications</p></div>
          </div>

          <h3>Pending Requests</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Pet</th>
                <th>Applicant</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req.id}>
                  <td>{req.petName}</td>
                  <td>{req.applicant}</td>
                  <td>{req.type}</td>
                  <td><span className={`status-badge ${req.status.toLowerCase()}`}>{req.status}</span></td>
                  <td>
                    {req.status === "PENDING" ? (
                      <div>
                        <button className="btn-sm btn-success" onClick={() => handleAdminAction(req.id, "APPROVED")}>Approve</button>
                        <button className="btn-sm btn-danger" onClick={() => handleAdminAction(req.id, "REJECTED")}>Reject</button>
                      </div>
                    ) : (
                      <span>Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      )}
    </div>
  );
}

export default App;
