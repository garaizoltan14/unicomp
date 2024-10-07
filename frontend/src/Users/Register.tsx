import { useState } from "react";
import { createUser, User } from "../api/user.api";
import { useNavigate } from "react-router";

type UserFormError = {
  name: boolean;
  password: boolean;
  email: boolean;
};

const Register = () => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState<UserFormError>({
    name: false,
    password: false,
    email: false,
  });
  const [formData, setFormData] = useState<User>({
    name: "",
    password: "",
    email: "",
  });

  function validateData() {
    var error = { name: false, email: false, password: false };
    var valid = true;
    if (!/(.+)@(.+){2,}\.(.+){2,}/.test(formData.email)) {
      error = { ...error, email: true };
      valid = false;
    }
    if (!formData.name) {
      error = { ...error, name: true };
      valid = false;
    }
    if (formData.password.length < 8) {
      error = { ...error, password: true };
      valid = false;
    }
    setFormError(error);
    return valid;
  }

  async function handleRegisterFormSubmit() {
    if (!validateData()) {
      return;
    }
    const data = await createUser(formData);
    if (data) {
      navigate("/login");
    }
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
        noValidate
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
            className={`form-input ${formError.name ? "input-invalid" : ""}`}
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
            required
          ></input>
        </div>
        <div className="form-error" hidden={!formError.name}>
          Felhasználói név megadása kötelező!
        </div>
        <div className="form-item">
          <label htmlFor="name" className="form-label">
            Email cím:{" "}
          </label>

          <input
            type="email"
            id="email"
            name="email"
            className={`form-input ${formError.email ? "input-invalid" : ""}`}
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            required
          ></input>
        </div>
        <div className="form-error" hidden={!formError.email}>
          Érvénytelen email cím!
        </div>
        <div className="form-item">
          <label htmlFor="name" className="form-label">
            Jelszó:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={`form-input ${
              formError.password ? "input-invalid" : ""
            }`}
            minLength={8}
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            required
          ></input>
        </div>
        <div className="form-error" hidden={!formError.password}>
          A jelszónak legalább 8 karakter hosszúnak kell lennie!
        </div>
        <button type="submit" className="confirmButton">
          Regisztráció
        </button>
      </form>
    </div>
  );
};

export default Register;
