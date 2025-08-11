import { DropdownMenu, IconButton, Text, Button, Flex } from "@radix-ui/themes";
import { useContext, type ReactNode, useState, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { BlendingModeIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";
import { Input } from "./ui/input";

interface ColorSwitchProps {
  icon?: ReactNode;
}

const ColorSwitch = ({ 
  icon = (
    <IconButton variant="soft">
      <BlendingModeIcon />
    </IconButton>
  ),
}: ColorSwitchProps = {}) => {
  const { setColor, backgroundImageUrl, setBackgroundImageUrl, backgroundOpacity, setBackgroundOpacity } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [backgroundUrl, setBackgroundUrl] = useState(backgroundImageUrl);
  const [opacityValue, setOpacityValue] = useState(backgroundOpacity.toString());

  // 同步 ThemeContext 中的值变化
  useEffect(() => {
    setBackgroundUrl(backgroundImageUrl);
  }, [backgroundImageUrl]);

  useEffect(() => {
    setOpacityValue(backgroundOpacity.toString());
  }, [backgroundOpacity]);

  const handleBackgroundSubmit = () => {
    if (backgroundUrl.trim()) {
      setBackgroundImageUrl(backgroundUrl.trim());
      setBackgroundUrl("");
    }
  };

  const handleOpacitySubmit = () => {
    const opacity = parseFloat(opacityValue);
    if (!isNaN(opacity) && opacity >= 0 && opacity <= 1) {
      setBackgroundOpacity(opacity);
      setOpacityValue("0.1");
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
          {icon}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onSelect={() => setColor("gray")}><Text color="gray">{t('color.gray')}</Text></DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setColor("gold")}><Text color="gold">{t('color.gold')}</Text></DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setColor("bronze")}><Text color="bronze">{t('color.bronze')}</Text></DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setColor("brown")}><Text color="brown">{t('color.brown')}</Text></DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setColor("yellow")}><Text color="yellow">{t('color.yellow')}</Text></DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setColor("amber")}><Text color="amber">{t('color.amber')}</Text></DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setColor("orange")}><Text color="orange">{t('color.orange')}</Text></DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setColor("tomato")}><Text color="tomato">{t('color.tomato')}</Text></DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setColor("red")}><Text color="red">{t('color.red')}</Text></DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setColor("ruby")}><Text color="ruby">{t('color.ruby')}</Text></DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setColor("crimson")}><Text color="crimson">{t('color.crimson')}</Text></DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setColor("pink")}><Text color="pink">{t('color.pink')}</Text></DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setColor("plum")}><Text color="plum">{t('color.plum')}</Text></DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setColor("purple")}><Text color="purple">{t('color.purple')}</Text></DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setColor("violet")}><Text color="violet">{t('color.violet')}</Text></DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setColor("iris")}><Text color="iris">{t('color.iris')}</Text></DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setColor("indigo")}><Text color="indigo">{t('color.indigo')}</Text></DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setColor("blue")}><Text color="blue">{t('color.blue')}</Text></DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setColor("cyan")}><Text color="cyan">{t('color.cyan')}</Text></DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setColor("teal")}><Text color="teal">{t('color.teal')}</Text></DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setColor("jade")}><Text color="jade">{t('color.jade')}</Text></DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setColor("green")}><Text color="green">{t('color.green')}</Text></DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setColor("grass")}><Text color="grass">{t('color.grass')}</Text></DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setColor("lime")}><Text color="lime">{t('color.lime')}</Text></DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setColor("mint")}><Text color="mint">{t('color.mint')}</Text></DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => setColor("sky")}><Text color="sky">{t('color.sky')}</Text></DropdownMenu.Item>
        
        <DropdownMenu.Separator />
        
        {/* 背景图片输入框 */}
        <div className="p-2">
          <Flex direction="column" gap="2">
            <Text size="2" color="gray">{t('themeSettings.background_image_url')}</Text>
            <Input
              type="url"
              placeholder={t('themeSettings.input_placeholder')}
              value={backgroundUrl}
              onChange={(e) => setBackgroundUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleBackgroundSubmit()}
            />
            <Button size="1" onClick={handleBackgroundSubmit}>
              {t('themeSettings.confirm')}
            </Button>
          </Flex>
        </div>
        
        {/* 透明度输入框 */}
        <div className="p-2">
          <Flex direction="column" gap="2">
            <Text size="2" color="gray">{t('themeSettings.opacity')}</Text>
            <Input
              type="number"
              min="0"
              max="1"
              step="0.1"
              placeholder={t('themeSettings.opacity_placeholder')}
              value={opacityValue}
              onChange={(e) => setOpacityValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleOpacitySubmit()}
            />
            <Button size="1" onClick={handleOpacitySubmit}>
              {t('themeSettings.confirm')}
            </Button>
            </Flex>
          </div>
        
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default ColorSwitch;
