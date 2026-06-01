<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/a8ef8ef2-bdd1-4bb3-a4f3-ccf373ec5b00

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Configure contact mail delivery in `.env.local`:
   `CONTACT_EMAIL_USER=your-gmail-address@gmail.com`
   `CONTACT_EMAIL_APP_PASSWORD=your-gmail-app-password`
   `CONTACT_EMAIL_TO=shalinirvithanage@gmail.com`
4. Run the app:
   `npm run dev`
