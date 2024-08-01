// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@nuxtjs/svg-sprite",
    "nuxt-og-image",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  googleFonts: {
    families: {
      Raleway: {
        wght: [100, 400],
        ital: [100],
      },
    },
  },
  image: {
    quality: 80,
    format: ["webp"],
  },
  colorMode: {
    preference: "system", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "",
    storageKey: "nuxt-color-mode-admin",
  },
  site: {
    // production URL
    url: process.env.BASE_URL,
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: "strict",
    },
  },
  runtimeConfig: {
    public: {
      googleClientId: process.env.OAUTH_GOOGLE_CLIENT_ID,
      googleClientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
      googleRedirectURI: process.env.OAUTH_GOOGLE_REDIRECT_URI,
      githubClientId: process.env.OAUTH_GITHUB_CLIENT_ID,
      githubClientSecret: process.env.OAUTH_GITHUB_CLIENT_SECRET,
    },
  },
});
