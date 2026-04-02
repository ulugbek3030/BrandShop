import { NextRequest, NextResponse } from 'next/server';
import { verifyCallback, type ClickCallbackData } from '@/lib/click-uz';

// Click.uz sends URL-encoded form data via POST.
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const data: ClickCallbackData = {
      click_trans_id: formData.get('click_trans_id')?.toString() ?? '',
      service_id: formData.get('service_id')?.toString() ?? '',
      click_paydoc_id: formData.get('click_paydoc_id')?.toString() ?? '',
      merchant_trans_id: formData.get('merchant_trans_id')?.toString() ?? '',
      merchant_prepare_id:
        formData.get('merchant_prepare_id')?.toString() ?? '',
      amount: formData.get('amount')?.toString() ?? '',
      action: formData.get('action')?.toString() ?? '',
      error: formData.get('error')?.toString() ?? '',
      error_note: formData.get('error_note')?.toString() ?? '',
      sign_time: formData.get('sign_time')?.toString() ?? '',
      sign_string: formData.get('sign_string')?.toString() ?? '',
    };

    // ---- signature verification ---------------------------------------------
    const secretKey = process.env.CLICK_SECRET_KEY;
    if (!secretKey) {
      console.error('[payment/callback] CLICK_SECRET_KEY is not set');
      return NextResponse.json(
        { error: -1, error_note: 'Server configuration error' },
        { status: 500 },
      );
    }

    const isValid = verifyCallback(data, secretKey);
    if (!isValid) {
      return NextResponse.json({
        error: -1,
        error_note: 'Invalid signature',
      });
    }

    // ---- action: prepare (action === "0") -----------------------------------
    if (data.action === '0') {
      // Validate that the order exists and the amount matches.
      // TODO: fetch order from DB and compare amounts.
      const orderId = data.merchant_trans_id;

      // For now we accept the prepare request and return a prepare ID.
      // In production this should be a real DB-generated ID.
      const merchantPrepareId = Date.now().toString();

      // TODO: update order status to "processing" in DB

      return NextResponse.json({
        click_trans_id: data.click_trans_id,
        merchant_trans_id: orderId,
        merchant_prepare_id: merchantPrepareId,
        error: 0,
        error_note: 'Success',
      });
    }

    // ---- action: complete (action === "1") ----------------------------------
    if (data.action === '1') {
      const orderId = data.merchant_trans_id;

      if (data.error === '0') {
        // Payment successful
        // TODO: update order status to "processing" and store click_trans_id
        console.log(
          `[payment/callback] Payment completed for order ${orderId}`,
        );
      } else {
        // Payment failed or cancelled
        // TODO: update order status to "cancelled"
        console.log(
          `[payment/callback] Payment failed for order ${orderId}: ${data.error_note}`,
        );
      }

      return NextResponse.json({
        click_trans_id: data.click_trans_id,
        merchant_trans_id: orderId,
        merchant_confirm_id: data.merchant_prepare_id,
        error: 0,
        error_note: 'Success',
      });
    }

    // Unknown action
    return NextResponse.json({
      error: -3,
      error_note: 'Unknown action',
    });
  } catch (error) {
    console.error('[payment/callback] Error:', error);
    return NextResponse.json(
      { error: -1, error_note: 'Internal server error' },
      { status: 500 },
    );
  }
}
