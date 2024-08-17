import SourceSelection from "@/components/source-selection/SourceSelection";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Group, Stepper } from "@mantine/core";
import { useState } from "react";
import styles from "./Home.module.scss";

const Home = () => {
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper
        className={styles.demoClass}
        active={active}
        onStepClick={setActive}
      >
        <Stepper.Step
          label="Select Source"
          description="Select a source platform."
        >
          <div className="mt-10">
            <SourceSelection />
          </div>
        </Stepper.Step>
        <Stepper.Step
          label="Select Destination"
          description="Select a destination platform."
        >
          Step 2 content: Verify email
        </Stepper.Step>
        <Stepper.Step
          label="Transfer Tracks"
          description="Select Playlists & Tracks to transfer."
        >
          Step 3 content: Get full access
        </Stepper.Step>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          <div>
            <FontAwesomeIcon className="me-1" icon={faChevronLeft} />
            Back
          </div>
        </Button>
      </Group>
    </>
  );
};

export default Home;
