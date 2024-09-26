import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

const RequestAirdrop = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [airdropAmount, setAirdropAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleRequestAirdrop = async () => {
    if (!publicKey) {
      alert("Please connect your wallet first.");
      return;
    }

    if(airdropAmount < 0) {
        alert('Please enter amount in positive')
    }

    try {
      setLoading(true);
      const lamports = airdropAmount * LAMPORTS_PER_SOL;
      await connection.requestAirdrop(publicKey, lamports);
      alert(`Airdropped ${airdropAmount} SOL to ${publicKey.toBase58()}`);
    } catch (error) {
      console.error("Airdrop failed:", error);
      alert("Airdrop failed! Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-4 gap-4">
      <input
        className="w-48 text-neutral-900 bg-neutral-400 p-2 rounded-md"
        type="number"
        min={"0"}
        placeholder="Enter amount in SOL"
        value={airdropAmount}
        onChange={(e) => setAirdropAmount(e.target.value)}
        disabled={loading}
      />
      <button
        className="text-neutral-900 bg-neutral-400 hover:bg-neutral-200 p-2 rounded-md"
        onClick={handleRequestAirdrop}
        disabled={loading}
      >
        {loading ? "Requesting..." : "Request Airdrop"}
      </button>
    </div>
  );
};

export default RequestAirdrop;
