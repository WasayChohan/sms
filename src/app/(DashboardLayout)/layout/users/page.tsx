"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./users.css";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import Link from "next/link";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800/users");
        console.log(res);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }, []);

  // console.log(users);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8800/users/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PageContainer title="Sample Page" description="This is Sample Page">
      <DashboardCard title="ADD USERS">
        <div>
          <div style={{ marginBottom: "20px" }}>
            <Link href="/layout/createUser">
              <button type="button" className="btn btn-primary">
                Add User
              </button>
            </Link>
          </div>
          {users.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Father</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Region</th>
                    <th scope="col">Address</th>
                    <th scope="col">Last School</th>
                    <th scope="col">City</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <th scope="row">{user.id}</th>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.father_name}</td>
                      <td>{user.phone}</td>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                      <td>{user.gender}</td>
                      <td>{user.region_id}</td>
                      <td>{user.address}</td>
                      <td>{user.last_school}</td>
                      <td>{user.city_id}</td>

                      <td style={{ display: "flex" }}>
                        <button type="button" className="btn btn-info">
                          <Link href={`users/${user.id}`}>Edit</Link>
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          // style={{ marginLeft: "10px" }}
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </DashboardCard>
    </PageContainer>
  );
}

export default Users;
