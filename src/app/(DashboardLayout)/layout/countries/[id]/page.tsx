"use client";
import { Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Update = () => {
  const [country, setCountry] = useState([]);
  const { id } = useParams();

  // console.log(id);

  useEffect(() => {
    getCountry();
  }, []);

  const getCountry = () => {
    axios.get(`http://localhost:8800/countries/ ${id}`).then(function (res) {
      console.log(res.data[0]);
      setCountry(res.data[0]);
    });
  };

  console.log(country);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCountry((values) => ({ ...values, [name]: value }));
  };

  const router = useRouter();

  const handleClick = async (e) => {
    e.preventDefault();
    // console.log(user);
    // return;
    try {
      await axios
        .put(`http://localhost:8800/countries/update/${id}`, country)
        .then(function (res) {
          console.log(res.data);
          router.push("/layout/countries");
        });
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(user);
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <DashboardCard title="Edit Country">
        <form>
          <div className="row">
            <div className="form-group col-md-6 mb-4">
              <label htmlFor="inputEmail4">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter"
                onChange={handleChange}
                name="name"
                value={country.name}
              />
            </div>
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
                padding: "10px 15px",
                // marginTop: "50px",
                fontSize: "14px",
                borderRadius: "4px",
                background: "#5D87FF",
                color: "#ffffff",
                border: "0",
              }}
              onClick={handleClick}
            >
              Update
            </button>
            <Link href="/layout/countries">
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

export default Update;
