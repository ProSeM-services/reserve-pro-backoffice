import { BASE_URL } from "@/config/axios.config";
import axios from "axios";

interface IUploadImageAPIResponse {
  $metadata: {
    httpStatusCode: number;
    requestId: string;
    extendedRequestId: string;
    attempts: number;
    totalRetryDelay: number;
  };
  ETag: string;
  ServerSideEncryption: string;
  fileName: string;
}
export class FilesServices {
  static async upload(data: File): Promise<IUploadImageAPIResponse> {
    const formData = new FormData();
    formData.append("file", data); // 'file' es el nombre del campo esperado en el backend
    const response = await axios.post(`${BASE_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }
  static async detele(fileName: string) {
    const response = await axios.post(`${BASE_URL}/upload/delete`, {
      fileName,
    });

    return response.data;
  }
}
