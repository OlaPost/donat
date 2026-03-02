interface Props {
  amount: number
  onNext: (message: string) => void
  onBack: () => void
}

export default function MessageScreen({ amount, onNext, onBack }: Props) {
  return (
    <div className="screen">
      <div className="screen-content">
        <button className="back-btn" onClick={onBack}>‹ Назад</button>

        <div className="hero">
          <div className="hero-icon">💬</div>
          <h1 className="hero-title">Сообщение автору</h1>
          <p className="hero-sub">Необязательно, но приятно</p>
        </div>

        <textarea
          className="message-input"
          placeholder="Напиши что-нибудь — или просто жми «Далее»"
          maxLength={300}
          autoFocus
          id="msg"
        />
        <p className="amount-badge">Сумма: {amount} ₽</p>
      </div>

      <div className="screen-footer">
        <button
          className="btn-primary"
          onClick={() => {
            const el = document.getElementById('msg') as HTMLTextAreaElement
            onNext(el?.value ?? '')
          }}
        >
          Далее
        </button>
      </div>
    </div>
  )
}
