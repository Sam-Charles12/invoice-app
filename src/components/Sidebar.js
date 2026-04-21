import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import logo from "../img/Oval.png";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-20 flex h-screen w-[80px] flex-col overflow-hidden rounded-r-[16px] bg-dark">
      <div className="relative h-[92px] bg-primary">
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={logo} alt="Invoice logo" className="h-6 w-6 object-contain" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 rounded-tl-[16px] bg-primary-hover" />
      </div>

      <div className="mt-auto flex flex-col items-center">
        <button
          type="button"
          aria-label="Toggle theme"
          className="mb-6 text-[#7e88c3] transition-colors hover:text-white"
        >
          <FontAwesomeIcon icon={faMoon} className="text-[18px]" />
        </button>

        <div className="h-px w-full bg-[#494e6e]" />

        <button
          type="button"
          aria-label="User profile"
          className="my-5 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#ff8f7e] to-[#ec5757] text-xs font-semibold text-white"
        >
          FR
        </button>
      </div>
    </aside>
  );
}
