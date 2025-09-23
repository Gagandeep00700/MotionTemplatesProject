"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "./Loader";

export default function LoaderProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Start loading on route change
    setLoading(true);

    // Simulate page hydration delay
    const timeout = setTimeout(() => setLoading(false), 1200);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      <Loader isLoading={loading} />
      {children}
    </>
  );
}
