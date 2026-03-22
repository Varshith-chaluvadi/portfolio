declare module 'ogl' {
  export class Renderer {
    constructor(options?: {
      dpr?: number;
      depth?: boolean;
      alpha?: boolean;
      [key: string]: unknown;
    });
    gl: WebGLRenderingContext & { canvas: HTMLCanvasElement };
    setSize(width: number, height: number): void;
    render(options: { scene: unknown; camera: unknown }): void;
  }

  export class Camera {
    constructor(gl: unknown, options?: { fov?: number; [key: string]: unknown });
    position: { x: number; y: number; z: number; set(x: number, y: number, z: number): void };
    perspective(options: { aspect: number }): void;
  }

  export class Geometry {
    constructor(gl: unknown, attributes: Record<string, { size: number; data: Float32Array }>);
  }

  export class Program {
    constructor(gl: unknown, options: { vertex: string; fragment: string; uniforms?: Record<string, { value: unknown }>; transparent?: boolean; depthTest?: boolean });
    uniforms: Record<string, { value: unknown }>;
  }

  export class Mesh {
    constructor(gl: unknown, options: { mode?: number; geometry: Geometry; program: Program });
    position: { x: number; y: number; z: number; set(x: number, y: number, z: number): void };
    rotation: { x: number; y: number; z: number };
  }
}
