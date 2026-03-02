import { useState } from 'react'
import type { DonationData } from '../App'

interface Props {
  donation: DonationData
  onPay: () => void
  onBack: () => void
}

declare const window: Window & {
  Telegram?: { WebApp?: { openInvoice?: (url: string, cb: (status: string) => void) => void } }
}

export default function PayScreen({ donation, onPay, onBack }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handlePay() {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: donation.amount, message: donation.message }),
      })
      const data = await res.json()

      if (!res.ok || !data.invoiceLink) {
        throw new Error('Не удалось создать платёж')
      }

      window.Telegram?.WebApp?.openInvoice?.(data.invoiceLink, (status) => {
        if (status === 'paid') onPay()
        setLoading(false)
      })
    } catch {
      setError('Ошибка при создании платежа. Попробуйте ещё раз.')
      setLoading(false)
    }
  }

  return (
    <div className="screen">
      <div className="screen-content">
        <button className="back-btn" onClick={onBack}>‹ Назад</button>

        <div className="hero">
          <div className="hero-icon">💳</div>
          <h1 className="hero-title">Оплата</h1>
        </div>

        <div className="summary-card">
          <div className="summary-row">
            <span>Сумма</span>
            <span className="summary-value">{donation.amount} ₽</span>
          </div>
          {donation.message && (
            <div className="summary-row summary-message">
              <span>Сообщение</span>
              <span className="summary-value">«{donation.message}»</span>
            </div>
          )}
        </div>

        {error && <p className="pay-note" style={{ color: '#FF453A' }}>{error}</p>}
      </div>

      <div className="screen-footer">
        <button className="btn-primary" onClick={handlePay} disabled={loading}>
          {loading ? 'Подождите...' : `Оплатить ${donation.amount} ₽`}
        </button>
      </div>
    </div>
  )
}
