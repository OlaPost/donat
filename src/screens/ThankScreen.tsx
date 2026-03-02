import type { DonationData } from '../App'

interface Props {
  donation: DonationData
  onReset: () => void
}

export default function ThankScreen({ donation, onReset }: Props) {
  // Закрываем TMA если запущены внутри Telegram
  const tg = (window as any).Telegram?.WebApp
  if (tg) {
    setTimeout(() => tg.close(), 3000)
  }

  return (
    <div className="screen screen-center">
      <div className="screen-content thank-content">
        <div className="thank-icon">🎉</div>
        <h1 className="thank-title">Спасибо!</h1>
        <p className="thank-amount">{donation.amount} ₽ — получено</p>
        {donation.message && (
          <p className="thank-message">«{donation.message}»</p>
        )}
        <p className="thank-sub">Это очень важно для автора ❤️</p>
      </div>

      <div className="screen-footer">
        <button className="btn-secondary" onClick={onReset}>
          Поддержать ещё раз
        </button>
      </div>
    </div>
  )
}
