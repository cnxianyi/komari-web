import { LiveDataProvider } from "@/contexts/LiveDataContext";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { NodeListProvider } from "@/contexts/NodeListContext";
import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

const IndexLayout = () => {
  // 使用我们的LiveDataContext
  const InnerLayout = () => {
    const { backgroundImageUrl, backgroundOpacity } = useContext(ThemeContext);
    
    return (
      <>
        <div 
          className="fixed inset-0 z-[9999] pointer-events-none"
          style={{
            backgroundImage: `url("${backgroundImageUrl}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: backgroundOpacity
          }}
        />
        <div className="layout flex flex-col w-full min-h-screen bg-accent-1 relative z-[1]">
          <NavBar />
          <main className="main-content m-1 h-full">
            <Outlet />
          </main>
          <Footer />
        </div>
      </>
    );
  };

  return (
    <LiveDataProvider>
      <NodeListProvider>
        <InnerLayout />
      </NodeListProvider>
    </LiveDataProvider>
  );
};

export default IndexLayout;
