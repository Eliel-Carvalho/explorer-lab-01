import "./css/index.css"
import IMask from 'imask'

const ccBgColor01 = document.querySelector('.cc-bg svg > g g:nth-child(1) path')
const ccBgColor02 = document.querySelector('.cc-bg svg > g g:nth-child(2) path')
const ccLogo = document.querySelector('.cc-logo span:nth-child(2) img')

function setCardType(type) {
  const color = {
    visa: ['#2D57F2', '#436D99'],
    mastercard: ['#C69347', '#DF6F29'],
    default: ['black', 'gray'],
  }

  ccBgColor01.setAttribute('fill', color[type][0])
  ccBgColor02.setAttribute('fill', color[type][1])
  ccLogo.setAttribute('src', `cc-${type}.svg`)

}
globalThis.setCardType = setCardType

const securityCode = document.querySelector('#security-code')
const securityCodePattern = {
  mask: '0000'
}
const securityMasked = IMask(securityCode, securityCodePattern)

const expirationDate = document.querySelector('#expiration-date')
const expirationDatePattern = {
  mask: 'MM{/}YY',
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().geFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  }
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)