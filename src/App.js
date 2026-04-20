import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faMoon } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import emptyIllustration from "./img/Email campaign_Flatline 2.png";

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="logo-mark" aria-hidden="true">
            <div className="logo-dot" />
          </div>
        </div>

        <div className="sidebar-middle" />

        <div className="sidebar-bottom">
          <button className="theme-toggle" aria-label="Toggle theme">
            <FontAwesomeIcon icon={faMoon} />
          </button>
          <div className="avatar" aria-label="Profile">
            OW
          </div>
        </div>
      </aside>

      <main className="content-area">
        <section className="toolbar">
          <div>
            <h1>Invoices</h1>
            <p>No invoices</p>
          </div>

          <div className="toolbar-actions">
            <button className="filter-btn" type="button">
              Filter by status <span aria-hidden="true">▼</span>
            </button>

            <button className="new-btn" type="button">
              <FontAwesomeIcon icon={faCirclePlus} />
              <span>New Invoice</span>
            </button>
          </div>
        </section>

        <section className="empty-state" aria-live="polite">
          <img src={emptyIllustration} alt="No invoices illustration" />
          <h2>There is nothing here</h2>
          <p>
            Create an invoice by clicking the
            <br />
            New Invoice button and get started
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
