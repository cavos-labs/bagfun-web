import pinataSDK from "@pinata/sdk";
import { Readable } from "stream";

const pinata = new pinataSDK(
  process.env.PINATA_API_KEY as string,
  process.env.PINATA_SECRET_API_KEY as string
);

export interface PinataUploadResult {
  hash: string;
  url: string;
  size: number;
  name: string;
}

export interface PinataMetadata {
  name: string;
  description?: string;
  keyvalues?: Record<string, string>;
}

/**
 * Upload a file buffer to Pinata IPFS
 */
export async function uploadToPinata(
  buffer: Buffer,
  metadata: PinataMetadata
): Promise<PinataUploadResult> {
  try {
    // Create a Node.js readable stream from buffer
    const readableStream = new Readable({
      read() {
        this.push(buffer);
        this.push(null); // End the stream
      }
    });

    const result = await pinata.pinFileToIPFS(readableStream, {
      pinataMetadata: {
        name: metadata.name,
      },
      pinataOptions: {
        cidVersion: 1,
      },
    });

    return {
      hash: result.IpfsHash,
      url: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`,
      size: buffer.length,
      name: metadata.name,
    };
  } catch (error) {
    console.error("Pinata upload error:", error);
    throw new Error(
      `Failed to upload to Pinata: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
