import type { LoadContext, ObjectPreviewData } from '@open-mercato/shared/modules/messages/types'

type Loader = (entityId: string, ctx: LoadContext) => Promise<ObjectPreviewData>

const registry = new Map<string, Loader>()

export function registerMessageObjectLoaders(loaders: Record<string, Loader>): void {
  for (const [key, loader] of Object.entries(loaders)) {
    registry.set(key, loader)
  }
}

export function getMessageObjectLoader(module: string, entityType: string): Loader | undefined {
  return registry.get(`${module}:${entityType}`)
}
