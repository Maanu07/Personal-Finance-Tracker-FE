// We will break our Dashboard comp into 2 components :
// 1. Add New Finance Form
// 2. Finance List

import { useUser } from "@clerk/clerk-react";

import FinancialRecordForm from "./financial-record-form";
import FinancialRecordList from "./financial-record-list";
import "./financial-record.css";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { useMemo } from "react";

const Dashboard = () => {
  const { user } = useUser();
  const { records } = useFinancialRecords();

  const totalMonthly = useMemo(() => {
    return records.reduce((accum, record) => record.amount + accum, 0);
  }, [records]);

  return (
    <div className="dashboard-container">
      <h1>Welcome {user?.firstName}! Here Are Your Finances:</h1>
      <FinancialRecordForm />
      <div>
        Total Monthly: <b>₹{totalMonthly}</b>
      </div>
      <FinancialRecordList />
    </div>
  );
};

export default Dashboard;
