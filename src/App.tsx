import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen min-w-7xl bg-gray-900 text-white p-10">
      <h1 className="text-2xl text-center mb-8">PR-DR Automation</h1>

      <div className="grid grid-cols-3 mb-2 border-2 border-gray-400 p-2 rounded bg-gray-800">
        <div className="text-center font-semibold">PR</div>
        <div className="text-center font-semibold">DR</div>
        <div className="text-center font-semibold">Action</div>
      </div>
      <ServerSection
        title="Web Server"
        prLabel="Web Server (10.176.38.144)"
        drLabel="Web Server (10.176.38.144)"
      />
      <ServerSection
        title="App Server"
        prLabel="App Server (10.176.38.145)"
        drLabel="App Server (10.176.38.145)"
      />
      <ServerSection
        title="Database Server"
        prLabel="Database Server (10.176.38.146)"
        drLabel="Database Server (10.176.38.147)"
      />
    </div>
  );
}

type ServerSectionProps = {
  title: string;
  prLabel: string;
  drLabel: string;
};

function ServerSection({ title, prLabel, drLabel }: ServerSectionProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setLogs([]); // Clear previous logs

    const steps = [
      "Initializing process...",
      "Connecting to server...",
      "Deploying build...",
      "Running verification checks...",
      "Deployment completed successfully ✅",
    ];

    // Show logs one by one with delay
    for (let i = 0; i < steps.length; i++) {
      await new Promise((res) => setTimeout(res, 1000)); // 1 second delay per step
      setLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] ${steps[i]}`,
      ]);
    }

    setIsRunning(false);
  };

  return (
    <div className="w-full my-12">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold text-gray-200">{title}</h2>
      </div>

      <div className="grid grid-cols-3 items-center gap-8">
        <div className="flex flex-col items-center">
          <div className="border border-gray-500 p-4 text-white text-sm w-40 text-center rounded">
            {prLabel}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="border border-gray-500 p-4 text-white text-sm w-40 text-center rounded">
            {drLabel}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleRun}
            className={`px-5 py-2 border border-gray-400 rounded hover:bg-gray-700 text-white text-sm transition ${
              isRunning ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isRunning}
          >
            {isRunning ? "Running..." : "Run"}
          </button>
        </div>
      </div>

      {/* Logs */}
      {logs.length > 0 && (
        <div className="mt-4 bg-black text-green-400 font-mono text-sm p-4 rounded border border-gray-700 max-h-60 overflow-y-auto w-[85%] mx-auto shadow-lg">
          {logs.map((log, idx) => (
            <div key={idx} className="whitespace-pre-wrap">
              {log}
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-dashed border-gray-700 mt-8"></div>
    </div>
  );
}

export default App;
