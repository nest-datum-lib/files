export interface FolderCreateDto {
  accessToken: string;
  id: string;
  userId: string;
  systemId: string;
  parentId?: string;
  path?: string;
  name?: string;
  description?: string;
}

export interface FolderUpdateDto {
  accessToken: string;
  id: string;
  userId: string;
  newId: string;
  systemId: string;
  parentId?: string;
  path?: string;
  name?: string;
  description?: string;
  isNotDelete: boolean;
  isDeleted: boolean;
  createdAt: string;
}
