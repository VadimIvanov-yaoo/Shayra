import { makeAutoObservable } from 'mobx'

export default class PartnerStore {
  constructor() {
    this._partner = {}
    makeAutoObservable(this)
  }

  updatePartnerField(field, value) {
    if (this._partner) {
      this._partner = { ...this._partner, [field]: value }
    }
  }

  setPartner(partner) {
    this._partner = partner
  }

  get partner() {
    return this._partner
  }
}
