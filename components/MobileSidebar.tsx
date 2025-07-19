import { useState } from "react";
import { Link } from "react-router";
import { Sidebar } from "./ui/Sidebar";
import NavItems from "./NavItems";

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mobile-sidebar wrapper">
      <header>
        <Link to="/">
          <img
            src="/assets/icons/travelisto-logo-blue.svg"
            alt="Travelisto Logo"
            className="size-[40px]"
          />

          <h1>Travelisto</h1>
        </Link>

        <button onClick={toggleSidebar}>
          <img src="/assets/icons/menu.svg" alt="menu" className="size-7" />
        </button>
      </header>

      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="w-[270px]"
      >
        <NavItems handleClick={toggleSidebar} />
      </Sidebar>
    </div>
  );
};
export default MobileSidebar;
