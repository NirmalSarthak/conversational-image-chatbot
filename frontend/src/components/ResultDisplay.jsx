// export default function ResultDisplay({ result }) {
//   if (!result) return null;

//   return (
//     <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #ddd", borderRadius: "5px", background: "#f9f9f9" }}>
//       <h3>Results:</h3>
//       <p><b>Mode:</b> {result.mode}</p>
//       <p><b>Detected Objects:</b> {result.detected_objects.join(", ")}</p>
//       <hr />
//       <p><b>Answer:</b></p>
//       <p>{result.answer}</p>
//     </div>
//   );
// }

export default function ResultDisplay({ result }) {
  if (!result) return null;

  return (
    <div className="result-card">
      <h3>Result</h3>
      <p><b>Mode:</b> {result.mode}</p>
      <p><b>Detected Objects:</b> {result.detected_objects.join(", ")}</p>
      <hr />
      <p><b>Answer:</b></p>
      <p>{result.answer}</p>
    </div>
  );
}
