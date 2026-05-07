import nodemailer from 'nodemailer'

// Configuration du service d'email avec Gmail
const getEmailTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL || '',
      pass: process.env.GMAIL_PASSWORD || ''
    }
  })
}

// Générer le HTML de la confirmation de commande
const generateOrderConfirmationHTML = (order) => {
  const itemsHTML = order.items
    .map(
      (item) => `
    <tr style="border-bottom: 1px solid #ddd;">
      <td style="padding: 12px; text-align: left;">${item.name}</td>
      <td style="padding: 12px; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px; text-align: right;">${item.price.toFixed(2)} DH</td>
      <td style="padding: 12px; text-align: right;">${(item.price * item.quantity).toFixed(2)} DH</td>
    </tr>
  `
    )
    .join('')

  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; background-color: #f9f9f9; padding: 20px; border-radius: 8px; }
        .header { background-color: #8B4513; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background-color: white; padding: 20px; }
        .order-info { margin: 20px 0; padding: 15px; background-color: #f0f0f0; border-left: 4px solid #8B4513; }
        .order-number { font-size: 18px; font-weight: bold; color: #8B4513; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background-color: #f0f0f0; padding: 12px; text-align: left; font-weight: bold; border-bottom: 2px solid #8B4513; }
        .total-row { font-weight: bold; font-size: 16px; background-color: #f9f9f9; }
        .footer { background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
        .thank-you { color: #8B4513; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🧣 TICOEUR - Confirmation de Commande</h1>
        </div>
        
        <div class="content">
          <p>Bonjour <strong>${order.customer.firstName} ${order.customer.lastName}</strong>,</p>
          
          <p class="thank-you">Merci pour votre achat ! Nous avons bien reçu votre commande.</p>
          
          <div class="order-info">
            <div class="order-number">Numéro de commande : #${order.id.substring(0, 8).toUpperCase()}</div>
            <p style="margin: 5px 0; font-size: 14px;">Date : ${new Date(order.createdAt).toLocaleDateString('fr-FR')}</p>
            <p style="margin: 5px 0; font-size: 14px;">Statut : <strong style="color: #ff9800;">En attente de traitement</strong></p>
          </div>
          
          <h3 style="color: #8B4513; margin-top: 20px;">Détails de la commande :</h3>
          <table>
            <thead>
              <tr>
                <th>Produit</th>
                <th>Quantité</th>
                <th>Prix Unit.</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
              <tr class="total-row">
                <td colspan="3" style="padding: 12px; text-align: right;">Sous-total :</td>
                <td style="padding: 12px; text-align: right;">${order.subtotal.toFixed(2)} DH</td>
              </tr>
              <tr class="total-row">
                <td colspan="3" style="padding: 12px; text-align: right;">Frais de livraison :</td>
                <td style="padding: 12px; text-align: right;">${order.shipping.toFixed(2)} DH</td>
              </tr>
              <tr style="background-color: #8B4513; color: white;">
                <td colspan="3" style="padding: 12px; text-align: right; font-size: 16px;">TOTAL :</td>
                <td style="padding: 12px; text-align: right; font-size: 16px;"><strong>${order.total.toFixed(2)} DH</strong></td>
              </tr>
            </tbody>
          </table>
          
          <h3 style="color: #8B4513;">Adresse de livraison :</h3>
          <div style="padding: 15px; background-color: #f0f0f0; border-radius: 4px;">
            <p style="margin: 5px 0;">${order.customer.address}</p>
            <p style="margin: 5px 0;">${order.customer.city} ${order.customer.zipCode}</p>
            <p style="margin: 5px 0;">${order.customer.country}</p>
            <p style="margin: 5px 0;">📞 ${order.customer.phone}</p>
          </div>
          
          <p style="margin-top: 20px; color: #666;">
            Vous recevrez un email de confirmation de livraison dès que votre commande sera en route.
            <br>
            Pour toute question, n'hésitez pas à nous contacter.
          </p>
        </div>
        
        <div class="footer">
          <p>© 2024 TICOEUR - Tous droits réservés</p>
          <p>Cet email contient des informations confidentielles</p>
        </div>
      </div>
    </body>
    </html>
  `
}

// Fonction principale pour envoyer l'email de confirmation
export const sendOrderConfirmationEmail = async (order) => {
  try {
    const transporter = getEmailTransporter()

    const mailOptions = {
      from: process.env.GMAIL_EMAIL || 'noreply@ticoeur.com',
      to: order.customer.email,
      subject: `🧣 Confirmation de commande TICOEUR - #${order.id.substring(0, 8).toUpperCase()}`,
      html: generateOrderConfirmationHTML(order),
      replyTo: process.env.GMAIL_EMAIL || 'support@ticoeur.com'
    }

    const info = await transporter.sendMail(mailOptions)
    console.log(`[EMAIL] Confirmation envoyée à ${order.customer.email}`, info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('[EMAIL ERROR] Erreur lors de l\'envoi de l\'email:', error)
    return { success: false, error: error.message }
  }
}

export default { sendOrderConfirmationEmail }
