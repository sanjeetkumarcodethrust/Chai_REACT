import { useState,useEffect } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState()

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const swap = () => {
  const temp = from
  setFrom(to)
  setTo(temp)
}
  

 const convert = () => {
  if (!currencyInfo || !currencyInfo[to]) return
  setConvertedAmount(amount * currencyInfo[to])
}
useEffect(() => {
  if (currencyInfo[to]) {
    setConvertedAmount(amount * currencyInfo[to])
  }
}, [amount, from, to, currencyInfo])

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/32156544/pexels-photo-32156544.jpeg')`,
      }}
    >
      <div className="w-full max-w-md mx-auto border border-gray-300 rounded-lg p-5 backdrop-blur-sm bg-white/30">
        
        <form onSubmit={(e) => {
          e.preventDefault()
          convert()
        }}>

          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setFrom(currency)}   // ✅ FIXED
            selectCurrency={from}
            onAmountChange={(amount) => setAmount(amount)}
          />

          <div className="relative w-full h-0.5 my-3">
            <button
              type="button"
              onClick={swap}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-md"
            >
              Swap
            </button>
          </div>

          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setTo(currency)}
            selectCurrency={to}   // ✅ FIXED
            amountDisable
          />

          <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg mt-4">
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>

        </form>
      </div>
    </div>
  )
}

export default App