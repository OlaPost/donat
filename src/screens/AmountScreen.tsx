import { useState } from 'react'

const PRESETS = [50, 100, 200, 500, 1000]

interface Props {
  onNext: (amount: number) => void
}

export default function AmountScreen({ onNext }: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const [custom, setCustom] = useState('')

  const amount = selected ?? (custom ? parseInt(custom) : 0)
  const canProceed = amount >= 1

  const handleCustomChange = (val: string) => {
    const digits = val.replace(/\D/g, '')
    setCustom(digits)
    setSelected(null)
  }

  const handlePreset = (p: number) => {
    setSelected(p)
    setCustom('')
  }

  return (
    <div className="screen">
      <div className="screen-content">
        <div className="hero">
          <div className="hero-icon">☕</div>
          <h1 className="hero-title">Поддержать автора</h1>
          <p className="hero-sub">Выбери сумму или введи свою</p>
        </div>

        <div className="presets">
          {PRESETS.map(p => (
            <button
              key={p}
              className={`preset-btn${selected === p ? ' active' : ''}`}
              onClick={() => handlePreset(p)}
            >
              {p} ₽
            </button>
          ))}
        </div>

        <div className="custom-input-wrap">
          <input
            className="custom-input"
            type="number"
            inputMode="numeric"
            placeholder="Своя сумма, ₽"
            value={custom}
            onChange={e => handleCustomChange(e.target.value)}
          />
        </div>
      </div>

      <div className="screen-footer">
        <button
          className="btn-primary"
          disabled={!canProceed}
          onClick={() => onNext(amount)}
        >
          Далее — {canProceed ? `${amount} ₽` : 'выбери сумму'}
        </button>
      </div>
    </div>
  )
}
