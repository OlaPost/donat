import type { DonationData } from '../App'

interface Props {
  donation: DonationData
  onPay: () => void
  onBack: () => void
}

export default function PayScreen({ donation, onPay, onBack }: Props) {
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

        <p className="pay-note">
          Платёжная система будет подключена — пока это демо
        </p>
      </div>

      <div className="screen-footer">
        <button className="btn-primary" onClick={onPay}>
          Оплатить {donation.amount} ₽
        </button>
      </div>
    </div>
  )
}
