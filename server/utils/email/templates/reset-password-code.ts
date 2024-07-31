export const resetPasswordCodeRequest = (code: string) => `
<div>
    <h1>Hello 👋,</h1>
    <p>
        Someone recently requested a password change for your Nuxt Lucia Auth account. If this was
        you, use the code below to reset your password.
    </p>
    <p style="color: blue">
        Code: ${code}
    </p>
    <p>
        If you don&apos;t want to change your password or didn&apos;t request this, just
        ignore and delete this message.
    </p>
    <p>
        To keep your account secure, please don&apos;t forward this email to anyone.
    </p>
</div>
<div>
    <p>&copy; ${new Date().getFullYear()} Nuxt Lucia Auth. All rights reserved.</p>
</div>
`;
