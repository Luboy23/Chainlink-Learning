//SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import  "./AutomationCompatibleInterface.sol";
contract AutomationDemo is AutomationCompatibleInterface {
    uint256 public constant SIZE = 100;
    uint256 public constant INITIAL_BALANCE = 1000;

    uint256[SIZE] public balances;


    constructor() {  
        for(uint256 i =0; i< SIZE; i++){
            balances[i] = INITIAL_BALANCE;
        }
      }

    function checkUpkeep(bytes calldata /*checkData*/) external view override returns (bool upkeepNeeded, bytes memory performData) {
             upkeepNeeded = false;
             uint256 counter =0;

              for(uint256 i =0; i< SIZE; i++){
            if(balances[i] < INITIAL_BALANCE){
                upkeepNeeded = true;
                counter++;
            }
        }

             uint256[] memory indexToUpdate = new uint256[](counter);
            uint256 indexCounter = 0;


         for(uint256 i =0; i< SIZE && !upkeepNeeded; i++){
            if(balances[i] < INITIAL_BALANCE){
                indexToUpdate[indexCounter] = i;
                indexCounter ++;
                upkeepNeeded = true;

            }
        }

        performData = abi.encode(indexToUpdate);
        return (upkeepNeeded, performData);
    }

    function performUpkeep(bytes calldata performData) external override {
        uint256[] memory indexToUpdate = abi.decode(performData,(uint256[])) ;

         for(uint256 i =0; i< indexToUpdate.length ; i++){
                 balances[indexToUpdate[i]] = INITIAL_BALANCE;
         }
    }

    function withdraw(uint256 amount, uint256[] memory indexes) public {

         for(uint256 i =0; i< indexes.length ; i++) {
             if(balances[i] < INITIAL_BALANCE){
             balances[indexes[i]] -= amount;
             }
        }
    }
}