type TrialStatus = {
  isInTrial: boolean;
  daysLeft: number;
};
export function checkTrialStatus(createdAt: string | Date): TrialStatus {
  const createdDate = new Date(createdAt);
  const now = new Date();

  const diffInMs = now.getTime() - createdDate.getTime();
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

  const trialDays = 30;
  const daysLeft = Math.max(0, trialDays - diffInDays);
  const isInTrial = daysLeft > 0;

  return {
    isInTrial,
    daysLeft,
  };
}
