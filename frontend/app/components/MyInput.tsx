import { TextField, TextFieldProps } from "@mui/material";

type MyInputProps = React.InputHTMLAttributes<HTMLInputElement> &
  Omit<TextFieldProps, "variant">;

export function MyInput({ ...props }: MyInputProps) {
  return (
    <TextField
      {...props}
      className="w-full ring-foreground"
      autoComplete="off"
      InputLabelProps={{ shrink: true }}
    />
  );
}
