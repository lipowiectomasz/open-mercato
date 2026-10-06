import { createBootstrap, isBootstrapped } from '@open-mercato/shared/lib/bootstrap'
import { register as registerAppDi } from '@/di'
import { serverFoundationBootstrapData } from '@/bootstrap-common'
import { messageObjectLoaders } from '@/.mercato/generated/message-object-loaders.generated'
import { registerMessageObjectLoaders } from '@open-mercato/core/modules/messages/lib/message-object-loaders-registry'

registerMessageObjectLoaders(messageObjectLoaders)

/** API-only bootstrap: keeps server injection tables but excludes UI registries. */
export const bootstrap = createBootstrap({
  ...serverFoundationBootstrapData,
  dashboardWidgetEntries: [],
  injectionWidgetEntries: [],
}, {
  appDiRegistrar: registerAppDi,
  registrationKey: 'api',
  skipUiRegistries: true,
  skipCoreInjectionWidgets: true,
})

export { isBootstrapped }
