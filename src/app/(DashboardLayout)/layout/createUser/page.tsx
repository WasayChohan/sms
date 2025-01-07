"use client";
import { Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const CreateUser = () => {
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
                id="inputEmail4"
                placeholder="Enter"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="inputPassword4"
                placeholder="Enter "
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Father / Guardian Name</label>
              <input
                type="text"
                className="form-control"
                id="inputEmail4"
                placeholder="Enter"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Phone</label>
              <input
                type="number"
                className="form-control"
                id="inputEmail4"
                placeholder="Phone"
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                placeholder="Email"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Password</label>
              <input
                type="password"
                className="form-control"
                id="inputPassword4"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="inputState">Gender</label>
              <select id="inputState" className="form-control">
                <option>Select</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">Region</label>
              <input
                type="text"
                className="form-control"
                id="inputPassword4"
                placeholder="Enter "
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress">Address</label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress">Last School Attend</label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
            />
          </div>

          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">City</label>
              <input type="text" className="form-control" id="inputCity" />
            </div>
          </div>

          <div className="form-group"></div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </DashboardCard>
    </PageContainer>
  );
};

export default CreateUser;
