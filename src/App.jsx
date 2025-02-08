import { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyinfo'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-gradient-to-r from-blue-900 to-indigo-900 p-6">
      <div className="w-full max-w-lg mx-auto bg-white/20 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-white/30">
        <h1 className="text-center text-3xl font-semibold text-white mb-6">Currency Converter</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="w-full mb-4">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(amount) => setAmount(amount)}
            />
          </div>
          <div className="relative w-full flex justify-center my-3">
            <button
              type="button"
              className="border-2 border-white rounded-full bg-indigo-600 text-white px-5 py-2 font-medium hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
              onClick={swap}
            >
              ⬆️⬇️ Swap
            </button>
          </div>
          <div className="w-full mb-4">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white px-4 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-all duration-300"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;