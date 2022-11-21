let spData = [
  '0xF9901CC6bbC8518088B2C8350fCd0635A23b250E',
  '0x23Ed077d5c630cF9b55324Ca3bC706a70ffCb696',
  '0xB2FB886Eb402848B772469a34a7180747C7F7934',
  '0x4Fb0a43C637566f2f18B2eE7034f430A7F95dBcF',
  '0x19b228f57165be621f49D96E26C459Aa115Eb83D',
];
let dummyUserAddressMM = '0xCce0886d48BeeDa8ba9f136C74493CE0AD799Bf6';
let dummyWalletAddress = '0x9140a5F347eD608256A4AAF268D8F48Bd630100b';


let isServiceProvider = function (userAddress) {
  return spData.includes(userAddress);
};
module.exports = { isServiceProvider };
