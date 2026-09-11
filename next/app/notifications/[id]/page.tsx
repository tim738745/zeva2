import { getNotification } from "../lib/services";

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const args = await props.params;
  const notificationId = Number.parseInt(args.id, 10);
  const notification = await getNotification(notificationId);
};

export default Page;
