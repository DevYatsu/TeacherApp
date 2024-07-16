import LoginForm from "./LoginForm";

export function LoginPage() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-gradient-to-t from-[#aac9eb] to-[#e795d1]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/waves.svg')] bg-cover bg-center bg-no-repeat animate-wave" />
      </div>
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <LoginForm />
      </div>
    </div>
  );
}
