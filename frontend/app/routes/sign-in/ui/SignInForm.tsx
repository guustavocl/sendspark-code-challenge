import { Button } from "@mui/material";
import { MyInput } from "~/components/MyInput";
import { useSignInForm } from "~/hooks/useSignIn";

export default function SignInForm({
  ...props
}: React.FormHTMLAttributes<HTMLFormElement>) {
  const { formik } = useSignInForm();

  return (
    <form {...props} onSubmit={formik.handleSubmit}>
      <div className="col-span-2">
        <MyInput
          id="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={(formik.touched.email && formik.errors.email) || " "}
        />
      </div>
      <div className="col-span-2">
        <MyInput
          id="password"
          label="Password"
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
      <div className="col-span-2 mt-4">
        <Button
          type="submit"
          variant="contained"
          className="w-full text-foreground py-3"
          disabled={formik.isSubmitting}
        >
          SIGN IN
        </Button>
      </div>
    </form>
  );
}
