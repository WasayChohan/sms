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
      <DashboardCard title="Add User">
        <div>
          <div className="mb-3">
            <Link href="/layout/createUser">
              <button
                type="button"
                className="btn "
                style={{
                  padding: "10px 15px",
                  fontSize: "14px",
                  borderRadius: "4px",
                  background: "#5D87FF",
                  color: "#ffffff",
                }}
              >
                Add User
              </button>
            </Link>
          </div>

          {users.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead className="table-light">
                  <tr>
                    {[
                      "ID",
                      "First Name",
                      "Last Name",
                      "Father Name",
                      "Phone",
                      "Email",
                      "Password",
                      "Gender",
                      "Region",
                      "Address",
                      "Last School",
                      "City",
                      "Actions",
                    ].map((heading, index) => (
                      <th
                        key={index}
                        style={{
                          padding: "8px 12px",
                          textAlign: "center",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={index}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                      }}
                    >
                      <td style={{ padding: "8px 12px", whiteSpace: "nowrap" }}>
                        {
                          // user.id
                          index + 1
                        }
                      </td>
                      <td style={{ padding: "8px 12px" }}>{user.first_name}</td>
                      <td style={{ padding: "8px 12px" }}>{user.last_name}</td>
                      <td style={{ padding: "8px 12px", whiteSpace: "nowrap" }}>
                        {user.father_name}
                      </td>
                      <td style={{ padding: "8px 12px" }}>{user.phone}</td>
                      <td style={{ padding: "8px 12px" }}>{user.email}</td>
                      <td style={{ padding: "8px 12px" }}>{user.password}</td>
                      <td style={{ padding: "8px 12px" }}>{user.gender}</td>
                      <td style={{ padding: "8px 12px" }}>{user.region_id}</td>
                      <td style={{ padding: "8px 12px" }}>{user.address}</td>
                      <td style={{ padding: "8px 12px" }}>
                        {user.last_school}
                      </td>
                      <td style={{ padding: "8px 12px" }}>{user.city_id}</td>
                      <td style={{ padding: "8px 12px", display: "flex" }}>
                        <button
                          type="button"
                          style={{
                            backgroundColor: "#17a2b8",
                            color: "#fff",
                            border: "none",
                            padding: "5px 10px",
                            fontSize: "14px",
                            cursor: "pointer",
                            borderRadius: "4px",
                            marginRight: "10px",
                          }}
                        >
                          <Link
                            href={`users/${user.id}`}
                            style={{ color: "#fff", textDecoration: "none" }}
                          >
                            Edit
                          </Link>
                        </button>
                        <button
                          type="button"
                          style={{
                            backgroundColor: "#dc3545",
                            color: "#fff",
                            border: "none",
                            padding: "5px 10px",
                            fontSize: "14px",
                            cursor: "pointer",
                            borderRadius: "4px",
                          }}
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
            <p className="text-center mt-3">No users found.</p>
          )}
        </div>
      </DashboardCard>
    </PageContainer>
  );
}

export default Users;
