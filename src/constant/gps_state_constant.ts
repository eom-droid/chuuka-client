export const GPS_STATUS = {
  STOP: 0,
  LOADING: 1,
  RUNNING: 2,
} as const;
export type GPS_STATUS_TYPE = typeof GPS_STATUS[keyof typeof GPS_STATUS];
