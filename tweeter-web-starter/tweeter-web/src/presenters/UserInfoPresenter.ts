import { AuthToken, User } from "tweeter-shared";
import { UserInfoAbstractPresenter, UserInfoAbstractView } from "./UserInfoAbstractPresenter";
import { UserService } from "../model/service/UserService";

export class UserInfoPresenter extends UserInfoAbstractPresenter{

    private userInfoService: UserService

    public constructor(view: UserInfoAbstractView){
        super(view);
        this.userInfoService = new UserService 
    }

    public async setIsFollowerStatus (
    ) {
        try {
        if (this.view.currentUser === this.view.displayedUser) {
            this.view.setIsFollower!(false);
        } else {
            this.view.setIsFollower!(
            await this.userInfoService.getIsFollowerStatus(this.view.authToken!, this.view.currentUser!, this.view.displayedUser!)
            );
        }
        } catch (error) {
        this.view.displayErrorMessage!(
            `Failed to determine follower status because of exception: ${error}`
        );
        }
    };

    public async setNumbFollowees (
      ) {
        try {
          this.view.setFolloweeCount!(await this.userInfoService.getFolloweeCount(this.view.authToken!, this.view.displayedUser!));
        } catch (error) {
          this.view.displayErrorMessage!(
            `Failed to get followees count because of exception: ${error}`
          );
        }
      };

      public async setNumbFollowers (
      ) {
        try {
          this.view.setFollowerCount!(await this.userInfoService.getFollowerCount(this.view.authToken!, this.view.displayedUser!));
        } catch (error) {
          this.view.displayErrorMessage!(
            `Failed to get followers count because of exception: ${error}`
          );
        }
      };
    
      public async followDisplayedUser (
        event: React.MouseEvent
      ): Promise<void> {
        event.preventDefault();
    
        try {
          this.view.setIsLoading!(true);
          this.view.displayInfoMessage!(`Following ${this.view.displayedUser!.name}...`, 0);
    
          const [followerCount, followeeCount] = await this.userInfoService.follow(
            this.view.authToken!,
            this.view.displayedUser!
          );
    
          this.view.setIsFollower!(true);
          this.view.setFollowerCount!(followerCount);
          this.view.setFolloweeCount!(followeeCount);
        } catch (error) {
          this.view.displayErrorMessage!(
            `Failed to follow user because of exception: ${error}`
          );
        } finally {
          this.view.clearLastInfoMessage!();
          this.view.setIsLoading!(false);
        }
      };

      public async unfollowDisplayedUser (
        event: React.MouseEvent
      ): Promise<void> {
        event.preventDefault();
    
        try {
          this.view.setIsLoading!(true);
          this.view.displayInfoMessage!(
            `Unfollowing ${this.view.displayedUser!.name}...`,
            0
          );
    
          const [followerCount, followeeCount] = await this.userInfoService.unfollow(
            this.view.authToken!,
            this.view.displayedUser!
          );
    
          this.view.setIsFollower!(false);
          this.view.setFollowerCount!(followerCount);
          this.view.setFolloweeCount!(followeeCount);
        } catch (error) {
          this.view.displayErrorMessage!(
            `Failed to unfollow user because of exception: ${error}`
          );
        } finally {
          this.view.clearLastInfoMessage!();
          this.view.setIsLoading!(false);
        }
      };
}