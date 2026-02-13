import { LeaveProvider } from "./context/LeaveContext";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";


export const metadata = {
  title: "Leave Management System",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LeaveProvider>
            {children}
          </LeaveProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

