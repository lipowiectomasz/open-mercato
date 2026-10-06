import type { LoadContext, ObjectPreviewData } from '@open-mercato/shared/modules/messages/types'
import {
  loadCustomerPersonPreview,
  loadCustomerCompanyPreview,
  loadCustomerDealPreview,
} from './lib/messageObjectPreviews'

export const messageObjectLoaders: Record<string, (entityId: string, ctx: LoadContext) => Promise<ObjectPreviewData>> = {
  'customers:person': loadCustomerPersonPreview,
  'customers:company': loadCustomerCompanyPreview,
  'customers:deal': loadCustomerDealPreview,
}

export default messageObjectLoaders
