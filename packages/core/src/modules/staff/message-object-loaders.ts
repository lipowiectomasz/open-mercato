import type { LoadContext, ObjectPreviewData } from '@open-mercato/shared/modules/messages/types'
import {
  loadLeaveRequestPreview,
  loadTeamPreview,
  loadTeamMemberPreview,
  loadStaffTeamRolePreview,
  loadStaffAvailabilityPreview,
} from './lib/messageObjectPreviews'

export const messageObjectLoaders: Record<string, (entityId: string, ctx: LoadContext) => Promise<ObjectPreviewData>> = {
  'staff:leave_request': loadLeaveRequestPreview,
  'staff:team': loadTeamPreview,
  'staff:team_member': loadTeamMemberPreview,
  'staff:team_role': loadStaffTeamRolePreview,
  'staff:my_availability': loadStaffAvailabilityPreview,
}

export default messageObjectLoaders
