"use client";
import { Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const CreateUser = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    father_name: "",
    phone: "",
    email: "",
    password: "",
    gender: "",
    region_id: null,
    address: "",
    last_school: "",
    city_id: null,
  });

  // const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(true);

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {}
  );
  const validationSchema = Yup.object({
    first_name: Yup.string()
      .required("First Name is Required")
      .matches(/^[^0-9]*$/, "Numbers are not allowed")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "This field cannot contain white space and special character"
      )
      .trim(),
    last_name: Yup.string()
      .required("Last Name is Required")
      .matches(/^[^0-9]*$/, "Numbers are not allowed")
      .matches(
        /^[^!@#$%^&*(),.?":{}|<>]*$/,
        "This field cannot contain special characters"
      )

      .trim(),
    father_name: Yup.string()
      .required("Father Name is Required")
      .matches(/^[^0-9]*$/, "Numbers are not allowed")
      .matches(
        /^[^!@#$%^&*(),.?":{}|<>]*$/,
        "This field cannot contain special characters"
      )

      .trim(),
    phone: Yup.string()
      .matches(/^\d{11}$/, "Phone Number must be 11 digits")
      .required("Phone Number is Required")
      .trim(),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is Required")

      .trim(),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .required("Password is Required")
      // .matches(/^[^0-9]*$/, "Numbers are not allowed")
      .trim(),
    gender: Yup.string().required("Gender is Required").trim(),
    region_id: Yup.string()
      .required("Region ID is Required")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "This field cannot contain white space and special character"
      )
      .trim(),
    address: Yup.string().required("Address is Required").trim(),
    last_school: Yup.string()
      .required("Last School Name is Required")
      .matches(/^[^0-9]*$/, "Numbers are not allowed")
      .matches(
        /^[^!@#$%^&*(),.?":{}|<>]*$/,
        "This field cannot contain special characters"
      )

      .trim(),
    city_id: Yup.string().required("City ID is Required").trim(),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));

    validationSchema
      .validateAt(name, { [name]: value })
      .then(() => {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      })
      .catch((err) => {
        setErrors((prev) => ({ ...prev, [name]: err.message }));
      });
  };

  const router = useRouter();

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await validationSchema.validate(user, { abortEarly: false });
      console.log("Form submitted successfully");
      await axios.post("http://localhost:8800/users", user);
      router.push("/layout/users");
    } catch (err: any) {
      if (err.inner) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error: Yup.ValidationError) => {
          validationErrors[error.path!] = error.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <PageContainer title="Create User" description="Add a new user">
      <DashboardCard title="Add User">
        <form>
          <div className="row mb-4">
            <div className="form-group col-md-6">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter First Name"
                onChange={handleChange}
                name="first_name"
              />
              {errors.first_name && (
                <small className="text-danger">{errors.first_name}</small>
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Last Name"
                onChange={handleChange}
                name="last_name"
              />
              {errors.last_name && (
                <small className="text-danger">{errors.last_name}</small>
              )}
            </div>
          </div>
          <div className="row mb-4">
            <div className="form-group col-md-6">
              <label htmlFor="father_name">Father / Guardian Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Father/Guardian Name"
                onChange={handleChange}
                name="father_name"
              />
              {errors.father_name && (
                <small className="text-danger">{errors.father_name}</small>
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Phone Number"
                onChange={handleChange}
                name="phone"
              />
              {errors.phone && (
                <small className="text-danger">{errors.phone}</small>
              )}
            </div>
          </div>
          <div className="row mb-4">
            <div className="form-group col-md-6">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                onChange={handleChange}
                name="email"
              />
              {errors.email && (
                <small className="text-danger">{errors.email}</small>
              )}
            </div>
            <div className="form-group col-md-6 position-relative">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper" style={{ position: "relative" }}>
                <input
                  type={visible ? "text" : "password"}
                  className="form-control pr-5"
                  placeholder="Enter Password"
                  onChange={handleChange}
                  name="password"
                  style={{
                    paddingRight: "40px", // Ensures text doesn't overlap with the icon
                  }}
                />
                {/* Eye Icon */}
                <div
                  className="icon-container"
                  onClick={() => setVisible(!visible)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </div>
              </div>
              {errors.password && (
                <small
                  className="text-danger"
                  // style={{ position: "absolute", bottom: "-20px" }}
                >
                  {errors.password}
                </small>
              )}
            </div>
          </div>
          <div className="row mb-4">
            <div className="form-group col-md-6">
              <label htmlFor="gender">Gender</label>
              <select
                className="form-control"
                onChange={handleChange}
                name="gender"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && (
                <small className="text-danger">{errors.gender}</small>
              )}
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="region_id">Region</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Region ID"
                onChange={handleChange}
                name="region_id"
              />
              {errors.region_id && (
                <small className="text-danger">{errors.region_id}</small>
              )}
            </div>
          </div>
          <div className="form-group mb-4">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Address"
              onChange={handleChange}
              name="address"
            />
            {errors.address && (
              <small className="text-danger">{errors.address}</small>
            )}
          </div>
          <div className="form-group mb-4">
            <label htmlFor="last_school">Last School Attended</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Last School Name"
              onChange={handleChange}
              name="last_school"
            />
            {errors.last_school && (
              <small className="text-danger">{errors.last_school}</small>
            )}
          </div>
          <div className="form-group col-md-6 mb-4">
            <label htmlFor="city_id">City ID</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter City ID"
              onChange={handleChange}
              name="city_id"
            />
            {errors.city_id && (
              <small className="text-danger">{errors.city_id}</small>
            )}
          </div>
          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "50px",
            }}
          >
            <button
              style={{
                // padding: "10px 15px",
                fontSize: "14px",
                borderRadius: "4px",
                background: "#5D87FF",
                color: "#ffffff",
                border: "0",
              }}
              onClick={handleClick}
            >
              Save
            </button>
            <Link href="/layout/users">
              <button
                style={{
                  padding: "10px 15px",
                  fontSize: "14px",
                  borderRadius: "4px",
                  background: "#dc3545",
                  color: "#ffffff",
                  border: "0",
                }}
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </DashboardCard>
    </PageContainer>
  );
};

export default CreateUser;
