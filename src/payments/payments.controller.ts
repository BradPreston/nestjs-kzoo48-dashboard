import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';

type PaymentRequestBody = {
  data: {
    object: {
      id: string;
      amount: number;
      receipt_url: string;
      paid: boolean;
      billing_details: {
        name: string;
        email: string;
      };
    };
  };
  type: string;
};

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post()
  async create(@Body() paymentRequestBody: PaymentRequestBody) {
    return this.paymentsService.create(paymentRequestBody);
  }
}
