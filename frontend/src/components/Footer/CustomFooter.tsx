import { Anchor, Flex, Footer, MediaQuery, Text } from "@mantine/core";
import { IconCopyright } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

export function CustomFooter() {
  const { t } = useTranslation();

  return (
    <Footer height={40} p="xs">
      <Flex
        justify={{ base: "center", sm: "space-between" }}
        direction="row"
        wrap="wrap"
      >
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Flex gap="xs" align="center" sx={{ marginLeft: "5px" }}>
            <IconCopyright size="12" />
            <Text size="xs">2023 Miłosz Wierucki</Text>
          </Flex>
        </MediaQuery>
        <MediaQuery largerThan="sm" styles={{ marginRight: "5px" }}>
          <Anchor
            size="sm"
            href="/"
            onClick={(e) => {
              window.location.href = "mailto:no-reply@example.com";
              e.preventDefault();
            }}
          >
            {t("footer.contact")}
          </Anchor>
        </MediaQuery>
      </Flex>
    </Footer>
  );
}
