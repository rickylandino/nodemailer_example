This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and [`tailwindcss`](https://tailwindcss.com/).

## Using This Project
1. Clone the repository
2. Run ```npm install``` at the root of the project, where package.json resides
3. Replace SMTP information in [next.config.mjs](./next.config.mjs) with the email you will use for sending
4. Run ```npm run dev``` then open [http://localhost:3000](http://localhost:3000) with your browser to see the result

## Navigating This Project
* [next.config.mjs](./next.config.mjs) contains the SMTP configuration needed for emails to send.
* [sendEmail/route.ts](./app/api/sendEmail) is the API that performs the action of sending the email.
* [services/mailService.ts](./app/services/mailService.ts) is the middleware that utilizes Javascript fetch API to call the email sender API.
* [app/page.tsx](/app/page.tsx) is the entry point where changes can be made.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
