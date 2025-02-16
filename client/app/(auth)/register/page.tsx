import RegisterForm from "../_components/register-form";

const RegisterPage = () => {
  return (
    <main className="relative flex items-center justify-center h-screen w-full">
      <div className="h-full absolute -z-10 w-full  pattern-zigzag-3d pattern-gray-600 pattern-opacity-5  pattern-bg-white pattern-size-32 "></div>
      <RegisterForm />
    </main>
  );
};
export default RegisterPage;
