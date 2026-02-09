import React, { useState, useRef, useEffect } from "react";
import portfolio from "../../data/portfolio.json";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi — ask me anything about Bhavish's portfolio." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open && bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    // Generate a simple reply from the local JSON data.
    try {
      const reply = generateReply(input.trim());
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    } catch (err) {
      setMessages((m) => [...m, { role: "assistant", text: "Error generating reply." }]);
    } finally {
      setLoading(false);
    }
  };

  const generateReply = (message) => {
    const q = message.toLowerCase();
    const p = portfolio;

    if (q.includes("skill") || q.includes("skills") || q.includes("framework") || q.includes("language")) {
      const langs = p.skills.languages.join(", ");
      const fw = p.skills.frameworks.join(", ");
      const tools = p.skills.tools.join(", ");
      return `Skills: Languages: ${langs}. Frameworks: ${fw}. Tools: ${tools}.`;
    }

    if (q.includes("experience") || q.includes("intern")) {
      return p.experience.map((e) => `${e.title} @ ${e.company} (${e.date}) — ${e.responsibilities.join(", ")}`).join("\n\n");
    }

    if (q.includes("project") || q.includes("projects")) {
      return p.projects.map((proj) => `${proj.name} (${proj.year}) — ${proj.description}`).join("\n\n");
    }

    if (q.includes("education") || q.includes("degree") || q.includes("college")) {
      return p.education.map((ed) => `${ed.degree} — ${ed.institution} ${ed.years ? `(${ed.years})` : ""} ${ed.cgpa ? `CGPA: ${ed.cgpa}` : ed.percentage ? `Percentage: ${ed.percentage}` : ""}`).join("\n\n");
    }

    if (q.includes("email") || q.includes("contact") || q.includes("phone") || q.includes("reach")) {
      return `Contact: Email: ${p.email}. Phone: ${p.phone}. LinkedIn: ${p.linkedin}. GitHub: ${p.github}`;
    }

    if (q.includes("certificate") || q.includes("certificates")) {
      return `Certificates: ${p.certificates.join("; ")}`;
    }

    if (q.includes("language") || q.includes("languages")) {
      return `Spoken languages: ${p.languages.join(", ")}`;
    }

    if (q.includes("objective") || q.includes("career") || q.includes("goal")) {
      return p.careerObjective;
    }

    if (q.includes("name") || q.includes("who are you") || q.includes("who is")) {
      return `${p.name} — ${p.role}`;
    }

    // Default reply: short summary and prompts
    return `${p.name} is a ${p.role}. Ask about skills, projects, experience, education, or contact details.`;
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div>
      {/* Floating button */}
      <button
        aria-label="Open AI chat"
        onClick={() => setOpen((o) => !o)}
        className="fixed right-6 bottom-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#915EFF] text-white shadow-lg hover:scale-105 transition-transform"
      >
        AI
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed right-6 bottom-24 z-50 w-[360px] max-w-[92vw] h-[480px] bg-black-100 rounded-xl shadow-2xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 bg-[#0b1220] flex items-center justify-between">
            <div className="text-white font-semibold">Bhavish AI Assistant</div>
            <button onClick={() => setOpen(false)} className="text-secondary">Close</button>
          </div>

          <div className="flex-1 p-3 overflow-auto space-y-3 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <div className={`inline-block px-3 py-2 rounded-lg ${m.role === "user" ? "bg-[#1f2937] text-white" : "bg-[#111827] text-white-100"}`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="p-3 border-t border-gray-800">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask about Bhavish's skills, experience or projects..."
              className="w-full bg-tertiary text-white rounded-md p-2 h-16 resize-none outline-none"
            />
            <div className="mt-2 flex justify-end gap-2">
              <button
                onClick={sendMessage}
                disabled={loading}
                className="bg-[#915EFF] text-white px-3 py-1 rounded-md disabled:opacity-60"
              >
                {loading ? "Thinking..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
