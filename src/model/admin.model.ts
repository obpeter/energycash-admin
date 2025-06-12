
export interface AdminUpdateData {
  tenant: string,
  participantId: string,
  meteringPoint: string,
  value: Record<string, string>,
}