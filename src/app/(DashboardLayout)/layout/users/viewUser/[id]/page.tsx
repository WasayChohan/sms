"use client";
import { Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Divider,
  Button,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const ViewUpdate = () => {
  const [user, setUser] = useState([]);

  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios.get(`http://localhost:8800/api/users/ ${id}`).then(function (res) {
      console.log(res.data[0]);
      setUser(res.data[0]);
    });
  };

  // console.log(user);

  // const [user, setUser] = useState({
  //   first_name: "",
  //   last_name: "",
  //   father_name: "",
  //   phone: null,
  //   email: "",
  //   password: "",
  //   gender: null,
  //   region_id: "",
  //   address: "",
  //   last_school: "",
  //   city_id: null,
  // });

  const handleChange = (e) => {
    // const name = e.target.name;
    // const value = e.target.value;
    // setUser((values) => ({ ...values, [name]: value }));
  };

  const router = useRouter();

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   // console.log(user);
  //   // return;
  //   try {
  //     await axios
  //       .put(`http://localhost:8800/users/${id}`, user)
  //       .then(function (res) {
  //         console.log(res.data);
  //         router.push("/layout/users");
  //       });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // console.log(user);
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <DashboardCard title="View Page">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography>
                  <label>First Name</label>
                  <span className="form-control">{user.first_name}</span>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  <label>Last Name</label>
                  <span className="form-control">{user.last_name}</span>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  <label>Father / Guardian Name</label>
                  <span className="form-control">{user.father_name}</span>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>
                  <label>Phone</label>
                  <span className="form-control">{user.phone}</span>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  <label>Email</label>
                  <span className="form-control">{user.email}</span>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  <label>Password</label>
                  <span className="form-control">{user.password}</span>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>
                  <label>Gender</label>
                  <span className="form-control">{user.gender}</span>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  <label>Region</label>
                  <span className="form-control">{user.region_id}</span>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  <label>Address</label>
                  <span className="form-control">{user.address}</span>
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>
                  <label>Last School Attend</label>
                  <span className="form-control">{user.last_school}</span>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  <label>City</label>
                  <span className="form-control">{user.city_id}</span>
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
          <Link href="/layout/users">
            <button
              type="button"
              className="btn "
              style={{
                padding: "10px 15px",
                fontSize: "14px",
                borderRadius: "4px",
                background: "#5D87FF",
                color: "#ffffff",
                margin: "50px 0 0 15px",
              }}
            >
              Back
            </button>
          </Link>
        </Table>
      </DashboardCard>
    </PageContainer>
  );
};

export default ViewUpdate;
