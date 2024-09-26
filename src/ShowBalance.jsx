import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

const ShowBalance = () => {

    const { publicKey } = useWallet();
    const { connection } = useConnection();
    const [balance, setBalance] = useState("");

    useEffect(() => {
        const fetchBalance = async () => {
            const balance = await connection.getBalance(publicKey);
            setBalance(balance/LAMPORTS_PER_SOL);
        }
        fetchBalance();
    }, [connection, publicKey])

    return (
        <div className="flex flex-col gap-4 items-center mt-8">
            <h2 className="text-neutral-200 font-semibold text-2xl">Show Balance</h2>
            <p className="text-center text-neutral-200">{`Balance is ${balance} SOL`}</p>
        </div>
        
    )
}

export default ShowBalance