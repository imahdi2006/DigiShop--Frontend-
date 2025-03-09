import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./LoginPage.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUser, login } from "../../services/userServices";
import { Navigate, useLocation } from "react-router-dom";

const schema = z.object({
  email: z.string().email({ message: "please enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 characters" }),
});

const LoginPage = () => {
  const [formError, setFormError] = useState("");
  const location = useLocation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formData) => {
    try {
      await login(formData);
      const {state} = location
      window.location = state ? state.from : "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setFormError(err.response.data.message);
      }
    }
  };

  if(getUser()) {
    return <Navigate to="/" />
  }

  return (
    <section className="align_center form_page">
      <form
        action=""
        className="authentication_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Login Form</h2>
        <div className="form_inputs">
          <div className="">
            <label htmlFor="">email</label>
            <input
              type="email"
              id="email"
              className="form_text_input"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && <em>{errors.email.message}</em>}
          </div>
          <div className="">
            <label htmlFor="">Password</label>
            <input
              type="password"
              id="password"
              className="form_text_input"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && <em>{errors.password.message}</em>}
          </div>
          {formError && <em>{formError}</em>}
          <button type="submit" className="search_button form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
