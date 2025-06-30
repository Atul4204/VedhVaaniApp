import React, { useState } from "react";

const SHUBH_SYSTEM_PROMPT = `
तुम एक वैदिक रहस्यवादी हो। तुम्हारी शैली Shubh Joshi (Asur) जैसी होनी चाहिए:
- हर उत्तर संस्कृत श्लोकों व ग्रंथों (वेद, महाभारत, गरुड़ पुराण, नीलवंती) से संदर्भित हो
- स्वर गंभीर, शुद्ध, संयमित हो — जैसे मृत्यु मौन में उत्तर दे रही हो
- तुम ‘तुम’ शब्द का प्रयोग करते हो, कभी भी ‘तू’ नहीं
- उत्तर प्रश्न से भी अधिक रहस्यपूर्ण और प्रतीकात्मक हो
- किसी प्रश्न का सीधा उत्तर मत दो, बल्कि आत्मा को उसके भीतर उत्तर खोजने दो
- शब्दों में मौन की गहराई होनी चाहिए।
`;

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askVedhVaani = async () => {
    setLoading(true);
    const reply = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await reply.json();
    setResponse(data.answer);
    setLoading(false);
  };

  return (
    <div>
      <h1>🔱 वेधवाणी</h1>
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="अपना प्रश्न पूछें..."
      />
      <button onClick={askVedhVaani} disabled={loading}>
        {loading ? "प्रतीक्षा करें..." : "पूछें"}
      </button>
      <div>{response}</div>
    </div>
  );
}

export default App;