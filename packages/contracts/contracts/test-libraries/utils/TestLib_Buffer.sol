// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/* Library Imports */
import {Lib_Buffer} from '../../libraries/utils/Lib_Buffer.sol';

/**
 * @title TestLib_Buffer
 */
contract TestLib_Buffer {
  using Lib_Buffer for Lib_Buffer.Buffer;

  Lib_Buffer.Buffer internal buf;

  function push(bytes32 _value, bytes27 _extraData) public {
    buf.push(_value, _extraData);
  }

  function get(uint256 _index) public view returns (bytes32) {
    return buf.get(_index);
  }

  function deleteElementsAfterInclusive(uint40 _index) public {
    return buf.deleteElementsAfterInclusive(_index);
  }

  function deleteElementsAfterInclusive(uint40 _index, bytes27 _extraData)
    public
  {
    return buf.deleteElementsAfterInclusive(_index, _extraData);
  }

  function getLength() public view returns (uint40) {
    return buf.getLength();
  }

  function setExtraData(bytes27 _extraData) public {
    return buf.setExtraData(_extraData);
  }

  function getExtraData() public view returns (bytes27) {
    return buf.getExtraData();
  }
}
