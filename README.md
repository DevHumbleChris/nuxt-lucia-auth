# Nuxt.js Lucia Auth Starter Template

## Motivation

Implementing authentication in Nuxt.js, especially Email+Password authentication, can be challenging. NuxtAuth [sidebase.io](https://auth.sidebase.io/) intentionally limits email password functionality to discourage the use of passwords due to security risks and added complexity. However, in certain projects, clients may require user password authentication. Lucia offers a flexible alternative to NuxtAuth and other Nuxt auth utils, providing more customization options without compromising on security. This template serves as a starting point for building a Nuxt.js app with Lucia authentication.

## Lucia vs. NuxtAuth

Lucia is less opinionated than NuxtAuth [sidebase.io](https://auth.sidebase.io/), offering greater flexibility for customization. While Lucia involves more setup, it provides a higher degree of flexibility, making it a suitable choice for projects requiring unique authentication configurations.

## Key Features

- **Authentication:** 💼 Support for Credential and OAuth authentication.
- **Authorization:** 🔒 Easily manage public and protected routes within the project.
- **Email Verification:** 📧 Verify user identities through email.
- **Password Reset:** 🔑 Streamline password resets by sending email password reset links.
- **Lucia + Nuxt Server Routes:** 🔄 Similar to NuxtAuth, granting access to sessions and user information through server routes.
- **Email template:** ✉️ Craft your email templates using and send email them with [nodemailer](https://nodemailer.com/).
- **PostgreSQL Database:** 🛢️ Utilize a PostgreSQL database set up using Drizzle for enhanced performance and type safety.
- **Database Migration:** 🚀 Included migration script to extend the database schema according to your project needs.

## Tech Stack

- [Nuxt.js](https://nextjs.org)
- [Lucia](https://lucia-auth.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn Vue UI](https://www.shadcn-vue.com/)
- [Validate forms with vee-validate](https://vee-validate.logaretm.com/v4/)

## Get Started

1. Clone this repository to your local machine.
2. Copy `.env.example` to `.env` and fill in the required environment variables.
3. Run `npm install` to install dependencies.
4. Run `npm db:genrate` to push your schema to the database.
5. Execute `npm run dev` to start the development server and enjoy!

## Deploy to Vercel / anywhere

Add the following **environment variables** :-

```env
DATABASE_URL=**********

JWT_SECRET =**********
BASE_URL =**********

GMAIL_EMAIL_USER =**********
GMAIL_EMAIL_PASSWORD = **********
```

## Roadmap

- [x] Email/password auth with verification.
- [ ] Sign in with OAuth providers (GitHub/Google).
- [ ] Sign in using Magic link.
- [ ] Role-Based Access Policy (under consideration)
- [ ] Admin Dashboard (under consideration)

## Contributing

To contribute, fork the repository and create a feature branch. Test your changes, and if possible, open an issue for discussion before submitting a pull request. Follow project guidelines, and welcome feedback to ensure a smooth integration of your contributions. Your pull requests are warmly welcome.
