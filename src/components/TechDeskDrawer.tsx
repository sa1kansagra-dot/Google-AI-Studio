import React, { useState } from 'react';

interface TechDeskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'tech' | 'user';
  text: string;
  time: string;
}

const FAQS = [
  {
    q: 'Does Ryzen 7 7800X3D bottleneck RTX 4090?',
    a: 'No! The AMD Ryzen 7 7800X3D features 104MB total cache with stacked 3D V-Cache, which yields zero CPU bottlenecks for the GeForce RTX 4090 even at 1440p and 4K competitive frame rates.',
  },
  {
    q: 'What cooler is required for Core i9-14900K?',
    a: 'Under unlocked PL2 thermal limits (253W+), we recommend a minimum 360mm AIO liquid cooler (such as Arctic Liquid Freezer III or EK Nucleus) with high static-pressure fans.',
  },
  {
    q: 'Are all CPUs tested in your Austin cleanroom?',
    a: 'Yes! Every CPU and laptop is verified through 24-point electrical checks, memory controller stability testing (DDR5 EXPO / XMP), and serial logging before FastPass dispatch.',
  },
  {
    q: 'How does the GPU / CPU Trade-In work?',
    a: 'You can submit your current GPU or CPU serial number. Once verified, we send a prepaid insured return container and apply an instant trade-in credit of up to $650 toward your new rig or processor.',
  },
];

export const TechDeskDrawer: React.FC<TechDeskDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'tech',
      text: 'Hello! You are connected with Marcus, Senior IPC-Certified Hardware Specialist at PCWARE Austin Labs. How can I assist with your silicon architecture, laptop selection, or power calculations today?',
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const newMsgs: Message[] = [
      ...messages,
      { sender: 'user', text: userText, time: 'Just now' },
    ];
    setMessages(newMsgs);
    setInput('');

    // Check if matches a known query
    const match = FAQS.find((f) =>
      userText.toLowerCase().includes(f.q.toLowerCase().split(' ')[1] || '')
    );

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'tech',
          text: match
            ? match.a
            : `Thanks for asking. Regarding "${userText}": In our Austin test bench, our IPC technicians ensure all hardware maintains optimal thermal thresholds and 100% PCIe Gen 5 integrity. All items also include our 3-year unified warranty.`,
          time: 'Just now',
        },
      ]);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="bg-[#131921] text-white px-4 py-3 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <div>
                <h3 className="font-heading font-bold text-sm">24/7 Expert Tech Desk</h3>
                <span className="text-[11px] text-gray-300">IPC Certified • Austin Lab Center</span>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-300 hover:text-white p-1 rounded-full hover:bg-gray-800">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Quick FAQ Prompts */}
          <div className="bg-slate-50 border-b border-slate-200 p-2.5">
            <div className="text-[11px] font-bold text-gray-600 mb-1">Common Silicon Inquiries:</div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {FAQS.map((faq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(faq.q)}
                  className="px-2.5 py-1 bg-white border border-gray-300 hover:border-primary rounded text-[10px] text-gray-700 whitespace-nowrap shrink-0 transition-colors"
                >
                  {faq.q}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-primary text-white font-medium'
                      : 'bg-slate-100 text-gray-800 border border-slate-200'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-0.5 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about socket compatibility, coolers, or power..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded text-xs focus:border-primary outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded shadow transition-all"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
