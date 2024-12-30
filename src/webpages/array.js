import React, { Fragment, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { TableHead } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { Heap } from "heap-js";

export default function CashFlowManager() {
  const [numParticipants, setNumParticipants] = useState(0);
  const [participantNames, setParticipantNames] = useState([]);
  const [cashFlowTable, setCashFlowTable] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Update participant names
  const updateParticipantName = (index, value) => {
    const updatedNames = [...participantNames];
    updatedNames[index] = value || `Person ${index + 1}`;
    setParticipantNames(updatedNames);
  };

  // Update cash flow table
  const updateCashFlow = (row, col, value) => {
    const updatedTable = [...cashFlowTable];
    if (!updatedTable[row]) updatedTable[row] = [];
    updatedTable[row][col] = parseInt(value) || 0;
    setCashFlowTable(updatedTable);
  };

  // Calculate net balances
  const calculateBalances = () => {
    const balances = Array(numParticipants).fill(0);
    for (let i = 0; i < numParticipants; i++) {
      for (let j = 0; j < numParticipants; j++) {
        balances[i] += (cashFlowTable[j]?.[i] || 0); // Incoming
        balances[i] -= (cashFlowTable[i]?.[j] || 0); // Outgoing
      }
    }
    return balances;
  };

  // Minimize transactions using heaps
  const minimizeTransactions = () => {
    const balances = calculateBalances();
    const creditors = new Heap((a, b) => b[1] - a[1]); // Max heap
    const debtors = new Heap((a, b) => a[1] - b[1]); // Min heap

    // Add creditors and debtors to heaps
    for (let i = 0; i < balances.length; i++) {
      if (balances[i] > 0) creditors.push([i, balances[i]]);
      else if (balances[i] < 0) debtors.push([i, balances[i]]);
    }

    const newTransactions = [];
    while (!creditors.isEmpty() && !debtors.isEmpty()) {
      const [creditor, creditAmount] = creditors.pop();
      const [debtor, debitAmount] = debtors.pop();

      const settledAmount = Math.min(creditAmount, -debitAmount);

      newTransactions.push(
        `${participantNames[debtor] || `Person ${debtor + 1}`} pays ${settledAmount} to ${
          participantNames[creditor] || `Person ${creditor + 1}`
        }`
      );

      // Update balances
      if (creditAmount > settledAmount)
        creditors.push([creditor, creditAmount - settledAmount]);
      if (-debitAmount > settledAmount)
        debtors.push([debtor, debitAmount + settledAmount]);
    }

    setTransactions(newTransactions);
  };

  return (
    <Fragment>
      <div style={{ padding: "20px" }}>
        <h2>Cash Flow Manager</h2>

        {/* Input number of participants */}
        <div style={{ marginBottom: "20px" }}>
          <TextField
            label="Number of Participants"
            type="number"
            variant="outlined"
            onChange={(e) => {
              const count = parseInt(e.target.value) || 0;
              setNumParticipants(count);
              setParticipantNames(Array(count).fill(""));
              setCashFlowTable([]);
              setTransactions([]);
            }}
          />
        </div>

        {/* Input participant names */}
        {Array.from({ length: numParticipants }).map((_, index) => (
          <TextField
            key={index}
            label={`Participant ${index + 1} Name`}
            variant="outlined"
            style={{ marginBottom: "10px", display: "block" }}
            onChange={(e) => updateParticipantName(index, e.target.value)}
          />
        ))}

        {/* Input cash flow table */}
        <TableContainer component={Paper} style={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Participant</TableCell>
                {Array.from({ length: numParticipants }).map((_, index) => (
                  <TableCell key={index}>
                    {participantNames[index] || `Person ${index + 1}`}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: numParticipants }).map((_, row) => (
                <TableRow key={row}>
                  <TableCell>{participantNames[row] || `Person ${row + 1}`}</TableCell>
                  {Array.from({ length: numParticipants }).map((_, col) => (
                    <TableCell key={col}>
                      {row === col ? (
                        <TextField
                          value={0}
                          disabled
                          variant="outlined"
                          style={{ backgroundColor: "#f5f5f5" }}
                        />
                      ) : (
                        <TextField
                          type="number"
                          variant="outlined"
                          onChange={(e) => updateCashFlow(row, col, e.target.value)}
                        />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Calculate transactions */}
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#1e90ff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={minimizeTransactions}
        >
          Calculate
        </button>

        {/* Display transactions */}
        {transactions.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h3>Transactions:</h3>
            {transactions.map((transaction, index) => (
              <p key={index}>{transaction}</p>
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
}
