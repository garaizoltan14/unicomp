import { useEffect, useState } from "react";
import { getAllBooks } from "../api/book.api";

type UserFormData = {
  name: string;
  password: string;
  email: string;
};

const Register = () => {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    password: "",
    email: "",
  });

  function handleRegisterFormSubmit() {
    getAllBooks();
  }

  return (
    <div className="form-container">
      <form
        name="registerForm"
        className="register-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleRegisterFormSubmit();
        }}
      >
        <h2 className="form-title">Regisztráció</h2>
        <div className="form-item">
          <label htmlFor="name" className="form-label">
            Felhasználónév:
          </label>

          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          ></input>
        </div>
        <div className="form-item">
          <label htmlFor="name" className="form-label">
            Email cím:{" "}
          </label>

          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          ></input>
        </div>
        <div className="form-item">
          <label htmlFor="name" className="form-label">
            Jelszó:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            minLength={8}
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          ></input>
        </div>
        <button type="submit" className="confirmButton">
          Regisztráció
        </button>
      </form>
    </div>
  );
};

export default Register;
