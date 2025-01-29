"use client";
import { Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const Update = () => {
  const [state, setState] = useState({
    state_name: "",
    country_id: "",
  });
  const [countries, setCountries] = useState([]);
  const { id } = useParams();

  const router = useRouter();

  useEffect(() => {
    getState();
    getCountries();
  }, []);

  const getState = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/api/states/${id}`);
      const data = res.data[0];
      setState({
        state_name: data.state_name,
        country_id: data.country_id,
      });
    } catch (err) {
      console.error("Error fetching state data:", err);
    }
  };

  const getCountries = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/countries");
      setCountries(res.data);
    } catch (err) {
      console.error("Error fetching countries:", err);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/api/states/update/${id}`, state);
      router.push("/layout/states");
    } catch (err) {
      console.error("Error updating state:", err);
    }
  };

  return (
    <PageContainer title="Sample Page" description="This is Sample page">
      <DashboardCard title="Edit State">
        <form>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="country_id">Select Country</label>
              <select
                className="form-control"
                name="country_id"
                value={state.country_id || ""}
                onChange={handleChange}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group col-md-6 mb-4">
              <label htmlFor="state_name">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter State Name"
                name="state_name"
                value={state.state_name || ""}
                onChange={handleChange}
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
            <Link href="/layout/states">
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
