"use client";
import { Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import Link from "next/link";

const CreateCity = () => {
  const [city, setCity] = useState({
    name: "",
    country_id: "",
    state_id: "",
  });

  const [showCountry, setShowCountry] = useState([]);
  const [showState, setShowState] = useState([]);
  const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
    {}
  );
  const router = useRouter();

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("City Name is Required")
      .matches(/^[^0-9]*$/, "Numbers are not allowed")
      .matches(
        /^[a-zA-Z0-9]+$/,
        "This field cannot contain white space and special characters"
      )
      .trim(),
    country_id: Yup.string().required("Country is Required"),
    state_id: Yup.string().required("State is Required"),
  });

  console.log(showState);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setCity((prev) => ({ ...prev, [name]: value }));

    // Validate individual fields
    validationSchema
      .validateAt(name, { [name]: value })
      .then(() => {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      })
      .catch((err) => {
        setErrors((prev) => ({ ...prev, [name]: err.message }));
      });
  };

  // Fetch all countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countryRes = await axios.get(
          "http://localhost:8800/api/countries"
        );
        setShowCountry(countryRes.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  // Fetch states dynamically based on the selected country
  useEffect(() => {
    const fetchStates = async () => {
      if (city.country_id) {
        try {
          const stateRes = await axios.get(
            `http://localhost:8800/api/states/by-country/${city.country_id}`
          );
          console.log("Fetched states:", stateRes.data);
          setShowState(stateRes.data); // Store states in showState
        } catch (err) {
          console.error("Error fetching states:", err);
          setShowState([]); // Clear states on error
        }
      } else {
        setShowState([]); // Clear states when country is not selected
      }
    };

    fetchStates();

    // Clear state_name when country_id changes
    setCity((prev) => ({ ...prev, state_id: "" }));
  }, [city.country_id]); // The dependency array should monitor country_id

  // Handle form submission
  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate the entire city object
      await validationSchema.validate(city, { abortEarly: false });

      // Post the validated city object to the API
      const response = await axios.post(
        "http://localhost:8800/api/cities",
        city
      );
      console.log("City created successfully:", response.data);

      // Redirect to the cities page
      router.push("/layout/cities");
    } catch (err: any) {
      if (err.inner) {
        // Handle validation errors
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error: Yup.ValidationError) => {
          validationErrors[error.path!] = error.message;
        });
        setErrors(validationErrors);
      } else {
        console.error("Error creating city:", err);
      }
    }
  };

  return (
    <PageContainer title="Create City" description="Add a new City">
      <DashboardCard title="Add City">
        <form>
          <div className="row mb-4">
            {/* Country Dropdown */}
            <div className="form-group col-md-6">
              <label htmlFor="country_id">Select Country</label>
              <select
                className="form-control"
                name="country_id"
                value={city.country_id}
                onChange={handleChange}
              >
                <option value="">Select Country</option>
                {showCountry.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              {errors.country_id && (
                <small className="text-danger">{errors.country_id}</small>
              )}
            </div>

            {/* State Dropdown */}
            <div className="form-group col-md-6">
              <label htmlFor="state_id">Select State</label>
              <select
                className="form-control"
                name="state_id"
                value={city.state_id}
                onChange={handleChange}
              >
                <option value="">Select State</option>
                {showState.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              {errors.state_id && (
                <small className="text-danger">{errors.state_id}</small>
              )}
            </div>

            {/* City Name Input */}
            <div className="form-group col-md-6">
              <label htmlFor="name">City Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter City Name"
                name="name"
                value={city.name}
                onChange={handleChange}
              />
              {errors.name && (
                <small className="text-danger">{errors.name}</small>
              )}
            </div>
          </div>

          {/* Action Buttons */}
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
              Save
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

export default CreateCity;
