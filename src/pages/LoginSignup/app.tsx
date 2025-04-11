"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  Stack,
  Heading,
  Text,
  Spinner,
  Fieldset,
  Image,
  createListCollection,
} from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { Toaster, toaster } from "@/components/ui/toaster";
import { login, register } from "../../services/auth.service";
import { setToken } from "@/utils/token.util";
import logo from "src/assets/logo_i.png";
import { LightMode } from "@/components/ui/color-mode";
import AuthLayout from "@/layouts/AuthLayout";
import { PasswordValidation } from "@/components/PasswordValidation";

const roles = createListCollection({
  items: [
    { label: "Administrator", value: true },
    { label: "Basic User", value: false },
  ],
});

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await login(email, password);
      if (response.success) {
        setToken(response.token);
        navigate("/dashboard");
      } else {
        toaster.create({
          title: "Falsche Login-Daten",
          type: "error",
        });
      }
    } catch (error: unknown) {
      toaster.create({
        title:
          error instanceof Error
            ? error.message
            : "Ein unbekannter Fehler ist aufgetreten.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await register(email, username, password, admin);
      if (response.success) {
        toaster.create({
          title: "Registrierung erfolgreich! Du wirst jetzt eingeloggt.",
          type: "success",
        });

        const loginResponse = await login(email, password);
        if (loginResponse.success) {
          setToken(loginResponse.token);
          navigate("/dashboard");
        }
      } else {
        toaster.create({
          title: "Registrierung fehlgeschlagen",
          type: "error",
        });
      }
    } catch (error: unknown) {
      toaster.create({
        title:
          error instanceof Error
            ? error.message
            : "Ein unbekannter Fehler ist aufgetreten.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSwitch = (newAction: string) => {
    setAction(newAction);
    setEmail("");
    setPassword("");
    setUsername("");
    setAdmin(false);
  };

  return (
    <AuthLayout>
      <LightMode>
        <Box
          className="page"
          display="flex"
          alignItems="center"
          justifyContent="center"
          minH="100vh"
        >
          <Toaster />

          <Stack gap={-8} align="center">
            {/* Anmeldebox */}
            <Box
              bg="#FBFFFE"
              p={8}
              boxShadow="lg"
              borderRadius="md"
              width="400px"
              zIndex={1000}
            >
              <Stack gap={6} align="center">
                <Image
                  src={logo}
                  alt="Logo"
                  width="128px"
                  mt="4"
                  zIndex={1000}
                />
                <Heading size={"2xl"}>{action}</Heading>
              </Stack>
              <Stack gap={4} mt={6}>
                <Fieldset.Root>
                  <Fieldset.Content>
                    {/* Select nach oben verschoben */}
                    {action === "Sign up" && (
                      <Fieldset.Root>
                        <Fieldset.Content>
                          <SelectRoot
                            collection={roles}
                            size="md"
                            onValueChange={(value) => setAdmin(Boolean(value))}
                          >
                            <SelectLabel>Permissions</SelectLabel>
                            <SelectTrigger>
                              <SelectValueText placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              {roles.items.map((role) => (
                                <SelectItem
                                  item={role}
                                  key={String(role.value)}
                                >
                                  {role.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </SelectRoot>
                        </Fieldset.Content>
                      </Fieldset.Root>
                    )}

                    {action !== "Login" && (
                      <Input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    )}
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {action === "Sign up" && (
                      <PasswordValidation
                        password={password}
                        onValidationChange={setPasswordErrors}
                      />
                    )}
                  </Fieldset.Content>
                </Fieldset.Root>
              </Stack>

              <Button
                mt={6}
                colorScheme="blue"
                width="100%"
                disabled={
                  loading ||
                  email.trim() === "" ||
                  password.trim() === "" ||
                  (action === "Sign up" && username.trim() === "") ||
                  (action === "Sign up" && passwordErrors.length > 0)
                }
                onClick={action === "Login" ? handleLogin : handleRegister}
              >
                {loading ? (
                  <Spinner size="sm" />
                ) : action === "Login" ? (
                  "Login"
                ) : (
                  "Sign up"
                )}
              </Button>
              <Text mt={4} textAlign="center">
                {action === "Login" ? (
                  <>
                    Don't have an account?{" "}
                    <Text
                      as="span"
                      color="blue.500"
                      cursor="pointer"
                      onClick={() => handleSwitch("Sign up")}
                    >
                      Sign up
                    </Text>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <Text
                      as="span"
                      color="blue.500"
                      cursor="pointer"
                      onClick={() => handleSwitch("Login")}
                    >
                      Login
                    </Text>
                  </>
                )}
              </Text>
            </Box>
          </Stack>
        </Box>
      </LightMode>
    </AuthLayout>
  );
};

export default LoginSignup;
