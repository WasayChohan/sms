"use client";
import { Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const Update = () => {
  const [city, setCity] = useState({
    city_name: "",
    state_id: "",
    country_id: "",
  });
  const [states, setStates] = useState([]);
  const [countries, setCountries] = useState([]);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    getCity();
    getCountries();
  }, []);

  useEffect(() => {
    if (city.country_id) {
      getStatesByCountry(city.country_id);
    } else {
      setStates([]);
    }
  }, [city.country_id]);

  const getCity = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/cities/${id}`);
      const data = res.data[0];
      setCity({
        city_name: data.city_name,
        state_id: data.state_id,
        country_id: data.country_id || "",
      });
    } catch (err) {
      console.error("Error fetching city data:", err);
    }
  };

  const getCountries = async () => {
    try {
      const res = await axios.get("http://localhost:8800/countries");
      setCountries(res.data);
    } catch (err) {
      console.error("Error fetching countries:", err);
    }
  };

  const getStatesByCountry = async (country_id) => {
    try {
      const res = await axios.get(
        `http://localhost:8800/states/by-country/${country_id}`
      );
      setStates(res.data);
    } catch (err) {
      console.error("Error fetching states:", err);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCity((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/cities/update/${id}`, city);
      router.push("/layout/cities");
    } catch (err) {
      console.error("Error updating city:", err);
    }
  };

  return (
    <PageContainer title="Edit City" description="Update city details">
      <DashboardCard title="Edit City">
        <form>
          <div className="row">
            {/* Country Dropdown */}
            <div className="form-group col-md-6">
              <label htmlFor="country_id">Select Country</label>
              <select
                className="form-control"
                name="country_id"
                value={city.country_id || ""}
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

            {/* State Dropdown */}
            <div className="form-group col-md-6">
              <label htmlFor="state_id">Select State</label>
              <select
                className="form-control"
                name="state_id"
                value={city.state_id || ""}
                onChange={handleChange}
                disabled={!city.country_id} // Disable until a country is selected
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City Name */}
            <div className="form-group col-md-12 mb-4">
              <label htmlFor="city_name">City Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter City Name"
                name="city_name"
                value={city.city_name || ""}
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
            <Link href="/layout/cities">
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
