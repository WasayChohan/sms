"use client";
import React, { useState } from "react";
import "./users.css";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableRow,
//   Typography,
//   Divider,
//   Button,
//   IconButton,
//   Avatar,
//   Box,
//   Container,
// } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import Link from "next/link";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Users() {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <DashboardCard title="ADD USERS">
        <div>
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <Link href="/layout/createUser">
              <button type="button" className="btn btn-primary ">
                Add User
              </button>
            </Link>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>

                <td>
                  <button type="button" className="btn btn-info">
                    Edit
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>

                <td>
                  <button type="button" className="btn btn-info">
                    Edit
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>

                <td>
                  <button type="button" className="btn btn-info">
                    Edit
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </DashboardCard>
    </PageContainer>
  );
}

export default Users;
