import { BladeProvider } from "@razorpay/blade/components";
import { paymentTheme } from "@razorpay/blade/tokens";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import Form from "./Form";

function App(): JSX.Element {
  return (
    // Change themeTokens to `bankingTheme` and colorScheme to `dark` to see the magic
    <BladeProvider themeTokens={paymentTheme} colorScheme="light">
      <Form />
    </BladeProvider>
  );
}

export default App;
