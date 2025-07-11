import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    dob: "",
    role: "",
    type: "",
    image: null
  });

  const [currentImage, setCurrentImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/employees/${id}`);
        setForm(res.data);
        setCurrentImage(res.data.image);
      } catch (err) {
        console.error("Failed to fetch employee:", err);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    // Append all form fields
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/employees/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      navigate("/dashboard", { state: { refresh: true } });
    } catch (err) {
      console.error("Update failed:", err);
      alert("Update failed. Please try again.");
    }
  };

  return (
    <>
    
      <div className="container mt-5" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone:</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Role:</label>
            <input
              type="text"
              name="role"
              className="form-control"
              value={form.role}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Type:</label>
            <select
              name="type"
              className="form-control"
              value={form.type}
              onChange={handleChange}
            >
              <option value="">Select type</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Profile Image:</label>
            <input
              type="file"
              name="image"
              className="form-control"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>

          {(currentImage || previewImage) && (
            <div className="mb-3 text-center">
              <label className="form-label">Current Image:</label>
              <div className="mt-2">
                <img
                  src={previewImage || `${process.env.REACT_APP_API_BASE_URL}/uploads/${currentImage}`}
                  alt="Current Profile"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #ddd"
                  }}
                />
              </div>
            </div>
          )}

          <div className="d-grid gap-2 mt-4">
            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ backgroundColor: "#007bff", borderColor: "#007bff" }}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditEmployee;
