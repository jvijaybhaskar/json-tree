import { Button } from '@heroui/button';
import { useDisclosure } from '@heroui/modal';
import { semanticColors } from '@heroui/react';
import { Tooltip } from '@heroui/tooltip';
import { ComponentProps, memo, useMemo } from 'react';
import { useJsonEngineStore } from '../../store/json-engine/json-engine.store';
import { Icon } from '../../ui/icon/Icon';
import { downloadAsFile } from '../../utils/file-download.util';
import { useCustomTheme } from '../../utils/react-hooks/useCustomTheme';
import { ImportJsonModal } from './ImportJsonModal';

type Props = {
  style?: React.CSSProperties;
};

const _JsonEditorConsole = ({ style }: Props) => {
  const [stringifiedJson, isValidJson] = useJsonEngineStore((state) => [state.stringifiedJson, state.isValidJson]);

  const { isOpen: isImportJsonModalOpen, onOpen: openImportJsonModal, onClose: closeImportJsonModal } = useDisclosure();
  const { theme } = useCustomTheme();

  const handleDownloadJsonClick = () => {
    downloadAsFile(`data:text/json;charset=utf8,${encodeURIComponent(stringifiedJson)}`, 'json-sea.json');
  };

  const sharedTooltipProps: ComponentProps<typeof Tooltip> = useMemo(
    () => ({
      className: 'px-2',
      delay: 0,
      closeDelay: 0,
      color: 'primary',
    }),
    [],
  );

  const sharedButtonProps: ComponentProps<typeof Button> = useMemo(
    () => ({
      className: 'w-full',
      isIconOnly: true,
      variant: 'light',
      color: 'primary',
    }),
    [],
  );

  const iconColor = useMemo(() => (semanticColors[theme].primary as any).DEFAULT, [theme]);

  return (
    <>
      <ImportJsonModal isModalOpen={isImportJsonModalOpen} closeModal={closeImportJsonModal} />

      <div
        className="flex items-center justify-between gap-1 border-t-1 border-solid border-t-border bg-cyan-50 px-2 py-1 dark:bg-cyan-900"
        style={style}
      >
        <Tooltip {...sharedTooltipProps} content="Import JSON">
          <Button {...sharedButtonProps} onPress={openImportJsonModal}>
            <Icon icon="file-plus" size={24} color={iconColor} />
          </Button>
        </Tooltip>

        <Tooltip {...sharedTooltipProps} content="Download JSON">
          <Button {...sharedButtonProps} disabled={!isValidJson} onPress={handleDownloadJsonClick}>
            <Icon icon="download" size={24} color={iconColor} />
          </Button>
        </Tooltip>
      </div>
    </>
  );
};

export const JsonEditorConsole = memo(_JsonEditorConsole);
