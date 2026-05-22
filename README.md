# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deployment Architecture

- **Hosting Platform**: Hosted exclusively on **Render** (custom domain: `https://sgtradingcard.com` / fallback: `https://sgtradingcard.onrender.com`).
- **Framework & Strategy**: Monolithic Express.js backend that serves Vite production assets statically from the `dist/` directory.
- **Workflow**:
  1. Modify React files in `src/`.
  2. Run `npm run build` to update files in `dist/`.
  3. Commit and push both source and `dist/` files to the `master` branch.
  4. Render automatically pulls, builds, and deploys.

