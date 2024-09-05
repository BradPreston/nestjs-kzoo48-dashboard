import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async create(paymentRequestBody: PaymentRequestBody) {
    try {
      // destructure the request body
      const { id, amount, receipt_url, paid, billing_details } =
        paymentRequestBody.data.object;
      // if the charge is updated (final step in stripe checkout)
      if (paymentRequestBody.type === 'charge.updated') {
        // insert the payment if new, otherwise update the payment
        return await this.prisma.payment.upsert({
          where: { entryEmail: billing_details.email },
          update: {
            eventId: id,
            entryName: billing_details.name,
            entryEmail: billing_details.email,
            paid: paid,
            orderAmount: amount,
            receiptUrl: receipt_url,
          },
          create: {
            eventId: id,
            entryName: billing_details.name,
            entryEmail: billing_details.email,
            paid: paid,
            orderAmount: amount,
            receiptUrl: receipt_url,
          },
        });
      }
    } catch (err) {
      // TODO: throw a proper error
      throw new BadRequestException(err.message);
    }
  }
}
