import { useEffect, useState } from "react";
import axios from "axios";
import "../Css/ChangePassword.css";
import TopNavigation from "./TopNavigation";
import TopNavigationPharmacist from "./TopNavigationPharmacist";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TopNavigationAdmin from "./TopNavigationAdmin";

const PasswordField = ({ value, onChange, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <TextField
      type={showPassword ? "text" : "password"}
      value={value}
      label={placeholder}
      onChange={onChange}
      style={{ "margin-bottom": "15px" }}
      placeholder={placeholder}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={togglePasswordVisibility}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changed, setChanged] = useState(false);
  const [role, setRole] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  //   const navigate = useNavigate();

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    const confirmPass = e.target.value;
    setConfirmPassword(confirmPass);
  };
  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    } else {
      setPasswordsMatch(true);
      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/changePassword",
        { currentPassword, newPassword },
        { withCredentials: true }
      );

      console.log(res.data);
      if (res.data.status === "success") {
        setChanged(true);
      }
    }
  };

  const showData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/auth/getMe",
        { withCredentials: true }
      );
      setRole(response.data.role);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    showData();
  }, []);

  return (
    <div>
      {role === "patient" && <TopNavigation link="/patients/medicines" />}
      {role === "pharmacist" && (
        <TopNavigationPharmacist link="/pharmacists/medicines" />
      )}
      {role === "admin" && <TopNavigationAdmin link="/admins/home" />}
      <div className="container-password">
        <h2>Change Password</h2>

        {/* <label htmlFor="currentPasswordInput">
          Enter your current password:
        </label> */}
        <PasswordField
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
          placeholder={"Current Password"}
        />

        {/* <label htmlFor="newPasswordInput">Enter your new password:</label> */}
        <PasswordField
          value={newPassword}
          onChange={handleNewPasswordChange}
          placeholder="New Password"
        />

        {/* <label htmlFor="confirmPasswordInput">Confirm new password:</label> */}
        <PasswordField
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Confirm Password"
        />
        {!passwordsMatch && (
          <div className="error-message">Passwords do not match!</div>
        )}
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
        {changed && <div>Password changed successfully</div>}
      </div>
    </div>
  );
};

export default ChangePassword;
