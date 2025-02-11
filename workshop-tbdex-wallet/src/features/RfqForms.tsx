import { Offering } from '@tbdex/http-client'
import { RfqAddressPage } from './RfqAddressPage'
import { PayinPage } from './RfqPayinPage'
import { ReviewPage } from './RfqReviewPage'

export enum RfqFormIds {
  Payin = 'payin',
  BtcAddress = 'btcAddress',
  Review = 'review',
}

/**
 * This function generates an array of RFQ (Request for Quote) form objects based on the selected offering.
 *
 * @param {Function} handleNext - A function to handle the "Next" action.
 * @param {Function} handleBack - A function to handle the "Back" action.
 * @returns {Array} - An array of RFQ form objects, each containing a title and a component.
 */
export const getRfqForms = (offering: Offering, handleNext, handleBack) => {

  return [
    {
      title: '',
      component: (
        <PayinPage onNext={handleNext} />
      ),
      id: RfqFormIds.Payin
    },
    {
      title: 'Enter delivery details',
      component: (
        <RfqAddressPage
          schema={offering.data.payout.methods[0].requiredPaymentDetails}
          onBack={handleBack}
          onNext={handleNext}
        />
      ),
      id: RfqFormIds.BtcAddress
    },
    {
      title: 'Review your request',
      component: <ReviewPage onBack={handleBack} onSubmit={handleNext} />,
      id: RfqFormIds.Review
    }
  ]
}
