import { StatusDto } from "../../dto/StatusDto";
import { UserDto } from "../../dto/UserDto";
import { TweeterRequest } from "./TweeterRequest";

export interface PagedStatusItemRequest extends TweeterRequest {
    readonly token: string, // We're just taking the string out, NOT the timestamp which is found in the Authtoken object
    readonly userAlias: string,
    readonly pageSize: number,
    readonly lastItem: StatusDto | null // These are all the parameters of loadMoreFollowees
}