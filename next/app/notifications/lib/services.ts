import { prisma } from "@/lib/prisma";
import {
  SerializedNotificationFull,
  SerializedNotificationSparse,
} from "./constants";
import {
  serializeNotificationFull,
  serializeNotificationSparse,
} from "./utilsServer";
import { InAppNotificationStatus } from "@/prisma/generated/enums";

// expect at most 25 notifications per year; over 20 years, that's 500;
// therefore, no need for pagination
// intended for gov users
export const getNotifications = async (): Promise<
  SerializedNotificationSparse[]
> => {
  const notifications = await prisma.inAppNotification.findMany({
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      inAppNotificationOrganizations: {
        select: {
          organization: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
  return notifications.map((n) => {
    return serializeNotificationSparse(n);
  });
};

// intended for gov users
export const getNotification = async (
  notificationId: number,
): Promise<SerializedNotificationFull | null> => {
  const notification = await prisma.inAppNotification.findUnique({
    where: {
      id: notificationId,
    },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      inAppNotificationOrganizations: {
        select: {
          organization: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });
  if (!notification) {
    return null;
  }
  return serializeNotificationFull(notification);
};

// intended for supplier users
export const getActiveNotifications = async (orgId: number) => {
  const notifications = await prisma.inAppNotification.findMany({
    where: {
      status: InAppNotificationStatus.ACTIVE,
      inAppNotificationOrganizations: {
        some: {
          organizationId: orgId,
        },
      },
    },
    select: {
      type: true,
      title: true,
      message: true,
    },
  });
  return notifications;
};
