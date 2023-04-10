// SPDX-License-Identifier: SEE LICENSE IN LINCENSE
pragma solidity  ^0.8.18;

import"@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract DataFeedDemo {
    //Goerli Testnet
    //BTC / ETH 
    //0x779877A7B0D9E8603169DdbD7836e478b4624789

AggregatorV3Interface internal priceFeed;

constructor(){
    priceFeed = AggregatorV3Interface(0x779877A7B0D9E8603169DdbD7836e478b4624789);
}

function getPrice() public view returns(int256 ) {
    ( , int256 answer, , ,   ) = priceFeed.latestRoundData();
    return answer;
}
}