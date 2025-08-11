import { StrictMode, useMemo } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import {
  ThemeContext,
  THEME_DEFAULTS,
  type Appearance,
  type Colors,
} from "./contexts/ThemeContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useSystemTheme } from "./hooks/useSystemTheme";
import { BrowserRouter } from "react-router-dom";
import "./i18n/config"; // Import i18next config
import ErrorBoundary from "./components/ErrorBoundary";
import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import Loading from "./components/loading";
import { PublicInfoProvider } from "./contexts/PublicInfoContext";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import { PWAUpdatePrompt } from "./components/PWAUpdatePrompt";
import { OfflineIndicator } from "./components/OfflineIndicator";
import { Toaster } from "./components/ui/sonner";
const App = () => {
  const [appearance, setAppearance] = useLocalStorage<Appearance>(
    "appearance",
    THEME_DEFAULTS.appearance
  );
  const [color, setColor] = useLocalStorage<Colors>(
    "color",
    THEME_DEFAULTS.color
  );
  const [backgroundImageUrl, setBackgroundImageUrl] = useLocalStorage<string>(
    "backgroundImageUrl",
    THEME_DEFAULTS.backgroundImageUrl
  );
  const [backgroundOpacity, setBackgroundOpacity] = useLocalStorage<number>(
    "backgroundOpacity",
    THEME_DEFAULTS.backgroundOpacity
  );

  // Use the system theme hook to resolve "system" to actual theme
  const resolvedAppearance = useSystemTheme(appearance);

  const themeContextValue = useMemo(
    () => ({
      appearance,
      setAppearance,
      color,
      setColor,
      backgroundImageUrl,
      setBackgroundImageUrl,
      backgroundOpacity,
      setBackgroundOpacity,
    }),
    [appearance, setAppearance, color, setColor, backgroundImageUrl, setBackgroundImageUrl, backgroundOpacity, setBackgroundOpacity]
  );
  const routing = useRoutes(routes);
  return (
    <Suspense fallback={<Loading />}>
      <ThemeContext.Provider value={themeContextValue}>
        <Theme
          appearance={resolvedAppearance}
          accentColor={color}
          scaling="110%"
          className="theme-root"
          style={{
            backgroundColor: "transparent",
            minHeight: "100vh",
          }}
        >
          <PublicInfoProvider>
            <Toaster />
            <OfflineIndicator />
            {routing}
            <PWAInstallPrompt />
            <PWAUpdatePrompt />
          </PublicInfoProvider>
        </Theme>
      </ThemeContext.Provider>
    </Suspense>
  );
};

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </ErrorBoundary>
);
