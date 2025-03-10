import { semanticColors } from '@heroui/react';
import { useJsonEditorViewStore } from '../../store/json-editor-view/json-editor-view.store';
import { CircleTransparentButton } from '../../ui/components/CircleTransparentButton';
import { Icon } from '../../ui/icon/Icon';
import { useCustomTheme } from '../../utils/react-hooks/useCustomTheme';

const _JsonEditorToggle = () => {
  const [isJsonEditorVisible, toggleJsonEditor] = useJsonEditorViewStore((state) => [
    state.isJsonEditorVisible,
    state.toggleJsonEditor,
  ]);

  const { theme } = useCustomTheme();

  return (
    <CircleTransparentButton onClick={toggleJsonEditor}>
      <Icon
        icon={isJsonEditorVisible ? 'left-arrow-with-bar' : 'right-arrow-with-bar'}
        size={24}
        color={semanticColors[theme].default[500]}
      />
    </CircleTransparentButton>
  );
};

export const JsonEditorToggle = _JsonEditorToggle;
