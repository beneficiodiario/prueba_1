import type { CapacitorConfig } from "@capacitor/cli";
const config: CapacitorConfig = {
  appId: "com.beneficiodiario.afin",
  appName: "Afín",
  webDir: "dist",
  backgroundColor: "#fcfdf9",
  android: { allowMixedContent: false, backgroundColor: "#fcfdf9" },
  plugins: {
    SystemBars: { insetsHandling: "css", style: "LIGHT" },
  },
};
export default config;
