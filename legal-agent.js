class LegalAgent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    z-index: 9999;
                    font-family: 'Outfit', sans-serif;
                }
                
                .legal-banner {
                    background: rgba(10, 10, 10, 0.95);
                    backdrop-filter: blur(10px);
                    border-top: 1px solid rgba(255, 203, 5, 0.3);
                    color: #e0e0e0;
                    padding: 15px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.5);
                    transform: translateY(100%);
                    transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .legal-banner.visible {
                    transform: translateY(0);
                }

                .legal-content {
                    flex: 1;
                    font-size: 0.85rem;
                    line-height: 1.4;
                    margin-right: 20px;
                }

                .legal-content strong {
                    color: #FFCB05;
                    font-weight: 600;
                    margin-bottom: 4px;
                    display: block;
                }

                .accept-btn {
                    background: linear-gradient(135deg, #3B4CCA, #2a3799);
                    color: white;
                    border: 1px solid rgba(255,255,255,0.1);
                    padding: 8px 20px;
                    border-radius: 20px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                    white-space: nowrap;
                }

                .accept-btn:hover {
                    box-shadow: 0 0 15px rgba(59, 76, 202, 0.5);
                    transform: translateY(-2px);
                }

                @media (max-width: 768px) {
                    .legal-banner {
                        flex-direction: column;
                        text-align: center;
                        gap: 15px;
                    }
                    .legal-content {
                        margin-right: 0;
                    }
                }
            </style>
            
            <div class="legal-banner" id="banner">
                <div class="legal-content">
                    <strong>LEGAL COMPLIANCE & DISCLAIMER</strong>
                    This site is a fan-made, independent marketplace and is NOT affiliated with, authorized, maintained, sponsored or endorsed by Nintendo, Creatures Inc., GAME FREAK inc., or The Pokémon Company. All Pokémon-related trademarks, character names, and card designs are the property of their respective owners. By using this site, you agree to our Terms of Service and acknowledge that you are trading at your own risk.
                </div>
                <button class="accept-btn" id="acceptBtn">I Acknowledge</button>
            </div>
        `;

        // Slight delay before showing the banner for effect
        setTimeout(() => {
            const hasAccepted = localStorage.getItem('sgTradingCardLegalAccepted');
            if (!hasAccepted) {
                this.shadowRoot.getElementById('banner').classList.add('visible');
            }
        }, 1000);
    }

    setupListeners() {
        const btn = this.shadowRoot.getElementById('acceptBtn');
        btn.addEventListener('click', () => {
            localStorage.setItem('sgTradingCardLegalAccepted', 'true');
            this.shadowRoot.getElementById('banner').classList.remove('visible');
        });
    }
}

// Define the custom web component
customElements.define('legal-agent', LegalAgent);
