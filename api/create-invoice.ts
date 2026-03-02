export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { amount, message } = req.body

  if (!amount || amount < 1) {
    return res.status(400).json({ error: 'Invalid amount' })
  }

  const response = await fetch(
    `https://api.telegram.org/bot${process.env.BOT_TOKEN}/createInvoiceLink`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Донат автору',
        description: message?.trim() || 'Поддержка автора',
        payload: JSON.stringify({ amount, message: message || '' }),
        currency: 'RUB',
        prices: [{ label: 'Донат', amount: amount * 100 }], // в копейках
        provider_token: process.env.YUKASSA_TOKEN,
      }),
    }
  )

  const data = await response.json()

  if (!data.ok) {
    console.error('Telegram API error:', data)
    return res.status(500).json({ error: 'Failed to create invoice' })
  }

  res.json({ invoiceLink: data.result })
}
