import { getIsoYmdString } from "@/app/lib/utils/date";
import { CreditApplicationWithOrg } from "../data";
import { CreditApplicationStatus } from "@/prisma/generated/client";
import {
  getEnumsToStringsMap,
  statusTransformer,
} from "@/app/lib/utils/enumMaps";

export const ApplicationDetails = async (props: {
  application: CreditApplicationWithOrg;
  userIsGov: boolean;
}) => {
  let status = props.application.status;
  if (!props.userIsGov) {
    status = props.application.supplierStatus;
  }
  const statusMap = getEnumsToStringsMap<CreditApplicationStatus>(
    CreditApplicationStatus,
    statusTransformer,
  );
  return (
    <>
      <div>Supplier: {props.application.organization.name}</div>
      <div>Date: {getIsoYmdString(props.application.submissionTimestamp)}</div>
      <div>Status: {statusMap[status]}</div>
    </>
  );
};
