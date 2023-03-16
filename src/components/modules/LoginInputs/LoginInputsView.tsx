import { Box, Button, Checkbox, FormControl, FormLabel, Input } from "@mui/joy";
import React from "react";

interface ILogin {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function LoginInputsView({ handleSubmit }: ILogin) {
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ mt: 1, width: "100%", px: 4, height: "100%" }}>
      <Input
        required
        fullWidth
        id="email"
        name="email"
        placeholder="Email"
        autoComplete="email"
        sx={{ mb: 3 }}
      />
      <Input
        required
        fullWidth
        name="password"
        type="password"
        id="password"
        placeholder="Password"
        autoComplete="current-password"
        sx={{ mb: 3 }}
      />

      <FormControl sx={{ flexDirection: "row", alignItems: "center" }}>
        <Checkbox sx={{ mr: 2 }} value="remember" color="primary" />
        <FormLabel>Me Sign In</FormLabel>
      </FormControl>
      <Button type="submit" fullWidth variant="soft" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
    </Box>
  );
}
