# Vinay Wakadkar — Portfolio

A React + Vite portfolio site designed to be readable by people, traditional search engines, and AI-powered search tools.

## Run locally
1. Install Node.js (LTS) and Git.
2. Open this folder in VS Code.
3. Open Terminal and run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the local URL shown in the terminal.

## Deploy
Push this folder to a GitHub repository, then import that repository into Vercel. Vercel can automatically redeploy when you push future changes to the connected branch.

## Important before publishing
Search for `vinay-portfolio.vercel.app` in `index.html`, `robots.txt`, and `sitemap.xml` and replace it with your actual Vercel production URL after deployment. Update the JSON-LD `url`, sitemap URL, and sitemap location too.

The Meridian project card links to both the public GitHub repository and its live Looker Studio dashboard: https://datastudio.google.com/reporting/dfe4bf6b-1a30-4442-8cfa-9f85b0448c76. The portfolio chatbot also includes the project workflow and clearly labels the metrics as simulated case-study outputs.

Review all project details, contact links, and wording for accuracy before submitting. This starter deliberately does not claim professional work experience or claim that Power BI is already mastered. The chatbot is a lightweight local FAQ matcher; it does not call an external AI API.

## AI/search discovery notes
- The site has visible, crawlable HTML text, descriptive title/description, Person structured data, and a sitemap.
- `robots.txt` allows OAI-SearchBot and other crawlers.
- These are best practices, not a guarantee of Google indexing or being mentioned by ChatGPT/other AI tools. Indexing can take time. Search Console can be used to request indexing after launch.
