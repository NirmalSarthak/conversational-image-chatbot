// export default function QuestionInput({ setQuestion }) {
//   return (
//     <div>
//       <label style={{ display: "block", marginBottom: "5px" }}>2. Ask a Question:</label>
//       <input
//         type="text"
//         placeholder="e.g., What object is this?"
//         onChange={(e) => setQuestion(e.target.value)}
//         style={{ width: "100%", padding: "8px" }}
//       />
//     </div>
//   );
// }

export default function QuestionInput({ setQuestion }) {
  return (
    <div>
      <label><b>2. Ask a Question</b></label>
      <input
        type="text"
        placeholder="e.g. What objects are visible in this image?"
        onChange={(e) => setQuestion(e.target.value)}
      />
    </div>
  );
}
