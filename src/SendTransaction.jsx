import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";

const SendTransaction = () => {
    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const [recepientAddress, setRecepientAddress] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendTransaction = async () => {
        if (!publicKey) {
            alert("Please connect your wallet first.");
            return;
        }
        if (!recepientAddress || !amount) {
            alert("Please provide both a wallet address and an amount.");
            return;
        }

        try {
            setLoading(true);
            const { blockhash } = await connection.getLatestBlockhash("finalized");
            const transaction = new Transaction({
                recentBlockhash: blockhash,
                feePayer: publicKey,
            }).add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey(recepientAddress),
                    lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
                })
            );

            const signature = await sendTransaction(transaction, connection);
            await connection.confirmTransaction(signature, "confirmed");

            alert(`Sent ${amount} SOL to ${recepientAddress}`);
            setAmount("");
            setRecepientAddress("");
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Transaction failed! Check the console for more details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 items-center mt-8">
            <h2 className="text-neutral-200 font-semibold text-2xl">Send Transaction</h2>
            <input
                className="w-56 text-neutral-900 bg-neutral-400 p-2 rounded-md placeholder:text-neutral-800"
                type="number"
                placeholder="Enter amount in SOL"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={loading}
            />
            <input
                className="w-56 text-neutral-900 bg-neutral-400 p-2 rounded-md placeholder:text-neutral-800"
                type="text"
                placeholder="Enter recepient's address"
                value={recepientAddress}
                onChange={(e) => setRecepientAddress(e.target.value)}
                disabled={loading}
            />
            <button
                className="text-neutral-900 bg-neutral-400 hover:bg-neutral-500 p-2 rounded-md"
                onClick={handleSendTransaction}
                disabled={loading}
            >
                {loading ? "Sending..." : "Send"}
            </button>
        </div>
    );
};

export default SendTransaction;
