import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useContext } from "react";
import { AuthContext } from "../../../Auth/AuthContext";

const Accordion2 = () => {
  const { theme } = useContext(AuthContext);
  return (
    <div className="space-y-4 p-4 rounded-lg">
      <SectionTitle Title={"Frequently Asked Questions ? "} />
      {/* accordion one */}
      <Accordion
        sx={{
          backgroundColor: theme === "light" ? "white" : "#1F2937",
          color: theme === "light" ? "#000000" : "#ffffff",
        }}
      >
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span" className="font-semibold">
            What is the Micro Tasking and Earning Platform?
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="text-gray-600">
          This platform allows users to complete small tasks and earn coins,
          which can be withdrawn as rewards. It also enables buyers to create
          tasks and manage payments, with admin oversight for seamless
          operations.
        </AccordionDetails>
      </Accordion>
      {/* accordion two */}
      <Accordion
        sx={{
          backgroundColor: theme === "light" ? "white" : "#1F2937",
          color: theme === "light" ? "#000000" : "#ffffff",
        }}
      >
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span" className="font-semibold">
            Who can join the platform?
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="text-gray-600">
          Anyone can join as a Worker, Buyer, or Admin, depending on their role
          and purpose. Workers complete tasks, Buyers create tasks, and Admins
          manage the platform.
        </AccordionDetails>
      </Accordion>
      {/* accordion three */}
      <Accordion
        sx={{
          backgroundColor: theme === "light" ? "white" : "#1F2937",
          color: theme === "light" ? "#000000" : "#ffffff",
        }}
      >
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography component="span" className="font-semibold">
            How do Workers earn coins?
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="text-gray-600">
          Workers earn coins by completing tasks created by Buyers. Once a task
          is completed and approved, the Worker receives the designated reward
          in coins.
        </AccordionDetails>
      </Accordion>
      {/* accordion four */}
      <Accordion
        sx={{
          backgroundColor: theme === "light" ? "white" : "#1F2937",
          color: theme === "light" ? "#000000" : "#ffffff",
        }}
      >
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          <Typography component="span" className="font-semibold">
            Can Workers withdraw their earnings?
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="text-gray-600">
          Yes, Workers can request withdrawals once they meet the platform1`s
          minimum coin withdrawal threshold.
        </AccordionDetails>
      </Accordion>
      {/* accordion five */}
      <Accordion
        sx={{
          backgroundColor: theme === "light" ? "white" : "#1F2937",
          color: theme === "light" ? "#000000" : "#ffffff",
        }}
      >
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          aria-controls="panel5-content"
          id="panel5-header"
        >
          <Typography component="span" className="font-semibold">
            How do Buyers create tasks?
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="text-gray-600">
          Buyers can create tasks by providing detailed instructions, setting
          rewards, and specifying requirements. Tasks can then be published for
          Workers to complete.
        </AccordionDetails>
      </Accordion>
      {/* accordion six */}
      <Accordion
        sx={{
          backgroundColor: theme === "light" ? "white" : "#1F2937",
          color: theme === "light" ? "#000000" : "#ffffff",
        }}
      >
        <AccordionSummary
          expandIcon={<MdExpandMore />}
          aria-controls="panel6-content"
          id="panel6-header"
        >
          <Typography component="span" className="font-semibold">
            How does the platform ensure task quality?
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="text-gray-600">
          Buyers review submissions before approving them. They can also report
          issues if tasks are not completed as per instructions.
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Accordion2;
