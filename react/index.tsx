import { canUseDOM } from 'vtex.render-runtime'

export interface Order {
  visitorContactInfo: string[]
  transactionId: string
  transactionTotal: number,
  transactionProducts: ProductOrder[]
}

interface ProductOrder {
  sku: string,
}

function addPixelImage(order: Order) {
  const merchantId = window.__shareasale_merchant_id
  const transtype = window.__shareasale_transtype

  if (!merchantId || !transtype) {
    return
  }

  const total = order.transactionProducts
  const orderId = order.transactionId

  const img = document.createElement('img')
  const url = `https://shareasale.com/sale.cfm?amount=${total}&tracking=${orderId}&transtype=${transtype}&merchantID=${merchantId}`

  img.setAttribute('width', '1')
  img.setAttribute('height', '1')
  img.setAttribute('src', url)

  document.body.appendChild(img)
}

function handleMessages(e: any) {
  switch (e.data.eventName) {
    case 'vtex:orderPlaced': {
      const order = e.data as Order
      addPixelImage(order)
      break
    }
    default:
      break
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleMessages)
}
