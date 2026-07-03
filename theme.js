(() => {
  const storageKey = "theme";
  const root = document.documentElement;
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const isTheme = (value) => value === "light" || value === "dark";

  const storedTheme = () => {
    try {
      const value = localStorage.getItem(storageKey);
      return isTheme(value) ? value : null;
    } catch {
      return null;
    }
  };

  const storeTheme = (theme) => {
    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // The visual toggle should still work when storage is unavailable.
    }
  };

  const effectiveTheme = () => {
    if (isTheme(root.dataset.theme)) {
      return root.dataset.theme;
    }

    return mediaQuery.matches ? "dark" : "light";
  };

  const updateToggle = (toggle) => {
    const currentTheme = effectiveTheme();
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    const moonIcon = toggle.querySelector('[data-theme-icon="moon"]');
    const sunIcon = toggle.querySelector('[data-theme-icon="sun"]');
    const isDarkTheme = currentTheme === "dark";

    toggle.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
    toggle.setAttribute("aria-checked", String(isDarkTheme));

    if (moonIcon) {
      moonIcon.hidden = !isDarkTheme;
    }

    if (sunIcon) {
      sunIcon.hidden = isDarkTheme;
    }
  };

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    storeTheme(theme);
  };

  const initialTheme = storedTheme();

  if (initialTheme) {
    root.dataset.theme = initialTheme;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector("[data-theme-toggle]");

    if (!toggle) {
      return;
    }

    updateToggle(toggle);

    toggle.addEventListener("click", () => {
      applyTheme(effectiveTheme() === "dark" ? "light" : "dark");
      updateToggle(toggle);
    });

    const updateForSystemTheme = () => {
      if (!root.dataset.theme) {
        updateToggle(toggle);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateForSystemTheme);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(updateForSystemTheme);
    }
  });
})();
