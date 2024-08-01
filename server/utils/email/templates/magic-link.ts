export const magicLinkRequest = (url: string) => `
<div>
    <h1>Hello 👋,</h1>
    <p>
        You asked us to send you a magic link for quickly sign in to your Nuxt Lucia Auth account.
    </p>
    <a href="${url}" style="background: blue; border: none; color: white; padding: 10px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; border-radius:5px">
       Sign in Now!
    </a>
    <p>
        Or copy and paste this link 👇 into your browser. <br/> 
        <span>${url}</span>
    </p>
    <p>
        To keep your account secure, please don&apos;t forward this email to anyone.
    </p>
</div>
<div>
    <p>&copy; ${new Date().getFullYear()} Nuxt Lucia Auth. All rights reserved.</p>
</div>
`;
