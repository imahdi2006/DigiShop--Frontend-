import "./SignupPage.css";
import user from "../../assets/user.webp";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { getUser, signup } from "../../services/userServices";
import { Navigate } from "react-router-dom";

const schema = z
  .object({
    name: z
      .string()
      .min(3, { message: "username must be at least 3 characters" }),
    email: z.string().email({ message: "please enter a valid email" }),
    password: z
      .string()
      .min(8, { message: "password must be at least 8 characters" }),
    cpassword: z
      .string()
      .min(8, { message: "Confirm Password does not match Password" }),
    deliveryAddress: z
      .string()
      .min(15, { message: "delivery address must be at least 15 characters" }),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Confirm Password does not match Password",
    path: ["cpassword"],
  });

const SignupPage = () => {
  const [profilePic, setprofilePic] = useState(null);
  const [fromError, setfromError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (formData) => {
    try {
      await signup(formData, profilePic);

      window.location = "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setfromError(err.response.data.message);
      }
    }
  };

  if(getUser()) {
    return <Navigate to="/" />
  }

  return (
    <section className="align_center form_page">
      <form
        className="authentication_form signup_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>SignUp Form</h2>

        <div className="image_input_section">
          <div className="image_preview">
            <img
              src={profilePic ? URL.createObjectURL(profilePic) : user}
              id="file-ip-1-preview"
            />
          </div>
          <label htmlFor="file-ip-1" className="image_label">
            Upload Image
          </label>
          <input
            type="file"
            id="file-ip-1"
            className="image_input"
            onChange={(e) => setprofilePic(e.target.files[0])}
          />
        </div>

        {/* Form Inputs */}
        <div className="form_inputs signup_form_input">
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="form_text_input"
              type="text"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors.name && <em>{errors.name.message}</em>}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="form_text_input"
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
            />
            {errors.email && <em>{errors.email.message}</em>}
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="form_text_input"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && <em>{errors.password.message}</em>}
          </div>

          <div>
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              id="cpassword"
              className="form_text_input"
              type="password"
              placeholder="Enter confirm password"
              {...register("cpassword")}
            />
            {errors.cpassword && <em>{errors.cpassword.message}</em>}
          </div>

          <div className="signup_textares_section">
            <label htmlFor="address">Delivery Address</label>
            <textarea
              id="address"
              className="input_textarea"
              placeholder="Enter delivery address"
              {...register("deliveryAddress")}
            />
            {errors.deliveryAddress && (
              <em>{errors.deliveryAddress.message}</em>
            )}
          </div>
        </div>

        {fromError && <em>{fromError}</em>}

        <button className="search_button form_submit" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default SignupPage;
