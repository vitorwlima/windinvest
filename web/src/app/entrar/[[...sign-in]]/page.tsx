import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return (
    <main className="grid min-h-screen place-items-center">
      <SignIn />
    </main>
  )
}

export default SignInPage
