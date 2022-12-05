import { fromHex, toHex } from 'tron-format-address'
import { EMPTY_ADDRESS } from '../constants/common'
import { IAddress } from "@sweet_jet/types/src/interfaces/Address";

const ERROR_ADDRESS_NOT_DEFINED = 'Tried to get not defined address'

export class Address implements IAddress {
  protected _hexAddress: string | undefined
  protected _base58Address: string | undefined

  constructor(address: string = EMPTY_ADDRESS) {
    this.set(address)
  }

  public set(address: string = EMPTY_ADDRESS): void {
    if (address.startsWith('0x')) {
      this._hexAddress = address
    } else {
      this._base58Address = address
    }
  }

  public toString(): string {
    return this.toHex()
  }

  // if needed hex format, get stored or format it from base58 format and store for future
  public toHex(): string {
    if (this._hexAddress) {
      return this._hexAddress
    }
    if (!this._base58Address) {
      throw ERROR_ADDRESS_NOT_DEFINED
    }
    const hexAddress = toHex(this._base58Address)
    return (this._hexAddress = hexAddress)
  }

  // if needed base58 format, get stored or format it from hex format and store for future
  public toBase58(): string {
    if (this._base58Address) {
      return this._base58Address
    }
    if (!this._hexAddress) {
      throw ERROR_ADDRESS_NOT_DEFINED
    }
    const base58Address = fromHex(this._hexAddress)
    return (this._base58Address = base58Address)
  }
}