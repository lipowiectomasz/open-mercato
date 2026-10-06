import type { LoadContext, ObjectPreviewData } from '@open-mercato/shared/modules/messages/types'
import { loadInboxEmailPreview } from './lib/messageObjectPreviews'

export const messageObjectLoaders: Record<string, (entityId: string, ctx: LoadContext) => Promise<ObjectPreviewData>> = {
  'inbox_ops:inbox_email': async (entityId, ctx) => {
    try {
      return await loadInboxEmailPreview(entityId, ctx)
    } catch {
      return { title: 'Inbox Email', subtitle: entityId }
    }
  },
}

export default messageObjectLoaders
