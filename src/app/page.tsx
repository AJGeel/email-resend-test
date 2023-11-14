import DealerForm from "@/components/DealerForm";

const HomePage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-200">
      <div className="w-full lg:max-w-2xl p-24 ">
        <DealerForm />
      </div>
    </main>
  );
};

export default HomePage;
