"use client";
import { Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const CreateUser = () => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    father_name: "",
    phone: null,
    email: "",
    password: "",
    gender: null,
    region_id: "",
    address: "",
    last_school: "",
    city_id: null,
  });

  // const router = useRouter();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const router = useRouter();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/users", user);
      router.push("users");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(user);
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <DashboardCard title="Sample Page">
        <form>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Fisrt Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter"
                onChange={handleChange}
                name="first_name"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter "
                onChange={handleChange}
                name="last_name"
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Father / Guardian Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter"
                onChange={handleChange}
                name="father_name"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Phone</label>
              <input
                type="number"
                className="form-control"
                placeholder="Phone"
                onChange={handleChange}
                name="phone"
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Email</label>
              <input
                type="email"
                className="form-control"
                onChange={handleChange}
                name="email"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={handleChange}
                name="password"
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="inputState">Gender</label>
              <select
                className="form-control"
                onChange={handleChange}
                name="gender"
              >
                <option>Select</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Region</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter "
                onChange={handleChange}
                name="region_id"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress">Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="1234 Main St"
              onChange={handleChange}
              name="address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress">Last School Attend</label>
            <input
              type="text"
              className="form-control"
              placeholder="1234 Main St"
              onChange={handleChange}
              name="last_school"
            />
          </div>

          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">City</label>
              <input
                type="number"
                className="form-control"
                onChange={handleChange}
                name="city_id"
              />
            </div>
          </div>

          {/* <div className="form-group"></div> */}
          <button className="btn btn-primary" onClick={handleClick}>
            Add
          </button>
        </form>
      </DashboardCard>
    </PageContainer>
  );
};

export default CreateUser;
