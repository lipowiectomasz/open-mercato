import type { LoadContext, ObjectPreviewData } from '@open-mercato/shared/modules/messages/types'
import { loadResourcePreview } from './lib/messageObjectPreviews'

export const messageObjectLoaders: Record<string, (entityId: string, ctx: LoadContext) => Promise<ObjectPreviewData>> = {
  'resources:resource': loadResourcePreview,
}

export default messageObjectLoaders
