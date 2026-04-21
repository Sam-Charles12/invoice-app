import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faCirclePlus,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import logo from "./img/Oval.png";
import emptyIllustration from "./img/Email campaign_Flatline 2.png";
import { useState } from "react";

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const renderField = (label, value) => (
    <label key={label} className="flex flex-col gap-3">
      <span className="text-[13px] leading-none text-[#7e88c3]">{label}</span>
      <input
        type="text"
        value={value}
        readOnly
        className="h-12 rounded-[4px] border border-[#dfe3fa] px-5 text-[15px] font-bold text-text outline-none transition-colors focus:border-primary"
      />
    </label>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <aside className="fixed left-0 top-0 z-20 flex h-screen w-[80px] flex-col overflow-hidden rounded-r-[16px] bg-dark">
        <div className="relative h-[92px] bg-primary">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={logo}
              alt="Invoice logo"
              className="h-6 w-6 object-contain"
            />
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

      <main className="ml-[80px] px-12 pb-8 pt-10">
        <section className="mx-auto max-w-[700px]">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-[34px] font-bold leading-none text-text">
                Invoices
              </h1>
              <p className="mt-1.5 text-[12px] font-medium text-[#888eb0]">
                No invoices
              </p>
            </div>

            <div className="flex items-center gap-8">
              <button
                type="button"
                className="flex items-center gap-2.5 text-[13px] font-bold text-[#1e2139]"
              >
                <span>Filter by status</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="text-[10px] text-primary"
                />
              </button>

              <button
                type="button"
                onClick={() => setIsFormOpen(true)}
                className="flex items-center gap-3 rounded-full bg-primary px-2 py-2 pr-4 text-[13px] font-bold text-white transition-colors hover:bg-primary-hover"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-bg">
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    className="text-[24px]"
                  />
                </span>
                <span>New Invoice</span>
              </button>
            </div>
          </header>

          <section className="mx-auto mt-28 flex max-w-[320px] flex-col items-center text-center">
            <img
              src={emptyIllustration}
              alt="Empty invoice list illustration"
              className="h-auto w-[220px] object-contain"
            />

            <h2 className="mt-10 font-heading text-[30px] font-bold leading-none text-text">
              There is nothing here
            </h2>
            <p className="mt-4 max-w-[220px] text-[12px] font-medium leading-5 text-muted">
              Create an invoice by clicking the{" "}
              <span className="font-bold">New Invoice</span> button and get
              started
            </p>
          </section>
        </section>
      </main>

      {isFormOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50"
          onClick={() => setIsFormOpen(false)}
        >
          <div
            className="absolute left-[80px] top-0 flex h-full w-[clamp(320px,52vw,540px)] flex-col rounded-r-[16px] bg-white shadow-[0_20px_40px_rgba(72,84,159,0.25)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between px-10 pb-6 pt-8">
              <h2 className="font-heading text-[28px] font-bold leading-none text-text">
                New Invoice
              </h2>

              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="rounded-full px-3 py-2 text-[12px] font-bold text-[#7e88c3] transition-colors hover:text-text"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-10 pb-28">
              <section className="space-y-5">
                <h3 className="text-[13px] font-bold text-primary">Bill From</h3>

                <div className="space-y-5">
                  {renderField("Street Address", "19 Union Terrace")}

                  <div className="grid grid-cols-3 gap-4">
                    {renderField("City", "London")}
                    {renderField("Post Code", "E1 3EZ")}
                    {renderField("Country", "United Kingdom")}
                  </div>
                </div>
              </section>

              <section className="mt-10 space-y-5">
                <h3 className="text-[13px] font-bold text-primary">Bill To</h3>

                <div className="space-y-5">
                  {renderField("Client's Name", "Alex Grim")}
                  {renderField("Client's Email", "alexgrim@mail.com")}
                  {renderField("Street Address", "84 Church Way")}

                  <div className="grid grid-cols-3 gap-4">
                    {renderField("City", "Bradford")}
                    {renderField("Post Code", "BD1 9PB")}
                    {renderField("Country", "United Kingdom")}
                  </div>
                </div>
              </section>

              <section className="mt-10 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex flex-col gap-3">
                    <span className="text-[12px] leading-none text-[#7e88c3]">
                      Invoice Date
                    </span>
                    <input
                      type="text"
                      value="21 Aug 2021"
                      readOnly
                      className="h-10 rounded-[4px] border border-[#dfe3fa] px-4 text-[13px] font-bold text-text outline-none focus:border-primary"
                    />
                  </label>

                  <label className="flex flex-col gap-3">
                    <span className="text-[12px] leading-none text-[#7e88c3]">
                      Payment Terms
                    </span>
                    <div className="flex h-10 items-center justify-between rounded-[4px] border border-[#dfe3fa] px-4 text-[13px] font-bold text-text">
                      <span>Net 30 Days</span>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="text-[10px] text-primary"
                      />
                    </div>
                  </label>
                </div>

                <label className="flex flex-col gap-3">
                  <span className="text-[12px] leading-none text-[#7e88c3]">
                    Project Description
                  </span>
                  <input
                    type="text"
                    value="Graphic Design"
                    readOnly
                    className="h-10 rounded-[4px] border border-[#dfe3fa] px-4 text-[13px] font-bold text-text outline-none focus:border-primary"
                  />
                </label>

                <div className="space-y-3.5">
                  <h4 className="text-[15px] font-bold text-[#777f98]">
                    Item List
                  </h4>

                  <div className="grid grid-cols-[1.7fr_0.5fr_0.8fr_0.8fr_auto] gap-3 text-[12px] text-[#7e88c3]">
                    <span>Item Name</span>
                    <span>Qty.</span>
                    <span>Price</span>
                    <span>Total</span>
                  </div>

                  <div className="grid grid-cols-[1.7fr_0.5fr_0.8fr_0.8fr_auto] items-center gap-3">
                    <input
                      type="text"
                      value="Banner Design"
                      readOnly
                      className="h-10 rounded-[4px] border border-[#dfe3fa] px-3 text-[13px] font-bold text-text outline-none"
                    />
                    <input
                      type="text"
                      value="1"
                      readOnly
                      className="h-10 rounded-[4px] border border-[#dfe3fa] px-3 text-[13px] font-bold text-text outline-none"
                    />
                    <input
                      type="text"
                      value="156.00"
                      readOnly
                      className="h-10 w-[40px] rounded-[4px] border border-[#dfe3fa] px-3 text-[13px] font-bold text-text outline-none"
                    />
                    <input
                      type="text"
                      value="156.00"
                      readOnly
                      className="h-10 rounded-[4px] border border-[#dfe3fa] px-3 text-[13px] font-bold text-text outline-none"
                    />
                    <button
                      type="button"
                      className="text-[#888eb0] transition-colors hover:text-danger"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="grid grid-cols-[1.7fr_0.5fr_0.8fr_0.8fr_auto] items-center gap-4">
                    <input
                      type="text"
                      value="Email Design"
                      readOnly
                      className="h-10 rounded-[4px] border border-[#dfe3fa] px-3 text-[13px] font-bold text-text outline-none"
                    />
                    <input
                      type="text"
                      value="2"
                      readOnly
                      className="h-10 rounded-[4px] border border-[#dfe3fa] px-3 text-[13px] font-bold text-text outline-none"
                    />
                    <input
                      type="text"
                      value="200.00"
                      readOnly
                      className="h-10 rounded-[4px] border border-[#dfe3fa] px-3 text-[13px] font-bold text-text outline-none"
                    />
                    <input
                      type="text"
                      value="400.00"
                      readOnly
                      className="h-10 rounded-[4px] border border-[#dfe3fa] px-3 text-[13px] font-bold text-text outline-none"
                    />
                    <button
                      type="button"
                      className="text-[#888eb0] transition-colors hover:text-danger"
                    >
                      Delete
                    </button>
                  </div>

                  <button
                    type="button"
                    className="w-full rounded-full bg-[#f9fafe] py-3 text-[13px] font-bold text-[#7e88c3] transition-colors hover:bg-[#edf0fd]"
                  >
                    + Add New Item
                  </button>
                </div>
              </section>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between rounded-r-[16px] bg-white px-10 py-4 shadow-[0_-10px_24px_rgba(72,84,159,0.08)]">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="rounded-full bg-[#f9fafe] px-5 py-3 text-[13px] font-bold text-[#7e88c3] transition-colors hover:bg-[#edf0fd]"
              >
                Discard
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-full bg-[#373b53] px-5 py-3 text-[13px] font-bold text-[#888eb0] transition-colors hover:bg-[#1e2139]"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  className="rounded-full bg-primary px-5 py-3 text-[13px] font-bold text-white transition-colors hover:bg-primary-hover"
                >
                  Save &amp; Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
