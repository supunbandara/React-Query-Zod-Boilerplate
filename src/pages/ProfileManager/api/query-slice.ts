import { z } from "zod";
import { API_ENDPOINT } from "../../../lib/utils/endpoints-constant";
import { api } from "../../../lib/utils/api";
import { DeleteProfileResponseSchema, ProfilesSchemaAll, UserProfileAddRequestSchema, UserProfileAddResponseSchema, UserProfilesSchema } from "../components/schema";


const GetAllProfilesRequest = z.void();

const GetAllUserProfilesRequestAll = ProfilesSchemaAll;

const GetAllUserProfilesRequest = z.object({
  userId: z.string(),
});

const GetAllUserProfilesResponse = UserProfilesSchema;

const UserProfileAddRequest = UserProfileAddRequestSchema;
const UserProfileAddResponse = UserProfileAddResponseSchema;

const DeleteUserProfileRequest = z.object({
  userProfileId: z.string(),
});

const DeleteUserProfileResponse = DeleteProfileResponseSchema;


const getUserProfile = api<
  z.infer<typeof GetAllUserProfilesRequest>,
  z.infer<typeof GetAllUserProfilesResponse>
>({
  path: (params) => `${API_ENDPOINT.USER_PROFILE}/${params.userId}`,
  method: "GET",
  requestSchema: GetAllUserProfilesRequest,
  responseSchema: GetAllUserProfilesResponse,
  type: "private"
});


const getAllUsersProfiles = api<
  z.infer<typeof GetAllProfilesRequest>,
  z.infer<typeof GetAllUserProfilesRequestAll>
>({
  path: API_ENDPOINT.USER_PROFILE,
  method: "GET",
  requestSchema: GetAllProfilesRequest,
  responseSchema: GetAllUserProfilesRequestAll,
  type: "private"
});


const addUserProfile = api<
  z.infer<typeof UserProfileAddRequest>,
  z.infer<typeof UserProfileAddResponse>
>({
  method: "POST",
  path: API_ENDPOINT.USER_PROFILE,
  requestSchema: UserProfileAddRequest,
  responseSchema: UserProfileAddResponse,
  type: "private"
});


const deleteUserProfile = api<
  z.infer<typeof DeleteUserProfileRequest>,
  z.infer<typeof DeleteUserProfileResponse>
>({
  method: "DELETE",
  path: (params) => `${API_ENDPOINT.USER_PROFILE}/${params.userProfileId}`,
  requestSchema: DeleteUserProfileRequest,
  responseSchema: DeleteUserProfileResponse,
  type: "private"
});


export const ProfileAPI = {
  getUserProfile,
  getAllUsersProfiles,
  addUserProfile,
  deleteUserProfile
};