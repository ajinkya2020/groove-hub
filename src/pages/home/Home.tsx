import { Button, Group, Stepper } from "@mantine/core";
import { useState } from "react";
import styles from "./Home.module.scss";

const Home = () => {
  const [active, setActive] = useState(1);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
  
  return (
    <>
      <Stepper className={styles.demoClass} active={active} onStepClick={setActive}>
        <Stepper.Step label="Select Source" description="Select a source platform">
          Step 1 content: Create an account
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          Step 3 content: Get full access
        </Stepper.Step>
      </Stepper>
      
      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>Back</Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </>
  );
};

export default Home;
