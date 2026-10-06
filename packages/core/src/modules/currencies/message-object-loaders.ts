import type { LoadContext, ObjectPreviewData } from '@open-mercato/shared/modules/messages/types'
import { loadCurrencyPreview } from './lib/messageObjectPreviews'

export const messageObjectLoaders: Record<string, (entityId: string, ctx: LoadContext) => Promise<ObjectPreviewData>> = {
  'currencies:currency': loadCurrencyPreview,
}

export default messageObjectLoaders
