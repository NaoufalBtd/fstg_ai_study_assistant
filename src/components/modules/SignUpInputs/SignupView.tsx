import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Grid,
  Input,
  LinearProgress,
} from "@mui/joy";
import { Dispatch, SetStateAction } from "react";

export default function SignupView({
  handleSubmit,
  pwdBarColor,
  pwdScore,
  setPassword,
}: IProps) {
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid xs={12} sm={6}>
          <Input
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            placeholder="First Name"
            autoFocus
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <Input
            required
            fullWidth
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            autoComplete="family-name"
          />
        </Grid>
        <Grid xs={12}>
          <Input
            required
            fullWidth
            placeholder="Email Address"
            id="email"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid xs={12}>
          <Input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            fullWidth
            placeholder="Password"
            name="password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
        </Grid>
        <Grid xs={12}>
          <LinearProgress
            determinate
            color={pwdBarColor}
            value={(pwdScore / 4) * 100}
          />
        </Grid>
        <Grid xs={12}>
          <FormControl sx={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox value="allowExtraEmails" color="primary" sx={{ mr: 2 }} />
            <FormLabel>
              Allow me to receive inspiration, marketing promotions and updates
              via email.
            </FormLabel>
          </FormControl>
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="soft" sx={{ mt: 3, mb: 2 }}>
        Sign Up
      </Button>
    </Box>
  );
}

export type TPwdBarColor = "primary" | "warning" | "success" | "error";
interface IProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  pwdBarColor: TPwdBarColor;
  pwdScore: number;
  setPassword: Dispatch<SetStateAction<string>>;
}
