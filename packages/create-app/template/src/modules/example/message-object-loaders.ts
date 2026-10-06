import type { LoadContext, ObjectPreviewData } from '@open-mercato/shared/modules/messages/types'
import { loadTodoPreview } from './lib/messageObjectPreviews'

export const messageObjectLoaders: Record<string, (entityId: string, ctx: LoadContext) => Promise<ObjectPreviewData>> = {
  'example:todo': loadTodoPreview,
}

export default messageObjectLoaders
