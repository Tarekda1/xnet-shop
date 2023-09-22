// interface Blob {
//   readonly size: number;
//   readonly type: string;
//   slice(start?: number, end?: number, contentType?: string): Blob;
// }

declare var Blob: {
  prototype: Blob;
  new (blobParts?: BlobPart[], options?: BlobPropertyBag): Blob;
};

interface BlobPropertyBag {
  endings?: EndingType;
  type?: string;
}

type EndingType = "transparent" | "native";

type BlobPart = BufferSource | Blob | string;

type BufferSource = ArrayBufferView | ArrayBuffer;
