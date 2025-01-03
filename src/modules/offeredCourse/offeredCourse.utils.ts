import { TDays } from './offeredCourse.interface';

export interface ISchedule {
  days: TDays[];
  startTime: string;
  endTime: string;
}

export const hasTimeConflict = (
  assignedSchedules: ISchedule[],
  newSchedule: ISchedule,
) => {
  for (const schedule of assignedSchedules) {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);
    const newStartingTime = new Date(`1970-01-01T${newSchedule.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);
    if (newStartingTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }
  return false;
};
