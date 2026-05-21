"use client";

import { useParams } from "next/navigation";

export default function ChatPage() {

  const params = useParams();

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-5">
        Conversation Room
      </h1>

      <p className="text-gray-400 mb-10">
        Chat ID: {params.id}
      </p>

      <div className="bg-gray-900 p-5 rounded-xl h-[400px]">
        <p>Hello 👋</p>
      </div>

      <input
        type="text"
        placeholder="Type message..."
        className="w-full mt-5 p-4 rounded bg-gray-800"
      />

    </div>
  );
}