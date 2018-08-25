/* tslint:disable */
export interface CodeUpload {
  code: string;
  languageId: number;
  message?: string;
  taskId: number;
  testingFinished?: boolean;
  uploadId?: number;
  userId?: string;
}
