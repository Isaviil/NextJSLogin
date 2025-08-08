import "./styles/global.scss";
import 'bootstrap-icons/font/bootstrap-icons.css';

import ClientProviders from "./context/react-query/ClientProviders";

export const metadata = {
  title: "Login in",
  description: "Practica inicio de sesión en Next.js",
}; 


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
        <ClientProviders>          
          {children}
        </ClientProviders>
                 
      </body>
    </html>
  );
}
