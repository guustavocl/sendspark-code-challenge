import { Button } from "@mui/material";
import { MyInput } from "~/components/MyInput";
import { useSignUpForm } from "~/hooks/useSignUp";

export default function SignUpForm({
  ...props
}: React.FormHTMLAttributes<HTMLFormElement>) {
  const { formik } = useSignUpForm();

  return (
    <form {...props} onSubmit={formik.handleSubmit}>
      <div className="col-span-2 md:col-span-1">
        <MyInput
          id="firstName"
          label="First Name *"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={
            (formik.touched.firstName && formik.errors.firstName) || " "
          }
        />
      </div>
      <div className="col-span-2 md:col-span-1">
        <MyInput
          id="lastName"
          label="Last Name *"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={
            (formik.touched.lastName && formik.errors.lastName) || " "
          }
        />
      </div>
      <div className="col-span-2">
        <MyInput
          id="companyName"
          label="Company Name *"
          value={formik.values.companyName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.companyName && Boolean(formik.errors.companyName)
          }
          helperText={
            (formik.touched.companyName && formik.errors.companyName) || " "
          }
        />
      </div>
      <div className="col-span-2">
        <MyInput
          id="jobTitle"
          label="Job Title"
          value={formik.values.jobTitle}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
          helperText={
            (formik.touched.jobTitle && formik.errors.jobTitle) || " "
          }
        />
      </div>
      <div className="col-span-2">
        <MyInput
          id="email"
          label="Work email *"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={(formik.touched.email && formik.errors.email) || " "}
        />
      </div>
      <div className="col-span-2 md:col-span-1">
        <MyInput
          id="password"
          label="Password *"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={
            (formik.touched.password && formik.errors.password) || " "
          }
        />
      </div>
      <div className="col-span-2 md:col-span-1">
        <MyInput
          id="confirmPassword"
          label="Confirm Password *"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            (formik.touched.confirmPassword && formik.errors.confirmPassword) ||
            " "
          }
        />
      </div>
      <div className="col-span-2 mt-4">
        <Button
          type="submit"
          variant="contained"
          className="w-full text-foreground py-3"
          disabled={formik.isSubmitting}
        >
          Continue
        </Button>
      </div>
    </form>
  );
}
