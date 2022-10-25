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
const securityCodeMasked = IMask(securityCode, securityCodePattern)

const ExpirationDate = document.querySelector('#expiration-date')
const ExpirationDatePattern = {
  mask:'MM{/}YY',
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String (new Date().getFullYear()).slice(2),
      to : String(new Date().getFullYear() + 10).slice(2)
    },
  },
}
const ExpirationDateMasked = IMask(ExpirationDate, ExpirationDatePattern)

const CardNumber = document.querySelector('#card-number')
const CardNumberPattern = {
  mask: [
    {
      mask: '0000 0000 0000 0000',
      regex: /^4\d{0,15}/,
      cardtype: 'visa'
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2}\d{0,12})/,
      cardtype: 'mastercard'
    },
    {
      mask: '0000 0000 0000 0000',
      cardtype: 'default'
    },
  ],

  dispatch: function(appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, '');
    const foundMask = dynamicMasked.compiledMasks.find(function(item) {
      return number.match(item.regex)
    })
    return foundMask
  },
}
const CardNumberMasked = IMask(CardNumber, CardNumberPattern)

const addButton = document.querySelector('#add-card')
addButton.addEventListener('click', () => {
  alert('Cartão adicionado')
})

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault()
})

const CardHolder = document.querySelector('#card-holder')
CardHolder.addEventListener('input', () => {
  const ccHolder = document.querySelector('.cc-holder .value')
  ccHolder.innerText = CardHolder.value.length === 0 ?  "FULANO DA SILVA" : CardHolder.value
})

securityCodeMasked.on('accept', () => {
  updateSecurityCode(securityCodeMasked.value)
})

function updateSecurityCode(code){
  const ccSecurity = document.querySelector('.cc-security .value')
  ccSecurity.innerText = code.length === 0 ? '123' : code
}

CardNumberMasked.on('accept', () => {
  const cardtype = CardNumberMasked.masked.currentMask.cardtype
  setCardType(cardtype)
  updateCardCode(CardNumberMasked.value)
})

function updateCardCode(number){
  const ccNumber= document.querySelector('.cc-number')
  ccNumber.innerText = number.length === 0 ? '1234 5678 9012 3456' : number
}

ExpirationDateMasked.on('accept', () => {
  updateExpirationData(ExpirationDateMasked.value)
})

function updateExpirationData(date){
  const ccExpiration = document.querySelector('.cc-extra .value')
  ccExpiration.innerText = date.lenght === 0 ? '02/32' : date
}

