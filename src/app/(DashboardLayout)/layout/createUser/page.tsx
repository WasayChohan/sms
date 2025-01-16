"use client";
import { Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import Link from "next/link";

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

  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {}
  );
  const validationSchema = Yup.object({
    first_name: Yup.string().required("First Name is Required"),
    last_name: Yup.string().required("Last Name is Required"),
    father_name: Yup.string().required("Father Name is Required"),
    phone: Yup.string()
      .matches(/^\d{11}$/, "Phone Number must be 11 digits")
      .required("Phone Number is Required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .required("Password is Required"),
    gender: Yup.string().required("Gender is Required"),
    region_id: Yup.string().required("Region ID is Required"),
    address: Yup.string().required("Address is Required"),
    last_school: Yup.string().required("Last School Name is Required"),
    city_id: Yup.string().required("City ID is Required"),
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
          <div className="row">
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
          <div className="row">
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
                type="text"
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
          <div className="row">
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
            <div className="form-group col-md-6">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                onChange={handleChange}
                name="password"
              />
              {errors.password && (
                <small className="text-danger">{errors.password}</small>
              )}
            </div>
          </div>
          <div className="row">
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
                type="text"
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
          <div className="form-group">
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
          <div className="form-group">
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
          <div className="form-group col-md-6">
            <label htmlFor="city_id">City ID</label>
            <input
              type="text"
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
              justifyContent: "space-between",
            }}
          >
            <button className="btn btn-primary mt-3" onClick={handleClick}>
              Add User
            </button>
            <Link href="/layout/users">
              <button className="btn btn-primary mt-3">Cancel</button>
            </Link>
          </div>
        </form>
      </DashboardCard>
    </PageContainer>
  );
};

export default CreateUser;
