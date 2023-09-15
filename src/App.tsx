const array = new Array(5).fill(0);

const Placeholder = () => {
  return (
    <section className="h-screen flex justify-center items-center">
      <div className="h-[20vw] w-[20vw] bg-blue-300"></div>
    </section>
  );
};

function App() {
  return (
    <main className="min-h-screen bg-slate-100">
      {array.map((idx) => (
        <Placeholder key={idx} />
      ))}
    </main>
  );
}

export default App;
