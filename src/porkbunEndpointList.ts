import { accountApiSettingsGetEndpoint } from "./account/endpoint/accountApiSettingsGetEndpoint.js"
import { accountAutoTopupGetEndpoint } from "./account/endpoint/accountAutoTopupGetEndpoint.js"
import { accountAutoTopupSetEndpoint } from "./account/endpoint/accountAutoTopupSetEndpoint.js"
import { accountBalanceGetEndpoint } from "./account/endpoint/accountBalanceGetEndpoint.js"
import { accountEmailVerificationConfirmEndpoint } from "./account/endpoint/accountEmailVerificationConfirmEndpoint.js"
import { accountEmailVerificationSendEndpoint } from "./account/endpoint/accountEmailVerificationSendEndpoint.js"
import { accountInviteCreateEndpoint } from "./account/endpoint/accountInviteCreateEndpoint.js"
import { accountInviteStatusGetEndpoint } from "./account/endpoint/accountInviteStatusGetEndpoint.js"
import { accountInvoiceGetEndpoint } from "./account/endpoint/accountInvoiceGetEndpoint.js"
import { accountInvoiceListEndpoint } from "./account/endpoint/accountInvoiceListEndpoint.js"
import { accountInvoicePdfGetEndpoint } from "./account/endpoint/accountInvoicePdfGetEndpoint.js"
import { accountPhoneVerificationConfirmEndpoint } from "./account/endpoint/accountPhoneVerificationConfirmEndpoint.js"
import { accountPhoneVerificationSendEndpoint } from "./account/endpoint/accountPhoneVerificationSendEndpoint.js"
import { accountTopupCryptoEndpoint } from "./account/endpoint/accountTopupCryptoEndpoint.js"
import { accountTopupCryptoStatusGetEndpoint } from "./account/endpoint/accountTopupCryptoStatusGetEndpoint.js"
import { accountTopupEndpoint } from "./account/endpoint/accountTopupEndpoint.js"
import { accountTopupMppEndpoint } from "./account/endpoint/accountTopupMppEndpoint.js"
import { apiKeyRequestEndpoint } from "./apiKey/endpoint/apiKeyRequestEndpoint.js"
import { apiKeyRetrieveEndpoint } from "./apiKey/endpoint/apiKeyRetrieveEndpoint.js"
import { apiKeyRevokeEndpoint } from "./apiKey/endpoint/apiKeyRevokeEndpoint.js"
import { cloudflareConnectEndpoint } from "./cloudflare/endpoint/cloudflareConnectEndpoint.js"
import { cloudflareConnectionGetEndpoint } from "./cloudflare/endpoint/cloudflareConnectionGetEndpoint.js"
import { cloudflareDisconnectEndpoint } from "./cloudflare/endpoint/cloudflareDisconnectEndpoint.js"
import { cloudflareInventoryListEndpoint } from "./cloudflare/endpoint/cloudflareInventoryListEndpoint.js"
import { cloudflareMoveGetEndpoint } from "./cloudflare/endpoint/cloudflareMoveGetEndpoint.js"
import { cloudflareMovePreviewEndpoint } from "./cloudflare/endpoint/cloudflareMovePreviewEndpoint.js"
import { cloudflareMoveRetryEndpoint } from "./cloudflare/endpoint/cloudflareMoveRetryEndpoint.js"
import { cloudflareMoveRollbackEndpoint } from "./cloudflare/endpoint/cloudflareMoveRollbackEndpoint.js"
import { cloudflareProxySetEndpoint } from "./cloudflare/endpoint/cloudflareProxySetEndpoint.js"
import { cloudflareQueueListEndpoint } from "./cloudflare/endpoint/cloudflareQueueListEndpoint.js"
import { cloudflareRecordCreateEndpoint } from "./cloudflare/endpoint/cloudflareRecordCreateEndpoint.js"
import { cloudflareRecordDeleteEndpoint } from "./cloudflare/endpoint/cloudflareRecordDeleteEndpoint.js"
import { cloudflareRecordEditEndpoint } from "./cloudflare/endpoint/cloudflareRecordEditEndpoint.js"
import { cloudflareRecordListEndpoint } from "./cloudflare/endpoint/cloudflareRecordListEndpoint.js"
import { cloudflareZoneGetEndpoint } from "./cloudflare/endpoint/cloudflareZoneGetEndpoint.js"
import { cloudflareZoneSettingsGetEndpoint } from "./cloudflare/endpoint/cloudflareZoneSettingsGetEndpoint.js"
import { cloudflareZoneSettingsSetEndpoint } from "./cloudflare/endpoint/cloudflareZoneSettingsSetEndpoint.js"
import { dnsHistoryDiffEndpoint } from "./dns/endpoint/dnsHistoryDiffEndpoint.js"
import { dnsHistoryListEndpoint } from "./dns/endpoint/dnsHistoryListEndpoint.js"
import { dnsHistoryRestoreEndpoint } from "./dns/endpoint/dnsHistoryRestoreEndpoint.js"
import { dnsImportEndpoint } from "./dns/endpoint/dnsImportEndpoint.js"
import { dnsPreflightEndpoint } from "./dns/endpoint/dnsPreflightEndpoint.js"
import { dnsRecordCreateEndpoint } from "./dns/endpoint/dnsRecordCreateEndpoint.js"
import { dnsRecordDeleteByNameTypeEndpoint } from "./dns/endpoint/dnsRecordDeleteByNameTypeEndpoint.js"
import { dnsRecordDeleteEndpoint } from "./dns/endpoint/dnsRecordDeleteEndpoint.js"
import { dnsRecordEditByNameTypeEndpoint } from "./dns/endpoint/dnsRecordEditByNameTypeEndpoint.js"
import { dnsRecordEditEndpoint } from "./dns/endpoint/dnsRecordEditEndpoint.js"
import { dnsRecordGetEndpoint } from "./dns/endpoint/dnsRecordGetEndpoint.js"
import { dnsRecordListByNameTypeEndpoint } from "./dns/endpoint/dnsRecordListByNameTypeEndpoint.js"
import { dnsRecordListEndpoint } from "./dns/endpoint/dnsRecordListEndpoint.js"
import { dnsScanEndpoint } from "./dns/endpoint/dnsScanEndpoint.js"
import { dnssecRecordCreateEndpoint } from "./dnssec/endpoint/dnssecRecordCreateEndpoint.js"
import { dnssecRecordDeleteEndpoint } from "./dnssec/endpoint/dnssecRecordDeleteEndpoint.js"
import { dnssecRecordListEndpoint } from "./dnssec/endpoint/dnssecRecordListEndpoint.js"
import { domainAutoRenewUpdateEndpoint } from "./domain/endpoint/domainAutoRenewUpdateEndpoint.js"
import { domainCheckBulkEndpoint } from "./domain/endpoint/domainCheckBulkEndpoint.js"
import { domainCheckEndpoint } from "./domain/endpoint/domainCheckEndpoint.js"
import { domainContactListEndpoint } from "./domain/endpoint/domainContactListEndpoint.js"
import { domainContactUpdateEndpoint } from "./domain/endpoint/domainContactUpdateEndpoint.js"
import { domainCreateEndpoint } from "./domain/endpoint/domainCreateEndpoint.js"
import { domainGetEndpoint } from "./domain/endpoint/domainGetEndpoint.js"
import { domainListEndpoint } from "./domain/endpoint/domainListEndpoint.js"
import { domainNameserverListEndpoint } from "./domain/endpoint/domainNameserverListEndpoint.js"
import { domainNameserverUpdateEndpoint } from "./domain/endpoint/domainNameserverUpdateEndpoint.js"
import { domainRegistrationRequirementsGetEndpoint } from "./domain/endpoint/domainRegistrationRequirementsGetEndpoint.js"
import { domainRenewEndpoint } from "./domain/endpoint/domainRenewEndpoint.js"
import { emailForwardCreateEndpoint } from "./email/endpoint/emailForwardCreateEndpoint.js"
import { emailForwardDeleteEndpoint } from "./email/endpoint/emailForwardDeleteEndpoint.js"
import { emailForwardListEndpoint } from "./email/endpoint/emailForwardListEndpoint.js"
import { emailMailboxCreateEndpoint } from "./email/endpoint/emailMailboxCreateEndpoint.js"
import { emailMailboxListEndpoint } from "./email/endpoint/emailMailboxListEndpoint.js"
import { emailMailboxRenewEndpoint } from "./email/endpoint/emailMailboxRenewEndpoint.js"
import { emailMailboxSetupEndpoint } from "./email/endpoint/emailMailboxSetupEndpoint.js"
import { emailPasswordSetEndpoint } from "./email/endpoint/emailPasswordSetEndpoint.js"
import { glueCreateEndpoint } from "./glue/endpoint/glueCreateEndpoint.js"
import { glueDeleteEndpoint } from "./glue/endpoint/glueDeleteEndpoint.js"
import { glueListEndpoint } from "./glue/endpoint/glueListEndpoint.js"
import { glueUpdateEndpoint } from "./glue/endpoint/glueUpdateEndpoint.js"
import { hostingAutoRenewUpdateEndpoint } from "./hosting/endpoint/hostingAutoRenewUpdateEndpoint.js"
import { hostingBackupCreateEndpoint } from "./hosting/endpoint/hostingBackupCreateEndpoint.js"
import { hostingBackupDeleteEndpoint } from "./hosting/endpoint/hostingBackupDeleteEndpoint.js"
import { hostingBackupListEndpoint } from "./hosting/endpoint/hostingBackupListEndpoint.js"
import { hostingBackupRestoreEndpoint } from "./hosting/endpoint/hostingBackupRestoreEndpoint.js"
import { hostingCreateEndpoint } from "./hosting/endpoint/hostingCreateEndpoint.js"
import { hostingDeleteEndpoint } from "./hosting/endpoint/hostingDeleteEndpoint.js"
import { hostingDirCreateEndpoint } from "./hosting/endpoint/hostingDirCreateEndpoint.js"
import { hostingFileDeleteEndpoint } from "./hosting/endpoint/hostingFileDeleteEndpoint.js"
import { hostingFileDeployEndpoint } from "./hosting/endpoint/hostingFileDeployEndpoint.js"
import { hostingFileListEndpoint } from "./hosting/endpoint/hostingFileListEndpoint.js"
import { hostingGetEndpoint } from "./hosting/endpoint/hostingGetEndpoint.js"
import { hostingPhpVersionSetEndpoint } from "./hosting/endpoint/hostingPhpVersionSetEndpoint.js"
import { hostingPlanListEndpoint } from "./hosting/endpoint/hostingPlanListEndpoint.js"
import { hostingSearchVisibilitySetEndpoint } from "./hosting/endpoint/hostingSearchVisibilitySetEndpoint.js"
import { hostingSslReissueEndpoint } from "./hosting/endpoint/hostingSslReissueEndpoint.js"
import { hostingStagingCreateEndpoint } from "./hosting/endpoint/hostingStagingCreateEndpoint.js"
import { hostingStagingDeleteEndpoint } from "./hosting/endpoint/hostingStagingDeleteEndpoint.js"
import { hostingStagingEnvironmentSetEndpoint } from "./hosting/endpoint/hostingStagingEnvironmentSetEndpoint.js"
import { hostingStagingGateSetEndpoint } from "./hosting/endpoint/hostingStagingGateSetEndpoint.js"
import { hostingStagingGetEndpoint } from "./hosting/endpoint/hostingStagingGetEndpoint.js"
import { hostingStagingGuardSetEndpoint } from "./hosting/endpoint/hostingStagingGuardSetEndpoint.js"
import { hostingStagingPublishEndpoint } from "./hosting/endpoint/hostingStagingPublishEndpoint.js"
import { hostingStagingResetEndpoint } from "./hosting/endpoint/hostingStagingResetEndpoint.js"
import { hostingWordPressVersionSetEndpoint } from "./hosting/endpoint/hostingWordPressVersionSetEndpoint.js"
import { hostingWpCredentialCreateEndpoint } from "./hosting/endpoint/hostingWpCredentialCreateEndpoint.js"
import { hostingWpCredentialDeleteEndpoint } from "./hosting/endpoint/hostingWpCredentialDeleteEndpoint.js"
import { hostingWpCredentialListEndpoint } from "./hosting/endpoint/hostingWpCredentialListEndpoint.js"
import { linkInBioAppearanceUpdateEndpoint } from "./linkInBio/endpoint/linkInBioAppearanceUpdateEndpoint.js"
import { linkInBioCreateEndpoint } from "./linkInBio/endpoint/linkInBioCreateEndpoint.js"
import { linkInBioGetEndpoint } from "./linkInBio/endpoint/linkInBioGetEndpoint.js"
import { linkInBioLinkCreateEndpoint } from "./linkInBio/endpoint/linkInBioLinkCreateEndpoint.js"
import { linkInBioLinkDeleteEndpoint } from "./linkInBio/endpoint/linkInBioLinkDeleteEndpoint.js"
import { linkInBioLinkEditEndpoint } from "./linkInBio/endpoint/linkInBioLinkEditEndpoint.js"
import { linkInBioLinkReorderEndpoint } from "./linkInBio/endpoint/linkInBioLinkReorderEndpoint.js"
import { linkInBioProfileUpdateEndpoint } from "./linkInBio/endpoint/linkInBioProfileUpdateEndpoint.js"
import { linkInBioSettingsUpdateEndpoint } from "./linkInBio/endpoint/linkInBioSettingsUpdateEndpoint.js"
import { linkInBioSocialsUpdateEndpoint } from "./linkInBio/endpoint/linkInBioSocialsUpdateEndpoint.js"
import { aftermarketSearchEndpoint } from "./market/endpoint/aftermarketSearchEndpoint.js"
import { closeoutBuyEndpoint } from "./market/endpoint/closeoutBuyEndpoint.js"
import { closeoutGetEndpoint } from "./market/endpoint/closeoutGetEndpoint.js"
import { closeoutSearchEndpoint } from "./market/endpoint/closeoutSearchEndpoint.js"
import { marketplaceListEndpoint } from "./market/endpoint/marketplaceListEndpoint.js"
import { mockEndpointCallEndpoint } from "./mock/endpoint/mockEndpointCallEndpoint.js"
import { mockEndpointListEndpoint } from "./mock/endpoint/mockEndpointListEndpoint.js"
import { pricingGetEndpoint } from "./pricing/endpoint/pricingGetEndpoint.js"
import { sandboxResetEndpoint } from "./sandbox/endpoint/sandboxResetEndpoint.js"
import { sandboxTopupEndpoint } from "./sandbox/endpoint/sandboxTopupEndpoint.js"
import { sandboxWebhookTriggerEndpoint } from "./sandbox/endpoint/sandboxWebhookTriggerEndpoint.js"
import { sslBundleGetEndpoint } from "./ssl/endpoint/sslBundleGetEndpoint.js"
import { transferAuthCodeUpdateEndpoint } from "./transfer/endpoint/transferAuthCodeUpdateEndpoint.js"
import { transferCancelEndpoint } from "./transfer/endpoint/transferCancelEndpoint.js"
import { transferCreateEndpoint } from "./transfer/endpoint/transferCreateEndpoint.js"
import { transferGetEndpoint } from "./transfer/endpoint/transferGetEndpoint.js"
import { transferListEndpoint } from "./transfer/endpoint/transferListEndpoint.js"
import { transferPrepareEndpoint } from "./transfer/endpoint/transferPrepareEndpoint.js"
import { transferSetupGetEndpoint } from "./transfer/endpoint/transferSetupGetEndpoint.js"
import { transferStartEndpoint } from "./transfer/endpoint/transferStartEndpoint.js"
import { urlForwardCreateEndpoint } from "./urlForward/endpoint/urlForwardCreateEndpoint.js"
import { urlForwardDeleteEndpoint } from "./urlForward/endpoint/urlForwardDeleteEndpoint.js"
import { urlForwardListEndpoint } from "./urlForward/endpoint/urlForwardListEndpoint.js"
import { utilityIpEndpoint } from "./utility/endpoint/utilityIpEndpoint.js"
import { utilityPingEndpoint } from "./utility/endpoint/utilityPingEndpoint.js"
import { webhookCreateEndpoint } from "./webhook/endpoint/webhookCreateEndpoint.js"
import { webhookDeleteEndpoint } from "./webhook/endpoint/webhookDeleteEndpoint.js"
import { webhookDeliveryGetEndpoint } from "./webhook/endpoint/webhookDeliveryGetEndpoint.js"
import { webhookDeliveryListEndpoint } from "./webhook/endpoint/webhookDeliveryListEndpoint.js"
import { webhookDeliveryResendEndpoint } from "./webhook/endpoint/webhookDeliveryResendEndpoint.js"
import { webhookEventTypeListEndpoint } from "./webhook/endpoint/webhookEventTypeListEndpoint.js"
import { webhookGetEndpoint } from "./webhook/endpoint/webhookGetEndpoint.js"
import { webhookListEndpoint } from "./webhook/endpoint/webhookListEndpoint.js"
import { webhookSecretRotateEndpoint } from "./webhook/endpoint/webhookSecretRotateEndpoint.js"
import { webhookTestEndpoint } from "./webhook/endpoint/webhookTestEndpoint.js"
import { webhookUpdateEndpoint } from "./webhook/endpoint/webhookUpdateEndpoint.js"

/** All implemented API operations, including one representative per GET/POST mirror. */
export const porkbunEndpointList = [
  accountApiSettingsGetEndpoint,
  accountAutoTopupGetEndpoint,
  accountAutoTopupSetEndpoint,
  accountBalanceGetEndpoint,
  accountEmailVerificationConfirmEndpoint,
  accountEmailVerificationSendEndpoint,
  accountInviteCreateEndpoint,
  accountInviteStatusGetEndpoint,
  accountInvoiceGetEndpoint,
  accountInvoiceListEndpoint,
  accountInvoicePdfGetEndpoint,
  accountPhoneVerificationConfirmEndpoint,
  accountPhoneVerificationSendEndpoint,
  accountTopupCryptoEndpoint,
  accountTopupCryptoStatusGetEndpoint,
  accountTopupEndpoint,
  accountTopupMppEndpoint,
  aftermarketSearchEndpoint,
  apiKeyRequestEndpoint,
  apiKeyRetrieveEndpoint,
  apiKeyRevokeEndpoint,
  closeoutBuyEndpoint,
  closeoutGetEndpoint,
  closeoutSearchEndpoint,
  cloudflareConnectEndpoint,
  cloudflareConnectionGetEndpoint,
  cloudflareDisconnectEndpoint,
  cloudflareInventoryListEndpoint,
  cloudflareMoveGetEndpoint,
  cloudflareMovePreviewEndpoint,
  cloudflareMoveRetryEndpoint,
  cloudflareMoveRollbackEndpoint,
  cloudflareProxySetEndpoint,
  cloudflareQueueListEndpoint,
  cloudflareRecordCreateEndpoint,
  cloudflareRecordDeleteEndpoint,
  cloudflareRecordEditEndpoint,
  cloudflareRecordListEndpoint,
  cloudflareZoneGetEndpoint,
  cloudflareZoneSettingsGetEndpoint,
  cloudflareZoneSettingsSetEndpoint,
  dnsHistoryDiffEndpoint,
  dnsHistoryListEndpoint,
  dnsHistoryRestoreEndpoint,
  dnsImportEndpoint,
  dnsPreflightEndpoint,
  dnsRecordCreateEndpoint,
  dnsRecordDeleteByNameTypeEndpoint,
  dnsRecordDeleteEndpoint,
  dnsRecordEditByNameTypeEndpoint,
  dnsRecordEditEndpoint,
  dnsRecordGetEndpoint,
  dnsRecordListByNameTypeEndpoint,
  dnsRecordListEndpoint,
  dnsScanEndpoint,
  dnssecRecordCreateEndpoint,
  dnssecRecordDeleteEndpoint,
  dnssecRecordListEndpoint,
  domainAutoRenewUpdateEndpoint,
  domainCheckBulkEndpoint,
  domainCheckEndpoint,
  domainContactListEndpoint,
  domainContactUpdateEndpoint,
  domainCreateEndpoint,
  domainGetEndpoint,
  domainListEndpoint,
  domainNameserverListEndpoint,
  domainNameserverUpdateEndpoint,
  domainRegistrationRequirementsGetEndpoint,
  domainRenewEndpoint,
  emailForwardCreateEndpoint,
  emailForwardDeleteEndpoint,
  emailForwardListEndpoint,
  emailMailboxCreateEndpoint,
  emailMailboxListEndpoint,
  emailMailboxRenewEndpoint,
  emailMailboxSetupEndpoint,
  emailPasswordSetEndpoint,
  glueCreateEndpoint,
  glueDeleteEndpoint,
  glueListEndpoint,
  glueUpdateEndpoint,
  hostingAutoRenewUpdateEndpoint,
  hostingBackupCreateEndpoint,
  hostingBackupDeleteEndpoint,
  hostingBackupListEndpoint,
  hostingBackupRestoreEndpoint,
  hostingCreateEndpoint,
  hostingDeleteEndpoint,
  hostingDirCreateEndpoint,
  hostingFileDeleteEndpoint,
  hostingFileDeployEndpoint,
  hostingFileListEndpoint,
  hostingGetEndpoint,
  hostingPhpVersionSetEndpoint,
  hostingPlanListEndpoint,
  hostingSearchVisibilitySetEndpoint,
  hostingSslReissueEndpoint,
  hostingStagingCreateEndpoint,
  hostingStagingDeleteEndpoint,
  hostingStagingEnvironmentSetEndpoint,
  hostingStagingGateSetEndpoint,
  hostingStagingGetEndpoint,
  hostingStagingGuardSetEndpoint,
  hostingStagingPublishEndpoint,
  hostingStagingResetEndpoint,
  hostingWordPressVersionSetEndpoint,
  hostingWpCredentialCreateEndpoint,
  hostingWpCredentialDeleteEndpoint,
  hostingWpCredentialListEndpoint,
  linkInBioAppearanceUpdateEndpoint,
  linkInBioCreateEndpoint,
  linkInBioGetEndpoint,
  linkInBioLinkCreateEndpoint,
  linkInBioLinkDeleteEndpoint,
  linkInBioLinkEditEndpoint,
  linkInBioLinkReorderEndpoint,
  linkInBioProfileUpdateEndpoint,
  linkInBioSettingsUpdateEndpoint,
  linkInBioSocialsUpdateEndpoint,
  marketplaceListEndpoint,
  mockEndpointCallEndpoint,
  mockEndpointListEndpoint,
  pricingGetEndpoint,
  sandboxResetEndpoint,
  sandboxTopupEndpoint,
  sandboxWebhookTriggerEndpoint,
  sslBundleGetEndpoint,
  transferAuthCodeUpdateEndpoint,
  transferCancelEndpoint,
  transferCreateEndpoint,
  transferGetEndpoint,
  transferListEndpoint,
  transferPrepareEndpoint,
  transferSetupGetEndpoint,
  transferStartEndpoint,
  urlForwardCreateEndpoint,
  urlForwardDeleteEndpoint,
  urlForwardListEndpoint,
  utilityIpEndpoint,
  utilityPingEndpoint,
  webhookCreateEndpoint,
  webhookDeleteEndpoint,
  webhookDeliveryGetEndpoint,
  webhookDeliveryListEndpoint,
  webhookDeliveryResendEndpoint,
  webhookEventTypeListEndpoint,
  webhookGetEndpoint,
  webhookListEndpoint,
  webhookSecretRotateEndpoint,
  webhookTestEndpoint,
  webhookUpdateEndpoint,
] as const
