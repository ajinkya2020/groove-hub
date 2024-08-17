import { faRadio } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Flex, Title } from "@mantine/core";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <Flex className="my-4 mx-8">
        <FontAwesomeIcon className="my-auto me-2" icon={faRadio} fontSize={18} />
        <Title order={4}>
          Groove Hood
        </Title>
      </Flex>
    </div>
  );
};

export default Header;
