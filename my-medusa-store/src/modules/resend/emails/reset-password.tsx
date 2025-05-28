
export function resetPasswordEmail({ resetUrl }: { resetUrl: string }) {
  return (
    <div>
      <h1>Reset your password</h1>
      <p>We received a request to reset your password. Click the link below to set a new password:</p>
      <a href={resetUrl}>Reset Password</a>
      <p>If you did not request a password reset, you can safely ignore this email.</p>
    </div>
  )
}
