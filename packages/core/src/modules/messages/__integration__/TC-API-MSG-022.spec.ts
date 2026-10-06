import { expect, test } from '@playwright/test';
import { apiRequest, getAuthToken } from '@open-mercato/core/modules/core/__integration__/helpers/api';
import { createPersonFixture, deleteEntityIfExists } from '@open-mercato/core/helpers/integration/crmFixtures';
import { composeMessageWithToken, decodeJwtSubject, deleteMessageIfExists } from './helpers';

/**
 * TC-API-MSG-022: Linked Object Preview Resolves Real Data
 * Surface: packages/core/src/modules/messages/api/[id]/route.ts (GET)
 *
 * A message composed with a linked object (customers:person) must resolve a
 * real preview (title === the person's actual displayName) via the
 * server-only message-object-loaders registry, not a null/placeholder value.
 */
test.describe('TC-API-MSG-022: Linked Object Preview Resolves Real Data', () => {
  test('should resolve the real person preview for a linked message object', async ({ request }) => {
    let adminToken: string | null = null;
    let personId: string | null = null;
    let messageId: string | null = null;

    try {
      adminToken = await getAuthToken(request, 'admin');
      const superadminToken = await getAuthToken(request, 'superadmin');
      const superadminUserId = decodeJwtSubject(superadminToken);

      const timestamp = Date.now();
      const displayName = `QA Object Preview ${timestamp}`;

      personId = await createPersonFixture(request, adminToken, {
        firstName: 'QA',
        lastName: `ObjectPreview${timestamp}`,
        displayName,
      });

      messageId = await composeMessageWithToken(request, adminToken, {
        recipients: [{ userId: superadminUserId, type: 'to' }],
        subject: `QA TC-API-MSG-022 ${timestamp}`,
        body: 'Linked object preview check',
        sendViaEmail: false,
        objects: [{ entityModule: 'customers', entityType: 'person', entityId: personId }],
      });

      const detail = await apiRequest(request, 'GET', `/api/messages/${messageId}`, {
        token: adminToken,
      });
      expect(detail.status()).toBe(200);
      const body = (await detail.json()) as {
        objects?: Array<{ entityId?: string; preview?: { title?: string } | null }>;
      };

      expect(Array.isArray(body.objects)).toBe(true);
      const linked = body.objects?.find((item) => item.entityId === personId);
      expect(linked).toBeTruthy();
      expect(linked?.preview).toBeTruthy();
      expect(linked?.preview?.title).toBe(displayName);
    } finally {
      await deleteMessageIfExists(request, adminToken, messageId);
      await deleteEntityIfExists(request, adminToken, '/api/customers/people', personId);
    }
  });
});
