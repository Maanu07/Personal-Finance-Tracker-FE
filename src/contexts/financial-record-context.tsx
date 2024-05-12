import { useUser } from "@clerk/clerk-react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export interface FinancialRecord {
  _id?: string;
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

interface FinancialRecordContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void;
  updateRecord: (id: string, record: FinancialRecord) => void;
  deleteRecord: (id: string) => void;
}

const origin = "https://personal-finance-tracker-be.onrender.com";

export const FinancialRecordContext = createContext<
  FinancialRecordContextType | undefined
>(undefined);

export const FinancialRecordProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const { user } = useUser();

  useEffect(() => {
    // fetch all records initially
    const fetchRecords = async () => {
      try {
        const res = await fetch(
          `${origin}/financial-records/getAllByUserId/${user?.id}`
        );
        const data = await res.json();
        setRecords(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (user?.id) {
      fetchRecords();
    }
  }, [user]);

  const addRecord = async (record: FinancialRecord) => {
    // add record to the DB
    try {
      const res = await fetch(`${origin}/financial-records`, {
        method: "POST",
        body: JSON.stringify(record),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      setRecords((prev) => [...prev, result]);
      toast("Record added successfully!", {
        type: "success",
      });
    } catch (error) {
      toast("Failed to add new record!", {
        type: "error",
      });
      console.log(error);
    }
  };

  const updateRecord = async (id: string, record: FinancialRecord) => {
    // update record in the DB
    try {
      const res = await fetch(`${origin}/financial-records/${id}`, {
        method: "PUT",
        body: JSON.stringify(record),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      setRecords((prev) => [
        ...prev.filter((record) => record._id !== id),
        result,
      ]);
      toast("Record updated successfully!", {
        type: "success",
      });
    } catch (error) {
      toast("Oops, some error occured in updating the record!", {
        type: "error",
      });
      console.log(error);
    }
  };

  const deleteRecord = async (id: string) => {
    // delete record in the DB
    try {
      const res = await fetch(`${origin}/financial-records/${id}`, {
        method: "DELETE",
      });
      const deletedRecord = await res.json();
      setRecords((prev) =>
        prev.filter((record) => record._id !== deletedRecord._id)
      );
      toast("Record deleted successfully!", {
        type: "error",
      });
    } catch (error) {
      toast("Oops, some error occured in deleting the record!", {
        type: "error",
      });
      console.log(error);
    }
  };

  return (
    <FinancialRecordContext.Provider
      value={{ records, addRecord, updateRecord, deleteRecord }}
    >
      {children}
    </FinancialRecordContext.Provider>
  );
};

export const useFinancialRecords = () => {
  const context = useContext<FinancialRecordContextType | undefined>(
    FinancialRecordContext
  );

  if (!context) {
    throw new Error(
      "useFinancialRecord can be used within FinancialRecordProvider only"
    );
  }
  return context;
};
