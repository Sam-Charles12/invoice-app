import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import logo from "../img/Oval.png";

export default function Sidebar({ isDarkMode, onToggleTheme }) {
  return (
    <aside className="fixed left-0 top-0 z-20 flex h-[80px] w-full overflow-hidden bg-dark lg:h-screen lg:w-[80px] lg:flex-col lg:rounded-r-[16px]">
      <div className="relative h-[80px] w-[80px] bg-primary lg:h-[92px] lg:w-auto">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={logo}
            alt="Invoice logo"
            className="h-6 w-6 object-contain"
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 rounded-tl-[16px] bg-primary-hover" />
      </div>

      <div className="ml-auto flex h-full items-center lg:mt-auto lg:ml-0 lg:h-auto lg:w-full lg:flex-col lg:items-center">
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
          className={`mx-6 transition-colors hover:text-white lg:mx-0 lg:mb-6 ${
            isDarkMode ? "text-[#dfe3fa]" : "text-[#7e88c3]"
          }`}
        >
          <FontAwesomeIcon
            icon={isDarkMode ? faSun : faMoon}
            className="text-[18px]"
          />
        </button>

        <div className="h-full w-px bg-[#494e6e] lg:h-px lg:w-full" />

        <button
          type="button"
          aria-label="User profile"
          className="mx-5 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#ff8f7e] to-[#ec5757] text-xs font-semibold text-white lg:my-5"
        >
          FR
        </button>
      </div>
    </aside>
  );
}
