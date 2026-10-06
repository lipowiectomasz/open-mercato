import type { LoadContext, ObjectPreviewData } from '@open-mercato/shared/modules/messages/types'
import {
  loadSalesOrderPreview,
  loadSalesQuotePreview,
  loadSalesChannelPreview,
} from './lib/messageObjectPreviews'

export const messageObjectLoaders: Record<string, (entityId: string, ctx: LoadContext) => Promise<ObjectPreviewData>> = {
  'sales:order': loadSalesOrderPreview,
  'sales:quote': loadSalesQuotePreview,
  'sales:channel': loadSalesChannelPreview,
}

export default messageObjectLoaders
