// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;

import '../../VaultStandard.sol';

/// @title Interface for WETH9
interface IVDGT is IERC20 {
    /// @notice Deposit ether to get vault DGT
    function deposit(uint256,msg.sender) external payable;

    /// @notice Withdraw vault DGT to get ether
    function redeem(uint256,msg.sender,msg.sender) external;
}
