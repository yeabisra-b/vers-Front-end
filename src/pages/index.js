import { useEffect } from "react";
import { useRouter } from "next/router";
import { Geist, Geist_Mono } from "next/font/google";

// Import fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to the login page
    router.push("/login");
  }, [router]);

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid place-items-center min-h-screen`}
    >
      <p className="text-center font-semibold text-lg">
        Redirecting to the login page...
      </p>
    </div>
  );
}
