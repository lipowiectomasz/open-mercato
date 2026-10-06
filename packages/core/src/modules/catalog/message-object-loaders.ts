import type { LoadContext, ObjectPreviewData } from '@open-mercato/shared/modules/messages/types'
import {
  loadCatalogProductPreview,
  loadCatalogVariantPreview,
  loadCatalogCategoryPreview,
} from './lib/messageObjectPreviews'

export const messageObjectLoaders: Record<string, (entityId: string, ctx: LoadContext) => Promise<ObjectPreviewData>> = {
  'catalog:product': loadCatalogProductPreview,
  'catalog:variant': loadCatalogVariantPreview,
  'catalog:category': loadCatalogCategoryPreview,
}

export default messageObjectLoaders
