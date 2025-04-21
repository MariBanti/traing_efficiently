export interface Task {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
  isDescriptionShow: boolean;
  deadlineDate: Date;
  priority: number;
}
