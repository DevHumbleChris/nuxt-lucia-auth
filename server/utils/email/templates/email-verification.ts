export const emailVerificationTemplate = (code: string) => `
<div>
    <h1>Hello 👋,</h1>
    <p>
        Thank you for registering for an account on Nuxt Lucia Auth. To complete your registration, please verify your account by using the following code:
    </p>
    <p style="color: blue">
        Code: ${code}
    </p>
    <p>
        If you didn't create an account, you can safely ignore this email.
    </p>
</div>
<div>
    <p>&copy; ${new Date().getFullYear()} Nuxt Lucia Auth. All rights reserved.</p>
</div>
`;
