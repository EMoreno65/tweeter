import "./Register.css";
import "bootstrap/dist/css/bootstrap.css";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import { AuthToken, FakeData, User } from "tweeter-shared";
import { Buffer } from "buffer";
import useToastListener from "../../toaster/ToastListenerHook";
import AuthenticationFields from "../authenticationFields/AuthenticationFields";
import useUserInfo from "../../userInfo/UserInfoHook";
import { RegisterPresenter } from "../../../presenters/RegisterPresenter";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [imageBytes, setImageBytes] = useState<Uint8Array>(new Uint8Array());
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageFileExtension, setImageFileExtension] = useState<string>("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { updateUser } = useUserInfo();
  const { displayErrorMessage } = useToastListener();

  const [presenter] = useState(new RegisterPresenter({
    firstName: firstName,
    lastName: lastName,
    userAlias: alias,
    password: password,
    displayErrorMessage: displayErrorMessage,
    updateUser: updateUser,
    navigate: navigate,
    setLoading: setIsLoading,
    setImageUrl: setImageUrl,
    setImageFileExtension: setImageFileExtension,
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => {
      presenter.handleFileChange(event);
    },
    setImageBytes: setImageBytes,
}));

// Change to a state variable


  // const checkSubmitButtonStatus = (): boolean => {
  //   return (
  //     !firstName ||
  //     !lastName ||
  //     !alias ||
  //     !password ||
  //     !imageUrl ||
  //     !imageFileExtension
  //   );
  // };

  // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   handleImageFile(file);
  // };

  // const handleImageFile = (file: File | undefined) => {
  //   if (file) {
  //     setImageUrl(URL.createObjectURL(file));

  //     const reader = new FileReader();
  //     reader.onload = (event: ProgressEvent<FileReader>) => {
  //       const imageStringBase64 = event.target?.result as string;

  //       const imageStringBase64BufferContents =
  //         imageStringBase64.split("base64,")[1];

  //       const bytes: Uint8Array = Buffer.from(
  //         imageStringBase64BufferContents,
  //         "base64"
  //       );

  //       setImageBytes(bytes);
  //     };
  //     reader.readAsDataURL(file);

  //     const fileExtension = file.name.split(".").pop();
  //     if (fileExtension) {
  //       setImageFileExtension(fileExtension);
  //     }
  //   } else {
  //     setImageUrl("");
  //     setImageBytes(new Uint8Array());
  //   }
  // };

  // const getFileExtension = (file: File): string | undefined => {
  //   return file.name.split(".").pop();
  // };

  // const doRegister = async () => {
  //   try {
  //     setIsLoading(true);

  //     const [user, authToken] = await register(
  //       firstName,
  //       lastName,
  //       alias,
  //       password,
  //       imageBytes,
  //       imageFileExtension
  //     );

  //     updateUser(user, user, authToken, rememberMe);
  //     navigate("/");
  //   } catch (error) {
  //     displayErrorMessage(
  //       `Failed to register user because of exception: ${error}`
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const register = async (
  //   firstName: string,
  //   lastName: string,
  //   alias: string,
  //   password: string,
  //   userImageBytes: Uint8Array,
  //   imageFileExtension: string
  // ): Promise<[User, AuthToken]> => {
  //   // Not neded now, but will be needed when you make the request to the server in milestone 3
  //   const imageStringBase64: string =
  //     Buffer.from(userImageBytes).toString("base64");

  //   // TODO: Replace with the result of calling the server
  //   const user = FakeData.instance.firstUser;

  //   if (user === null) {
  //     throw new Error("Invalid registration");
  //   }

  //   return [user, FakeData.instance.authToken];
  // };

  const checkSubmitButtonStatus = () => {
    console.log("Checking Button Status ...")
    console.log("Alias is " + alias + "Password is " + password, "First name is " + firstName, "Last name is " + lastName, "Image Url is " + imageUrl, "Image file extension is " + imageFileExtension)

    return alias!.trim().length > 0 && password.trim().length > 0 && firstName.trim().length > 0 && lastName.trim().length > 0 && imageUrl.trim().length > 0 && imageFileExtension.trim().length > 0;

  }

  // This is UI

  const inputFieldGenerator = () => {
    const fields = [
      {
        id: "firstNameInput",
        type: "text",
        placeholder: "First Name",
        onChange: (event: ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value),
        ariaLabel: "FirstName"
      },
      {
        id: "lastNameInput",
        type: "text",
        placeholder: "Last Name",
        onChange: (event: ChangeEvent<HTMLInputElement>) => setLastName(event.target.value),
        ariaLabel: "LastName"
      },
      {
        id: "aliasInput",
        type: "text",
        placeholder: "Alias",
        onChange: (event: ChangeEvent<HTMLInputElement>) => setAlias(event.target.value),
        ariaLabel: "Username"
      },
      {
        id: "passwordInput",
        type: "password",
        placeholder: "Password",
        onChange: (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value),
        ariaLabel: "Password"
      },
      {
        id: "imageFileInput",
        type: "file",
        placeholder: "User Image",
        onChange: presenter.handleFileChange, // No need for an event parameter here
        ariaLabel: "ImageFileInput"
      },
    ];
  
    return (
      <>
        {fields.map((field) => (
          <AuthenticationFields
            key={field.id}
            type={field.type}
            id={field.id}
            className="form-control"
            placeholder={field.placeholder}
            onChange={field.onChange}
            submitFunction={() => presenter.doRegister(imageBytes, imageFileExtension)}
            ariaLabel={field.ariaLabel}
          />
        ))}
      </>
    );
  };

  const switchAuthenticationMethodGenerator = () => {
    return (
      <div className="mb-3">
        Algready registered? <Link to="/login">Sign in</Link>
      </div>
    );
  };

  return (
    <AuthenticationFormLayout
      headingText="Please Register"
      submitButtonLabel="Register"
      oAuthHeading="Register with:"
      inputFieldGenerator={inputFieldGenerator}
      switchAuthenticationMethodGenerator={switchAuthenticationMethodGenerator}
      setRememberMe={setRememberMe}
      submitButtonDisabled={() => !checkSubmitButtonStatus()}
      isLoading={isLoading}
      submit={() => presenter.doRegister(imageBytes, imageFileExtension)}
    />
  );
};

export default Register;
