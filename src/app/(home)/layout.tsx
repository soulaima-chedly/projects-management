import { AuthProvider } from "@/components/auth/AuthProvider";
import HomeHeader from "@/components/navigation/home-header";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="px-4 py-2 h-screen bg-muted/40">
        <HomeHeader />
        <div>{children}</div>
      </div>
    </AuthProvider>
  );
}
