<script setup lang="ts"></script>

<template>
  <section
    class="mx-auto grid min-h-[calc(100vh-300px)] max-w-5xl flex-col items-center justify-center gap-4 py-10 text-center md:py-12"
  >
    <div class="p-4">
      <div class="mb-10 flex items-center justify-center gap-3">
        <NextjsIcon class="h-[52px] w-[52px]" />
        <PlusIcon class="h-8 w-8" />
        <LuciaAuth class="h-14 w-14" />
      </div>
      <h1
        class="text-balance bg-gradient-to-tr from-black/70 via-black to-black/60 bg-clip-text text-center text-3xl font-bold text-transparent dark:from-zinc-400/10 dark:via-white/90 dark:to-white/20 sm:text-5xl md:text-6xl lg:text-7xl"
      >
        Next.js Lucia Auth Starter Template
      </h1>
      <p
        class="text-balance mb-10 mt-4 text-center text-muted-foreground md:text-lg lg:text-xl"
      >
        A Next.js Authentication starter template (password reset, email
        validation and oAuth). Includes Lucia, Drizzle, tRPC, Stripe,
        tailwindcss, shadcn-ui and react-email.
      </p>
      <div class="mb-10">
        <div class="mx-auto max-w-[430px]">
          <CopyToClipboard text={"git clone " + githubUrl} />
        </div>
      </div>
      <div class="flex justify-center gap-4">
        <Button size="lg" variant="outline" asChild>
          <a href="{githubUrl}">
            <GitHubLogoIcon class="mr-1 h-5 w-5" />
            GitHub
          </a>
        </Button>
        <Button size="lg" asChild>
          <Link href="/login">Get Started</Link>
        </Button>
      </div>
    </div>
  </section>
  <section>
    <div class="container mx-auto lg:max-w-screen-lg">
      <h1 class="mb-4 text-center text-3xl font-bold md:text-4xl lg:text-5xl">
        <a id="features"></a> Features
      </h1>
      <p
        class="text-balance mb-10 text-center text-muted-foreground md:text-lg lg:text-xl"
      >
        This starter template is a guide to help you get started with Next.js
        for large scale applications. Feel free to add or remove features to
        suit your needs.
      </p>
      <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {features.map((feature, i) => (
        <CardSpotlight
          key="{i}"
          name="{feature.name}"
          description="{feature.description}"
          logo="{<feature.logo"
          class="h-12 w-12"
        />} /> ))}
      </div>
    </div>
  </section>
</template>
