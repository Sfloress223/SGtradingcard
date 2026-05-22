# System Instructions for AI Coding Assistants (Antigravity & others)

> [!IMPORTANT]
> **Hosting & Deployment Platform: Render ONLY**
> We host our application exclusively on **Render** (`https://sgtradingcard.com` / `https://sgtradingcard.onrender.com`).
> **DO NOT** use Vercel, reference Vercel, configure Vercel, or try to run Vercel deployments.

## Architecture Guidelines

1. **Monolithic Architecture**:
   - The backend is an Express server running in [server.js](file:///c:/Projects/SGtradingcard/server.js).
   - The frontend is a React + Vite application under [src/](file:///c:/Projects/SGtradingcard/src/).
   - The Express backend serves the static React production build directly from the `dist/` folder via `express.static` middleware at the root of the server.

2. **Vite Production Assets Pipeline**:
   - The `dist/` folder **IS tracked in Git**.
   - Whenever any frontend modifications (e.g., changes to [src/AdminDashboard.jsx](file:///c:/Projects/SGtradingcard/src/AdminDashboard.jsx) or other React components) are made:
     1. Run `npm run build` locally to compile the new React production bundle.
     2. Stage and commit both the React source code changes AND the compiled `dist/` files.
     3. Push the commits to the `master` branch on GitHub (`https://github.com/Sfloress223/SGtradingcard.git`).
   - Render will automatically trigger a build, pull the latest code (including the pre-built `dist/` assets), and start the Express server.

3. **Routing & Middleware Precedence**:
   - Any new API endpoints must be defined **before** the React Router catch-all fallback middleware in [server.js](file:///c:/Projects/SGtradingcard/server.js).
   - The catch-all route `app.get('*', (req, res) => res.sendFile(...))` must always remain at the **absolute bottom** of [server.js](file:///c:/Projects/SGtradingcard/server.js) so that API endpoints are not shadowed.
