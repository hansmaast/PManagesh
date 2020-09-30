import { statusColor } from "../colors";

export const getStatusColor = status => {
  switch (status.toLowerCase()) {
    case 'done':
      return  statusColor.done;
    case 'not started':
      return statusColor.notStarted;
    case 'in progress':
      return  statusColor.inProgress;
    default:
      return statusColor.notStarted;
  }
}