import { useState } from "react";
import { createStyles, Menu, Image, Group, rem, Button } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import pl from "../../assets/polish.png";
import en from "../../assets/english.png";
import i18n from "../../locales/i18n";
import { useTranslation } from "react-i18next";

const data = [
  { image: en, code: "en" },
  { image: pl, code: "pl" },
];

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
  label: {
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
  },

  icon: {
    transition: "transform 150ms ease",
    transform: opened ? "rotate(180deg)" : "rotate(0deg)",
  },
}));

export function LanguagePicker() {
  const { t } = useTranslation();

  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });

  const defualt = data.filter((e) => e.code == i18n.languages[1]);
  const [selected, setSelected] = useState(defualt[0]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const items = data.map((item) => (
    <Menu.Item
      icon={<Image src={item.image} width={18} height={18} />}
      onClick={() => {
        setSelected(item);
        changeLanguage(item.code);
      }}
      key={item.code}
    >
      {t(`lang.${item.code}`)}
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      width="target"
      withinPortal
    >
      <Menu.Target>
        <Button variant="default" h={rem(34)}>
          <Group spacing="xs">
            <Image src={selected.image} width={22} height={22} />
            <span className={classes.label}>{t(`lang.${selected.code}`)}</span>
          </Group>
          <IconChevronDown size="1rem" className={classes.icon} stroke={1.5} />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}
