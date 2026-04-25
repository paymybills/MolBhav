"use client";

import React, { useState } from "react";
import GridDistortion from "./GridDistortion";

const negotiations = [
  {
    id: "amazon_realistic",
    title: "amazon_realistic",
    personality: "default",
    outcome: "deal at ₹2,645",
    budget: "₹7,299",
    cost: "₹2,519",
    rounds: 8,
    surplus: 0.974,
    turns: [
      { role: "Seller", type: "text", content: "7299 rupees for this Crompton Gracee 5-L Instant Water Heater (Geyser). Very fair." },
      { role: "MolBhav", type: "offer", content: "₹4,697.82" },
      { role: "Seller", type: "text", content: "Okay, 6569. But that's the limit." },
      { role: "MolBhav", type: "offer", content: "₹4,269.91" },
      { role: "Seller", type: "text", content: "I can do 5839. Not lower. This is the last one I have." },
      { role: "MolBhav", type: "offer", content: "₹3,795.48" },
      { role: "Seller", type: "text", content: "5109 rupees. That's my best offer. This is the last one I have." },
      { role: "MolBhav", type: "offer", content: "₹3,321.05" },
      { role: "Seller", type: "text", content: "4379 rupees. That's my best offer." },
      { role: "MolBhav", type: "offer", content: "₹2,846.61" },
      { role: "Seller", type: "text", content: "I can do 3650. Not lower." },
      { role: "MolBhav", type: "offer", content: "₹2,372.18" },
      { role: "Seller", type: "text", content: "I can do 2920. Not lower." },
      { role: "MolBhav", type: "offer", content: "₹2,540.05" },
      { role: "Seller", type: "text", content: "2645 rupees. That's my best offer." },
      { role: "MolBhav", type: "accept", content: null },
      { role: "Seller", type: "text", content: "You accept the seller's offer of 2645 rupees." },
    ]
  },
  {
    id: "read_the_tells",
    title: "read_the_tells",
    personality: "deceptive",
    outcome: "deal at ₹66",
    budget: "₹100",
    cost: "₹30",
    rounds: 2,
    surplus: 0.483,
    turns: [
      { role: "Seller", type: "text", content: "This handwoven silk scarf is selling fast. 76, and honestly I'm losing money at that." },
      { role: "MolBhav", type: "offer", content: "₹66.03" },
      { role: "Seller", type: "text", content: "66... you know, I shouldn't even go this low. My cousin told me someone offered more yesterday." },
      { role: "MolBhav", type: "accept", content: null },
      { role: "Seller", type: "text", content: "You accept the seller's offer of 66 rupees." },
    ]
  },
  {
    id: "career_10",
    title: "career_10",
    personality: "default",
    outcome: "deal at ₹32",
    budget: "₹100",
    cost: "₹30",
    rounds: 8,
    surplus: 0.979,
    turns: [
      { role: "Seller", type: "text", content: "60 rupees for this handwoven silk scarf. Very fair." },
      { role: "MolBhav", type: "offer", content: "₹39.00" },
      { role: "Seller", type: "text", content: "54 rupees. That's my best offer." },
      { role: "MolBhav", type: "offer", content: "₹34.91" },
      { role: "Seller", type: "text", content: "Okay, 47. But that's the limit." },
      { role: "MolBhav", type: "offer", content: "₹30.81" },
      { role: "Seller", type: "text", content: "I can do 41. Not lower." },
      { role: "MolBhav", type: "offer", content: "₹30.00" },
      { role: "Seller", type: "text", content: "Okay, 35. But that's the limit. This is the last one I have." },
      { role: "MolBhav", type: "offer", content: "₹30.00" },
      { role: "Seller", type: "text", content: "I can do 32. Not lower. Someone else was looking at this earlier..." },
      { role: "MolBhav", type: "offer", content: "₹29.93" },
      { role: "Seller", type: "text", content: "I can do 32. Not lower." },
      { role: "MolBhav", type: "offer", content: "₹30.00" },
      { role: "Seller", type: "text", content: "32 rupees. That's my best offer." },
      { role: "MolBhav", type: "accept", content: null },
      { role: "Seller", type: "text", content: "You accept the seller's offer of 32 rupees." },
    ]
  }
];

export default function NegotiationsDisplay() {
  const [activeId, setActiveId] = useState(negotiations[0].id);
  const activeNeg = negotiations.find(n => n.id === activeId)!;

  return (
    <div className="mb-14 relative rounded-3xl overflow-hidden border border-foreground/10" style={{ minHeight: '800px', backgroundColor: '#000' }}>
      <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-auto">
        <GridDistortion
          imageSrc="https://picsum.photos/1920/1080?grayscale"
          grid={15}
          mouse={0.1}
          strength={0.15}
          relaxation={0.9}
        />
      </div>

      <div className="relative z-10 p-8 flex flex-col md:flex-row h-full gap-8 pointer-events-none">
        
        {/* Sidebar */}
        <div className="md:w-1/3 flex flex-col gap-4 pointer-events-auto">
          <h2 className="text-2xl font-bold text-white mb-2">Sample Transcripts</h2>
          <p className="text-sm text-zinc-400 mb-4">Pulled from 60 eval episodes across 3 suites. Watch the agent play the player.</p>
          
          <div className="flex flex-col gap-3">
            {negotiations.map(neg => (
              <button
                key={neg.id}
                onClick={() => setActiveId(neg.id)}
                className={`text-left p-4 rounded-xl border focus:outline-none transition-all ${
                  activeId === neg.id 
                    ? "bg-[#272822] border-[#66D9EF]/50 shadow-[0_0_15px_rgba(102,217,239,0.15)]" 
                    : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/80"
                }`}
              >
                <div className="font-mono text-[#A6E22E] text-sm mb-1">{neg.title}</div>
                <div className="text-xs text-zinc-400 flex justify-between">
                  <span>Seller: {neg.personality}</span>
                  <span className="text-[#F92672]">surplus: {neg.surplus.toFixed(3)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="md:w-2/3 flex flex-col h-full pointer-events-auto">
          <div className="bg-[#272822]/95 backdrop-blur-md rounded-2xl border border-[#3E3D32] flex flex-col overflow-hidden h-[700px] shadow-2xl">
            {/* Header */}
            <div className="bg-[#1E1E1E] p-4 flex gap-4 items-center border-b border-[#3E3D32] text-xs font-mono">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
              </div>
              <div className="flex gap-4 text-[#75715E] ml-4 overflow-x-auto whitespace-nowrap">
                <span><span className="text-[#66D9EF]">const</span> budget <span className="text-[#F92672]">=</span> <span className="text-[#AE81FF]">{activeNeg.budget}</span>;</span>
                <span><span className="text-[#66D9EF]">const</span> cost <span className="text-[#F92672]">=</span> <span className="text-[#AE81FF]">{activeNeg.cost}</span>;</span>
                <span><span className="text-[#66D9EF]">const</span> outcome <span className="text-[#F92672]">=</span> <span className="text-[#E6DB74]">&quot;{activeNeg.outcome}&quot;</span>;</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-[#3E3D32] scrollbar-track-transparent">
              {activeNeg.turns.map((turn, i) => {
                const isMolBhav = turn.role === "MolBhav";
                return (
                  <div key={i} className={`flex flex-col ${isMolBhav ? "items-end" : "items-start"}`}>
                    <div className="text-xs font-mono mb-1 text-[#75715E] flex items-center gap-2">
                      {isMolBhav ? (
                        <>
                          <span className="opacity-50">sys.action</span> 
                          <span className="text-[#66D9EF] tracking-wider">{turn.role}</span>
                        </>
                      ) : (
                        <>
                          <span className="text-[#F92672] tracking-wider font-bold">🏪 {turn.role}</span>
                          <span className="opacity-50">input.text</span>
                        </>
                      )}
                    </div>
                    
                    <div className={`max-w-[85%] rounded-lg p-3 font-mono text-sm leading-relaxed ${
                      isMolBhav 
                        ? 'bg-[#3E3D32]/50 border border-[#66D9EF]/20 text-[#F8F8F2]' 
                        : 'bg-[#1E1E1E]/80 border border-[#A6E22E]/20 text-[#A6E22E]'
                    }`}>
                      {isMolBhav ? (
                        <div>
                          <span className="text-[#F92672]">{turn.type}</span>
                          {turn.content && (
                            <>
                              <span className="text-[#F8F8F2]">{"("}</span>
                              <span className="text-[#AE81FF]">{turn.content}</span>
                              <span className="text-[#F8F8F2]">{")"}</span>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="break-words">
                          <span className="text-[#E6DB74] whitespace-pre-wrap">&quot;{turn.content}&quot;</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
