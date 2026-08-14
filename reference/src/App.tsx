import { Route, Routes } from 'react-router-dom';

import { Shell } from './layout/Shell';
import { AppThemeProvider } from './theme-context';
import { Introduction } from './pages/Introduction';
import { Tokens } from './pages/Tokens';
import { Templates } from './pages/Templates';

import { ButtonPage } from './pages/components/ButtonPage';
import { IconButtonPage } from './pages/components/IconButtonPage';
import { ClickablePage } from './pages/components/ClickablePage';
import { SegmentedControlPage } from './pages/components/SegmentedControlPage';

import { TextInputPage } from './pages/components/TextInputPage';
import { TextAreaPage } from './pages/components/TextAreaPage';
import { PasswordInputPage } from './pages/components/PasswordInputPage';
import { SelectPage } from './pages/components/SelectPage';
import { DateInputPage } from './pages/components/DateInputPage';
import { FileInputPage } from './pages/components/FileInputPage';
import { SearchbarPage } from './pages/components/SearchbarPage';
import { LabelPage } from './pages/components/LabelPage';

import { MessageBarPage } from './pages/components/MessageBarPage';
import { ProgressRingPage } from './pages/components/ProgressRingPage';
import { LoadingAnimationPage } from './pages/components/LoadingAnimationPage';
import { LoadingOverlayPage } from './pages/components/LoadingOverlayPage';
import { EmptyStatePage } from './pages/components/EmptyStatePage';
import { TooltipPage } from './pages/components/TooltipPage';

import { ModalPage } from './pages/components/ModalPage';
import { ImageCropModalPage } from './pages/components/ImageCropModalPage';
import { MenuPage } from './pages/components/MenuPage';
import { CommandPalettePage } from './pages/components/CommandPalettePage';

import { AvatarPage } from './pages/components/AvatarPage';
import { CardPage } from './pages/components/CardPage';
import { TextPage } from './pages/components/TextPage';
import { AccordionPage } from './pages/components/AccordionPage';
import { IconPage } from './pages/components/IconPage';

export default function App() {
  return (
    <AppThemeProvider>
      <Shell>
        <Routes>
          <Route path="/" element={<Introduction />} />
          <Route path="/tokens" element={<Tokens />} />
          <Route path="/templates" element={<Templates />} />

          <Route path="/components/button" element={<ButtonPage />} />
          <Route path="/components/icon-button" element={<IconButtonPage />} />
          <Route path="/components/clickable" element={<ClickablePage />} />
          <Route
            path="/components/segmented-control"
            element={<SegmentedControlPage />}
          />

          <Route path="/components/text-input" element={<TextInputPage />} />
          <Route path="/components/text-area" element={<TextAreaPage />} />
          <Route
            path="/components/password-input"
            element={<PasswordInputPage />}
          />
          <Route path="/components/select" element={<SelectPage />} />
          <Route path="/components/date-input" element={<DateInputPage />} />
          <Route path="/components/file-input" element={<FileInputPage />} />
          <Route path="/components/searchbar" element={<SearchbarPage />} />
          <Route path="/components/label" element={<LabelPage />} />

          <Route path="/components/message-bar" element={<MessageBarPage />} />
          <Route
            path="/components/progress-ring"
            element={<ProgressRingPage />}
          />
          <Route
            path="/components/loading-animation"
            element={<LoadingAnimationPage />}
          />
          <Route
            path="/components/loading-overlay"
            element={<LoadingOverlayPage />}
          />
          <Route path="/components/empty-state" element={<EmptyStatePage />} />
          <Route path="/components/tooltip" element={<TooltipPage />} />

          <Route path="/components/modal" element={<ModalPage />} />
          <Route
            path="/components/image-crop-modal"
            element={<ImageCropModalPage />}
          />
          <Route path="/components/menu" element={<MenuPage />} />
          <Route
            path="/components/command-palette"
            element={<CommandPalettePage />}
          />

          <Route path="/components/avatar" element={<AvatarPage />} />
          <Route path="/components/card" element={<CardPage />} />
          <Route path="/components/text" element={<TextPage />} />
          <Route path="/components/accordion" element={<AccordionPage />} />
          <Route path="/components/icon" element={<IconPage />} />
        </Routes>
      </Shell>
    </AppThemeProvider>
  );
}
