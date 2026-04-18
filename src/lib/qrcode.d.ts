// Minimal type declarations for the `qrcode` package covering only what
// qr-svg.ts uses. The package ships as plain JS without types, and we only
// need the `create` function + its modules matrix.

declare module 'qrcode' {
  export interface QRCodeModules {
    size: number;
    data: Uint8Array;
    reservedBit: number[];
    get(x: number, y: number): boolean;
  }

  export interface QRCode {
    modules: QRCodeModules;
    version: number;
    errorCorrectionLevel: { level: string };
    maskPattern: number;
    segments: unknown[];
  }

  export interface QRCodeCreateOptions {
    version?: number;
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H' | 'low' | 'medium' | 'quartile' | 'high';
    maskPattern?: number;
    toSJISFunc?: (str: string) => number;
    margin?: number;
  }

  export function create(
    data: string | Array<{ data: string; mode?: string }>,
    options?: QRCodeCreateOptions,
  ): QRCode;

  const _default: {
    create: typeof create;
  };
  export default _default;
}
