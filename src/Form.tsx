import {
  Button,
  TextInput,
  Heading,
  Checkbox,
  PasswordInput,
  ArrowRightIcon,
  useTheme,
  Text,
  Link
} from "@razorpay/blade/components";
import { useFormValidation } from "./utils";
import {
  FormContainer,
  StyledForm,
  CenteredBox,
  SmallGap
} from "./utilityComponents";

function Form(): JSX.Element {
  const { theme } = useTheme();
  const {
    passwordValidationState,
    checkboxValidationState,
    emailValidationState,
    onPasswordChange,
    onEmailChange,
    onFormSubmit,
    isLoading
  } = useFormValidation();

  return (
    <FormContainer>
      <StyledForm theme={theme} onSubmit={onFormSubmit}>
        <Heading size="large">Welcome to Blade Example</Heading>
        <Heading variant="subheading">
          This is an example form built with blade
        </Heading>
        <SmallGap />
        <TextInput
          isRequired
          label="Email"
          name="email"
          type="email"
          validationState={emailValidationState}
          errorText="Invalid Email"
          onChange={onEmailChange}
        />
        <PasswordInput
          isRequired
          label="Password"
          name="password"
          helpText="should be more than 8 characters"
          errorText="Password is less than 8 characters"
          validationState={passwordValidationState}
          onChange={onPasswordChange}
        />
        <Checkbox
          name="terms"
          errorText="Please accept terms and conditions to continue"
          validationState={checkboxValidationState}
        >
          I accept terms and conditions
        </Checkbox>
        <SmallGap />
        <Button
          isFullWidth
          type="submit"
          icon={ArrowRightIcon}
          iconPosition="right"
          isLoading={isLoading}
        >
          Sign In
        </Button>
        <CenteredBox>
          <Text>
            New to Razorpay? <Link href="#">Sign Up</Link>
          </Text>
        </CenteredBox>
      </StyledForm>
    </FormContainer>
  );
}

export default Form;
