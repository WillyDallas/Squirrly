import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "./useScaffoldContractRead";
import { BigNumber } from "ethers";

export function useBalanceOf() {
  const [hasBalance, setHasBalance] = useState<boolean>();

  const { address: accountAddress, isConnected } = useAccount();

  const { data: balanceOf } = useScaffoldContractRead<BigNumber>("SquirrlyNFT", "balanceOf", {
    args: [accountAddress],
  });

  // this causes an infinite loop between the index and dashboard pages

  useEffect(() => {
    if (balanceOf && balanceOf.toNumber() > 0) {
      setHasBalance(true);
    } else if (!balanceOf || !isConnected) {
      setHasBalance(false);
    }
  }, [balanceOf, isConnected, setHasBalance]);

  //if (!hasBalance) return true;
  return hasBalance;
}
