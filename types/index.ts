export const features = [
  {
    name: "Nuxt.js",
    description: "The Vue Framework for Production",
    logo: "vscode-icons:file-type-nuxt",
  },
  {
    name: "Authentication",
    description:
      "Credential authentication with password reset and email validation",
    logo: "simple-icons:lucia",
  },
  {
    name: "Database",
    description: "Postgress database",
    logo: "devicon-plain:postgresql-wordmark",
  },
  {
    name: "Database ORM",
    description: "Drizzle with postgres database",
    logo: "simple-icons:drizzle",
  },
  {
    name: "TailwindCSS",
    description: "Simple and elegant UI components built with Tailwind CSS",
    logo: "simple-icons:tailwindcss",
  },
  {
    name: "Shadcn UI",
    description: "A set of beautifully designed UI components for Vue",
    logo: "simple-icons:shadcnui",
  },
];

export interface Feature {
  name: string;
  description: string;
  logo: string;
}

export const routes = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/#features" },
  {
    name: "Documentation",
    href: "https://github.com/DevHumbleChris/nuxt-lucia-auth.git",
  },
];

export const githubUrl =
  "https://github.com/DevHumbleChris/nuxt-lucia-auth.git";
export const twitterUrl = "https://x.com/AmChrisKE";
