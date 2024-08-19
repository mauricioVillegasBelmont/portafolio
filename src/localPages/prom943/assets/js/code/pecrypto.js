/**
 * PymEngine formatter for CryptoJS
 * @link https://pymeweb.mx
 * @version 1.0.0
 */

var PECrypto = {
  /**
   * Encrypt any value
   * @param {*} value
   * @param {string} password
   * @return {string}
   */
  'encrypt': function (value, password) {
    return CryptoJS.AES.encrypt(JSON.stringify(value), password, { format: PECrypto }).toString()
  },
  /**
   * Decrypt a previously encrypted value
   * @param {string} jsonStr
   * @param {string} password
   * @return {*}
   */
  'decrypt': function (jsonStr, password) {
    return JSON.parse(CryptoJS.AES.decrypt(jsonStr, password, { format: PECrypto }).toString(CryptoJS.enc.Utf8))
  },
  /**
   * Stringify cryptojs data
   * @param {Object} cipherParams
   * @return {string}
   */
  'stringify': function (cipherParams) {
    var j = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) }
    if (cipherParams.iv) j.iv = cipherParams.iv.toString()
    if (cipherParams.salt) j.s = cipherParams.salt.toString()
    return JSON.stringify(j).replace(/\s/g, '')
  },
  /**
   * Parse cryptojs data
   * @param {string} jsonStr
   * @return {*}
   */
  'parse': function (jsonStr) {
    var j = JSON.parse(jsonStr)
    var cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext: CryptoJS.enc.Base64.parse(j.ct) })
    if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv)
    if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s)
    return cipherParams
  }
}