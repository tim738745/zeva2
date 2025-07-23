import {
  ModelYear,
  PenaltyCreditStatus,
  VehicleClass,
  ZevClass,
} from "@/prisma/generated/client";
import { getPenaltyCredit } from "../data";
import {
  getEnumsToStringsMap,
  lowerCaseAndCapitalize,
  modelYearsTransformer,
  statusTransformer,
  zevClassTransformer,
} from "@/app/lib/utils/enumMaps";

export const PenaltyCreditDetails = async (props: {
  penaltyCreditId: number;
}) => {
  const penaltyCredit = await getPenaltyCredit(props.penaltyCreditId);
  if (!penaltyCredit) {
    return null;
  }
  const modelYearsMap = getEnumsToStringsMap<ModelYear>(
    ModelYear,
    modelYearsTransformer,
  );
  const vehicleClassMap = getEnumsToStringsMap<VehicleClass>(
    VehicleClass,
    lowerCaseAndCapitalize,
  );
  const zevClassMap = getEnumsToStringsMap<ZevClass>(
    ZevClass,
    zevClassTransformer,
  );
  const statusMap = getEnumsToStringsMap<PenaltyCreditStatus>(
    PenaltyCreditStatus,
    statusTransformer,
  );
  return (
    <ul>
      <li key={"status"}>Status: {statusMap[penaltyCredit.status]}</li>
      <li key={"supplier"}>Supplier: {penaltyCredit.organization.name}</li>
      <li key={"complianceYear"}>
        Compliance Year: {modelYearsMap[penaltyCredit.complianceYear]}
      </li>
      <li key={"vehicleClass"}>
        Vehicle Class: {vehicleClassMap[penaltyCredit.vehicleClass]}
      </li>
      <li key={"zevClass"}>Zev Class: {zevClassMap[penaltyCredit.zevClass]}</li>
      <li key={"modelYear"}>
        Model Year: {modelYearsMap[penaltyCredit.modelYear]}
      </li>
      <li key={"numberOfUnits"}>
        Number of Units: {penaltyCredit.numberOfUnits.toString()}
      </li>
    </ul>
  );
};
