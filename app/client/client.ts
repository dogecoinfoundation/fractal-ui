import { PrismaClient } from "@/generated/prisma";

export class FractalEngineClient {
  constructor(private readonly url?: string) {
    this.url = url || process.env.FRACTAL_ENGINE_URL!;
  }

  async createMint(mint: any) {
    const response = await fetch(`${this.url}/mints`, {
      method: "POST",
      body: JSON.stringify(mint),
    });


    return response.json();
  }

  async getHealth() {
    const response = await fetch(`${this.url}/health`);
    return response.json();
  }

  async listUnspent(address: string) {
    const response = await fetch(`${this.url}/list-unspent?address=${address}`);
    return response.json();
  }

  async setupDemoBalance() {
    const response = await fetch(`${this.url}/setup-demo-balance`, {
      method: "POST",
    });
    return response.json();
  }
}

