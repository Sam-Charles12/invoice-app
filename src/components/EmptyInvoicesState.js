import emptyIllustration from "../img/Email campaign_Flatline 2.png";

export default function EmptyInvoicesState() {
  return (
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
        <span className="font-bold">New Invoice</span> button and get started
      </p>
    </section>
  );
}
