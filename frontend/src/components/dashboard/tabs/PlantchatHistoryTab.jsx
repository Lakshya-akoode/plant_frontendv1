'use client';

import { useState, useEffect } from 'react';

const PlantchatHistoryTab = ({ user }) => {
  return (
    <div className="pc-container" role="region" aria-label="Plant Chat links">
        <div className="tab-header">
          <h2>Plant Chat® GPT</h2>
          {/* <p>Here you can view your previous Plant Chat® conversations, search through past queries, and filter results by date. Your history helps you quickly revisit answers, track progress, and explore earlier guidance.</p> */}
        </div>
        <div className="hero-btn text-center pb-5">
          <a href="https://chat.openai.com/?model=gpt-5.1" className="btn-default" target="_blank" rel="noopener noreferrer">Ask Plant Chat® Now</a>
        </div>
        <div className="diet-log-form" style={{ maxWidth: "700px", width: "100%", margin:"0 auto 36px", textAlign:"center" }}>
                <p className="pc-note">
                  <strong>This opens Plant Chat® on ChatGPT. You’ll need a ChatGPT Plus account to use it.</strong>
                </p>
                <p className="pc-note">
                  <span className="pc-small-block"><strong>V2 coming soon</strong> with Plant Chat available on our website.</span>
                </p>
                <p className="pc-note">
                <span className="pc-small-block">Requires <strong>ChatGPT login</strong> and <strong>Plus plan</strong> to access.</span>
                </p>
                  
            </div>
        <div className="history-card" style={{textAlign:"center"}}>
            
            <div className="pc-divider" />

            <div className="pc-info">
              <div className="tab-header">
                  <h4 className="pc-subtitle">Click Here to use the free option (ChatGPT 3.5)</h4>
              </div>
              {/* <p className="pc-text">
                <strong>Perfect — if you want to give your users the option to use free ChatGPT (GPT-3.5), here's how to do it:</strong>
              </p> */}
              <div className="hero-btn pb-5">
                  <a
                    href="https://chat.openai.com/chat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-default"
                    aria-label="Open Free ChatGPT (GPT-3.5)"
                  >
                    Use Free ChatGPT (GPT-3.5)
                  </a>
              </div>

              <p className="pc-text">
                Anyone can use <strong>GPT-3.5</strong> for <strong>free</strong> (OpenAI account required):
              </p>

              <p className="pc-text">
                That link takes users directly to the default <strong>ChatGPT interface,</strong> which uses <strong>GPT-3.5 if they’re not subscribed.</strong>
              </p>

              <div className="pc-example">
                <div className="pc-example-note">
                  Use ChatGPT Free (GPT-3.5) without a subscription.
                </div>
              </div>
            </div>
            {/* <div className="py-5 justify-content-center" style={{display: "flex", gap: "15px"}}>
              <a href="https://chat.openai.com/g/g-NF5gkXiv4-plant-chat" className="btn-default" target="_blank" rel="noopener noreferrer">
                Ask Plant Chat® (Plus Only)
              </a>
              <a href="https://chat.openai.com/chat" className="btn-default" target="_blank" rel="noopener noreferrer">
                Use Free ChatGPT (GPT-3.5)
              </a>
            </div> */}
          </div>
      </div>

  );
};


export default PlantchatHistoryTab;
