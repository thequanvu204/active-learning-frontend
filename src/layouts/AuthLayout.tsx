import React, { useMemo } from "react";
import ParticlesBackground from "src/components/ParticlesBackground.tsx";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const particlesBackground = useMemo(() => <ParticlesBackground />, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {particlesBackground}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
};

export default AuthLayout;
