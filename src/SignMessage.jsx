import { useState } from "react"
import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';

const SignMessage = () => {

    const { publicKey, signMessage } = useWallet();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSignMessage = async () => {
        if (!publicKey) throw new Error('Wallet not connected!');
        if (!signMessage) throw new Error('Wallet does not support message signing!');
        
        try{
            setLoading(true);
            const encodedMessage = new TextEncoder().encode(message);
            const signature = await signMessage(encodedMessage);
            if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid!');
            alert(`Message signed successfully, messagesignature: ${bs58.encode(signature)}`);
        } catch(error) {
            console.error("Signing failed:", error);
            alert("Signing failed! Check the console for more details.");
        }
        finally {
            setLoading(false);
            setMessage("");
        }
        
    }

    return (
        <div className="flex flex-col gap-4 items-center mt-8">
            <h2 className="text-neutral-200 font-semibold text-2xl">Sign a message</h2>
            <input
                className="w-56 text-neutral-900 bg-neutral-400 p-2 rounded-md placeholder:text-neutral-800"
                type="text"
                placeholder="Enter recepient's address"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading}
            />
            <button
                className="text-neutral-900 bg-neutral-400 hover:bg-neutral-500 p-2 rounded-md"
                onClick={handleSignMessage}
                disabled={loading}
            >
                {loading ? "Sending..." : "Send"}
            </button>
        </div>
    )
}

export default SignMessage