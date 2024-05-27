export interface MiningInfo {
  logo: any;
  name: string;
  netHashes: string;
  blockNumber: number;
  blockTime: number;
  blockReward: number;
  totalCoinsMined: number;
  maxSupply: string;
}

function MiningCard({ miningInfo }: { miningInfo: MiningInfo }) {
  return (
    <div className="mining-card">
      <div className="mining-card-header flex items-center justify-center py-6 align-middle">
        <img src={miningInfo.logo} alt="exhange logo" width={50} />
        <h1 className="ml-2 text-4xl font-semibold">{miningInfo.name}</h1>
      </div>
      <div className="mining-card-info grid grid-cols-2 py-4">
        <div className="flex justify-start">
          <p className="py-4 pl-6 font-medium">Net Hashes /Sec</p>
        </div>
        <div className="flex justify-end">
          <p className="py-4 pr-6">{miningInfo.netHashes}</p>
        </div>
        <div className="flex justify-start">
          <p className="py-3 pl-6 font-medium">Block Number</p>
        </div>
        <div className="flex justify-end">
          <p className="py-4 pr-6">{miningInfo.blockNumber}</p>
        </div>
        <div className="flex justify-start">
          <p className="py-3 pl-6 font-medium">Block Time</p>
        </div>
        <div className="flex justify-end">
          <p className="py-4 pr-6">{miningInfo.blockTime}</p>
        </div>
        <div className="flex justify-start">
          <p className="py-3 pl-6 font-medium">Block Reward</p>
        </div>
        <div className="flex justify-end">
          <p className="py-4 pr-6">{miningInfo.blockReward}</p>
        </div>
        <div className="flex justify-start">
          <p className="py-3 pl-6 font-medium">Total Coins Mined</p>
        </div>
        <div className="flex justify-end">
          <p className="py-4 pr-6">{miningInfo.totalCoinsMined}</p>
        </div>
        <div className="flex justify-start">
          <p className="py-3 pl-6 font-medium">Max Supply</p>
        </div>
        <div className="flex justify-end">
          <p className="py-4 pr-6">{miningInfo.maxSupply}</p>
        </div>
      </div>
    </div>
  );
}

export default MiningCard;
