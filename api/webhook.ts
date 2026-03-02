async function sendMessage(chatId: string, text: string) {
  await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  })
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = req.body

  // Telegram требует подтвердить pre_checkout_query в течение 10 секунд
  if (body.pre_checkout_query) {
    const { id } = body.pre_checkout_query
    await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/answerPreCheckoutQuery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pre_checkout_query_id: id, ok: true }),
    })
    return res.json({ ok: true })
  }

  // Успешная оплата — уведомить автора
  if (body.message?.successful_payment) {
    const payment = body.message.successful_payment
    const amountRub = payment.total_amount / 100

    let donorMessage = ''
    try {
      const payload = JSON.parse(payment.invoice_payload)
      donorMessage = payload.message || ''
    } catch {}

    const text = donorMessage
      ? `💰 Новый донат: ${amountRub} ₽\n💬 ${donorMessage}`
      : `💰 Новый донат: ${amountRub} ₽`

    await sendMessage(process.env.AUTHOR_CHAT_ID!, text)
  }

  res.json({ ok: true })
}
