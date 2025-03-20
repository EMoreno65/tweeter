import { AuthToken, User } from "tweeter-shared";
import { UserItemPresenter, UserItemView } from "./UserItemPresenter";
import { ChangeEvent } from "react";
import { Buffer } from "buffer";
import { UserService } from "../model/service/UserService";

export class RegisterPresenter extends UserItemPresenter{
  protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[User[], boolean]> {
    throw new Error("Method not implemented.");
  }
  protected getItemDescription(): string {
    throw new Error("Method not implemented.");
  }
    
    private registerService: UserService;
    private rememberMe: boolean = false;

    public constructor(view: UserItemView) {
        super(view)
        this.registerService = new UserService
        this.handleFileChange = this.handleFileChange.bind(this);
    }

  //   public handleImageFile(file: File) {
  //     console.log("  It made it to the handling the image function ")
  //     if (file) {
  //         this.view.imageUrl = URL.createObjectURL(file);
  //         console.log("It made it to handling the image") 
  
  //         const reader = new FileReader();
  //         reader.onload = (event: ProgressEvent<FileReader>) => {
  //             const imageStringBase64 = event.target?.result as string;
  //             const imageStringBase64BufferContents = imageStringBase64.split("base64,")[1];
  //             const bytes: Uint8Array = Buffer.from(imageStringBase64BufferContents, "base64");
  //             this.view.imageBytes = bytes; 
  //         };
  //         reader.readAsDataURL(file);
  
  //         const fileExtension = this.getFileExtension(file);
  //         if (fileExtension) {
  //             this.view.imageFileExtension = fileExtension; 
  //         }
  //     } else {
  //         this.view.imageUrl = "";
  //         this.view.imageBytes = new Uint8Array();
  //         this.view.imageFileExtension = "";
  //     }
  // }
  
  public handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (!this.view) {
        console.error("this.view is undefined!");
        return;
    }


    const file = event.target.files?.[0];
    if (file) {
        this.handleImageFile(file);


    } else {
        console.warn("no file selected.");
    }
}

  public getFileExtension (file: File): string | undefined {
    return file.name.split(".").pop();
  };

  public handleImageFile (file: File | null) {
    if (file) {
        const url = URL.createObjectURL(file);
        const fileExtension = file.name.split(".").pop() || "";

        // Set React state
        this.view.setImageUrl!(url);
        this.view.setImageFileExtension!(fileExtension);

        // Force update to presenter.view immediately
        // if (presenter.view) {
        //     presenter.view.imageUrl = url;
        //     presenter.view.imageFileExtension = fileExtension;
        //     console.log("Forced update on presenter.view");
        // }

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const imageStringBase64 = event.target?.result as string;

        const imageStringBase64BufferContents =
          imageStringBase64.split("base64,")[1];

        const bytes: Uint8Array = Buffer.from(
          imageStringBase64BufferContents,
          "base64"
        );

        this.view.setImageBytes!(bytes);
      };
      reader.readAsDataURL(file);

      // const fileExtension = file.name.split(".").pop();
      if (fileExtension) {
        this.view.setImageFileExtension!(fileExtension);
      }
    } else {
      this.view.setImageUrl!("");
      this.view.setImageBytes!(new Uint8Array());
      this.view.setImageFileExtension!("");
    }   
    
  }
  
  // public async doRegister(imageBytes: Uint8Array, imageFileExtension: string) {

  //   if (!imageBytes || imageBytes.length === 0) {
  //     return;
  // }
  //   try {
  //     this.view.setLoading!(true);
      

  //     const [user, authToken] = await this.registerService.register(
  //       this.view.firstName!,
  //       this.view.lastName!,
  //       this.view.userAlias!,
  //       this.view.password!,
  //       imageBytes!,
  //       imageFileExtension!
  //     );

  //     this.view.updateUser!(user, user, authToken, this.rememberMe);
  //     this.view.navigate!("/");
  //   } catch (error) {
  //     this.view.displayErrorMessage!(
  //       `Failed to register user because of exception: ${error}`
  //     );
  //   } finally {
  //     this.view.setLoading!(false);
  //   }
  // };

  public async doRegister(imageBytes: Uint8Array, imageFileExtension: string): Promise<void> {
    if (!imageBytes || imageBytes.length === 0) {
      return;
  }
    await this.doAuthOperation(async () => {
        const [user, authToken] = await this.registerService.register(this._view.firstName!, this._view.lastName!, this.view.alias!, this._view.password!, imageBytes!, imageFileExtension!);
        this.view.updateUser!(user, user, authToken, this.rememberMe);
        this.view.navigate!("/");
    }, "log user in");
}
}