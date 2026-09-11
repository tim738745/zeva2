import { getUserInfo } from "@/auth";
import { getNotification } from "../../lib/services";
import { Role } from "@/prisma/generated/enums";

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const { userRoles } = await getUserInfo();
  if (!userRoles.includes(Role.ZEVA_IDIR_USER)) {
    return null;
  }
  const args = await props.params;
  const notificationId = Number.parseInt(args.id, 10);
  const notification = await getNotification(notificationId);
};

export default Page;
