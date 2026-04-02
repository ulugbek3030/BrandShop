import crypto from 'crypto';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ClickPaymentRequest {
  serviceId: string;
  merchantId: string;
  amount: number;
  transactionParam: string; // orderId
  returnUrl: string;
  merchantUserId?: string;
}

export interface ClickPaymentResponse {
  paymentUrl: string;
  orderId: string;
  amount: number;
}

export interface ClickCallbackData {
  click_trans_id: string;
  service_id: string;
  click_paydoc_id: string;
  merchant_trans_id: string; // orderId
  merchant_prepare_id?: string;
  amount: string;
  action: string; // "0" = prepare, "1" = complete
  error: string;
  error_note: string;
  sign_time: string;
  sign_string: string;
}

// ---------------------------------------------------------------------------
// Payment URL generator
// ---------------------------------------------------------------------------

/**
 * Builds a Click.uz payment redirect URL.
 *
 * Required env vars:
 *   CLICK_MERCHANT_ID
 *   CLICK_SERVICE_ID
 *   CLICK_MERCHANT_USER_ID
 */
export function createPayment(
  orderId: string,
  amount: number,
  returnUrl: string,
): ClickPaymentResponse {
  const merchantId = process.env.CLICK_MERCHANT_ID;
  const serviceId = process.env.CLICK_SERVICE_ID;

  if (!merchantId || !serviceId) {
    throw new Error(
      'Missing Click.uz configuration. Set CLICK_MERCHANT_ID and CLICK_SERVICE_ID env vars.',
    );
  }

  const params = new URLSearchParams({
    service_id: serviceId,
    merchant_id: merchantId,
    amount: amount.toFixed(2),
    transaction_param: orderId,
    return_url: returnUrl,
  });

  const merchantUserId = process.env.CLICK_MERCHANT_USER_ID;
  if (merchantUserId) {
    params.set('merchant_user_id', merchantUserId);
  }

  const paymentUrl = `https://my.click.uz/services/pay?${params.toString()}`;

  return { paymentUrl, orderId, amount };
}

// ---------------------------------------------------------------------------
// Callback signature verification
// ---------------------------------------------------------------------------

/**
 * Verifies the MD5 signature sent by Click.uz in a webhook callback.
 *
 * The expected signature is:
 *   MD5( click_trans_id + service_id + SECRET_KEY + merchant_trans_id
 *        + (merchant_prepare_id if action=1) + amount + action + sign_time )
 */
export function verifyCallback(
  data: ClickCallbackData,
  signKey: string,
): boolean {
  const parts: string[] = [
    data.click_trans_id,
    data.service_id,
    signKey,
    data.merchant_trans_id,
  ];

  // For the "complete" action (action === "1") the merchant_prepare_id is part
  // of the signature string.
  if (data.action === '1' && data.merchant_prepare_id) {
    parts.push(data.merchant_prepare_id);
  }

  parts.push(data.amount, data.action, data.sign_time);

  const expectedSign = crypto
    .createHash('md5')
    .update(parts.join(''))
    .digest('hex');

  return expectedSign === data.sign_string;
}
