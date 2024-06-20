// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/extensions/ERC4626.sol";

contract VaultStandard is ERC4626 {
    IERC20 public token;

    mapping(address => bool) isAdmin;

    constructor(IERC20 _asset) ERC4626(_asset) ERC20("Vault Digitrust Token","vDGT") {
        token = _asset;
        isAdmin[msg.sender] = true;
    }

    modifier onlyAdmin(){
        require(isAdmin[msg.sender] == true, "unauthorized admin address");
        _;
    }

    function set_token_adr(address _token) external onlyAdmin{
        token = IERC20(_token);
    }

    function deposit(uint256 amounts, address receiver) override public  returns(uint256){
        uint256 decimal = 1000000000000000000000000000000;
        IERC20(token).approve(address(this), amounts * decimal);

        uint256 maxAssets = maxDeposit(receiver);
        if (amounts > maxAssets) {
            revert ERC4626ExceededMaxDeposit(receiver, amounts, maxAssets);
        }

        uint256 shares = previewDeposit(amounts);
        _deposit(_msgSender(), receiver, amounts, shares);

        return shares;
    }
}
