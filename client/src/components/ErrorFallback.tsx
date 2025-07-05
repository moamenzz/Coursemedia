const ErrorFallback = () => {
  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>Oops! Etwas ist schiefgelaufen</h2>
      <p>
        Ein unerwarteter Fehler ist aufgetreten. Wir wurden automatisch
        benachrichtigt.
      </p>
      <button
        onClick={() => window.location.reload()}
        style={{
          padding: "10px 20px",
          marginTop: "20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Seite neu laden
      </button>
    </div>
  );
};

export default ErrorFallback;
