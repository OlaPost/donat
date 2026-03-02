import { useState } from 'react'
import './index.css'
import AmountScreen from './screens/AmountScreen'
import MessageScreen from './screens/MessageScreen'
import PayScreen from './screens/PayScreen'
import ThankScreen from './screens/ThankScreen'

type Screen = 'amount' | 'message' | 'pay' | 'thank'

export interface DonationData {
  amount: number
  message: string
}

function App() {
  const [screen, setScreen] = useState<Screen>('amount')
  const [donation, setDonation] = useState<DonationData>({ amount: 0, message: '' })

  const handleAmountNext = (amount: number) => {
    setDonation(d => ({ ...d, amount }))
    setScreen('message')
  }

  const handleMessageNext = (message: string) => {
    setDonation(d => ({ ...d, message }))
    setScreen('pay')
  }

  const handlePay = () => {
    setScreen('thank')
  }

  const handleBack = () => {
    if (screen === 'message') setScreen('amount')
    if (screen === 'pay') setScreen('message')
  }

  const handleReset = () => {
    setDonation({ amount: 0, message: '' })
    setScreen('amount')
  }

  return (
    <div className="app">
      {screen === 'amount' && (
        <AmountScreen onNext={handleAmountNext} />
      )}
      {screen === 'message' && (
        <MessageScreen
          amount={donation.amount}
          onNext={handleMessageNext}
          onBack={handleBack}
        />
      )}
      {screen === 'pay' && (
        <PayScreen
          donation={donation}
          onPay={handlePay}
          onBack={handleBack}
        />
      )}
      {screen === 'thank' && (
        <ThankScreen donation={donation} onReset={handleReset} />
      )}
    </div>
  )
}

export default App
