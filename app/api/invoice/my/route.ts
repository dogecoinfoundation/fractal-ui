import { NextResponse } from "next/server";
import type { Invoice } from "@/lib/definitions";

export async function GET() {
  const mockInvoices: Invoice[] = [
    {
      id: "invoice_001_selling",
      invoiceHash:
        "1a2b3c4d5e6f789012345678901234567890abcdef1234567890abcdef123456",
      mintHash:
        "a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
      quantity: 100,
      price: 2500000,
      buyerAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      createdAt: "2025-08-18T14:22:17Z",
      sellerAddress: "DKE8u9uZVv3vbcEUtSBKCp3ykBTkcWH9NW",
      publicKey:
        "02e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    },
    {
      id: "invoice_002",
      invoiceHash:
        "2b3c4d5e6f789012345678901234567890abcdef1234567890abcdef1234567a",
      mintHash:
        "b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567a",
      quantity: 50,
      price: 1000000,
      buyerAddress: "bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4",
      createdAt: "2025-07-23T09:41:33Z",
      sellerAddress: "bc1q8d7w6x5y4z3v2u1t0s9r8q7p6o5n4m3l2k1j0i9",
      publicKey:
        "03f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8",
    },
    {
      id: "invoice_003",
      invoiceHash:
        "3c4d5e6f789012345678901234567890abcdef1234567890abcdef1234567ab2",
      mintHash:
        "c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2",
      quantity: 25,
      price: 500000,
      buyerAddress:
        "bc1qrp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3qccfmv3",
      createdAt: "2025-06-15T16:55:08Z",
      sellerAddress: "bc1q7d6w5x4y3z2v1u0t9s8r7q6p5o4n3m2l1k0j9i8",
      publicKey:
        "02aebf2d10b040eb936a6f02f44ee82f8b34f5c1ccb93b4cc061d1c74501856d8d",
    },
    {
      id: "invoice_004",
      invoiceHash:
        "4d5e6f789012345678901234567890abcdef1234567890abcdef1234567abc3",
      mintHash:
        "d4e5f6789012345678901234567890abcdef1234567890abcdef1234567abc3",
      quantity: 200,
      price: 5000000,
      buyerAddress:
        "bc1q2rp33g0q5c5txsp9arysrx4k6zdkfs4nce4xj0gdcccefvpysxf3q9gha0c",
      createdAt: "2025-05-27T03:18:45Z",
      sellerAddress: "bc1q6d5w4x3y2z1v0u9t8s7r6q5p4o3n2m1l0k9j8i7",
      publicKey:
        "0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
    },
    {
      id: "invoice_005",
      invoiceHash:
        "5e6f789012345678901234567890abcdef1234567890abcdef1234567abcd4",
      mintHash:
        "e5f6789012345678901234567890abcdef1234567890abcdef1234567abcd4",
      quantity: 75,
      price: 1875000,
      buyerAddress: "bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq",
      createdAt: "2025-04-14T20:07:52Z",
      sellerAddress: "bc1q5d4w3x2y1z0v9u8t7s6r5q4p3o2n1m0l9k8j7i6",
      publicKey:
        "02f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9",
    },
    {
      id: "invoice_006",
      invoiceHash:
        "6f789012345678901234567890abcdef1234567890abcdef1234567abcde5",
      mintHash: "f6789012345678901234567890abcdef1234567890abcdef1234567abcde5",
      quantity: 300,
      price: 7500000,
      buyerAddress:
        "bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kw508d6qejxtdg4y5r3zarvary0c5xw7kw5rljs90",
      createdAt: "2025-03-08T11:29:14Z",
      sellerAddress: "bc1q4d3w2x1y0z9v8u7t6s5r4q3p2o1n0m9l8k7j6i5",
      publicKey:
        "03bf0a8b1db2a7b8b8b8d3c4b6f5e6d7e8f9a0b1c2d3e4f5g6h7i8j9k0l1m2n3",
    },
    {
      id: "invoice_007",
      invoiceHash:
        "7f89012345678901234567890abcdef1234567890abcdef1234567abcdef6",
      mintHash: "6789012345678901234567890abcdef1234567890abcdef1234567abcdef6",
      quantity: 150,
      price: 3750000,
      buyerAddress: "bc1qd2r0p7y5s8t6w9x1z4v3c0q8m5n7b1l6j9i2h5g",
      createdAt: "2025-02-19T07:43:26Z",
      sellerAddress: "bc1q3d2w1x0y9z8v7u6t5s4r3q2p1o0n9m8l7k6j5i4",
      publicKey:
        "02c6047f9441ed7d6d3045406e95c07cd85c778e4b8cef3ca7abac09b95c709ee5",
    },
    {
      id: "invoice_008",
      invoiceHash:
        "8f9012345678901234567890abcdef1234567890abcdef1234567abcdef67",
      mintHash: "789012345678901234567890abcdef1234567890abcdef1234567abcdef67",
      quantity: 40,
      price: 1000000,
      buyerAddress: "bc1qt5feghhctn434aet8v7a9vhgf5qz8t9fv8uh9z",
      createdAt: "2025-02-05T18:16:59Z",
      sellerAddress: "bc1q2d1w0x9y8z7v6u5t4s3r2q1p0o9n8m7l6k5j4i3",
      publicKey:
        "03d30199d74fb5a22d47b6e054e2f378cedacffcb89904a61d75d0dbd407143e65",
    },
    {
      id: "invoice_009",
      invoiceHash:
        "9f012345678901234567890abcdef1234567890abcdef1234567abcdef678",
      mintHash: "89012345678901234567890abcdef1234567890abcdef1234567abcdef678",
      quantity: 80,
      price: 2000000,
      buyerAddress: "bc1qsm6gd2x8w9y3z5v7u4t1s0r6q5p8o2n9m4l7k3j",
      createdAt: "2025-01-28T12:34:41Z",
      sellerAddress: "bc1q1d0w9x8y7z6v5u4t3s2r1q0p9o8n7m6l5k4j3i2",
      publicKey:
        "02e493dbf1c10d80f3581e4904930b1404cc6c13900ee0758474fa94abe8c4cd13",
    },
    {
      id: "invoice_010",
      invoiceHash:
        "0f12345678901234567890abcdef1234567890abcdef1234567abcdef6789",
      mintHash: "9012345678901234567890abcdef1234567890abcdef1234567abcdef6789",
      quantity: 500,
      price: 12500000,
      buyerAddress: "bc1qd8t3w2x1y0z9v8u7t6s5r4q3p2o1n0m9l8k7j6i5h",
      createdAt: "2025-01-01T05:52:03Z",
      sellerAddress: "bc1q0d9w8x7y6z5v4u3t2s1r0q9p8o7n6m5l4k3j2i1",
      publicKey:
        "02f2f6e1e50cb6a953935c3601284925decd3fd21bc2b51a2b7b2d30b9c4d30abb",
    },
  ];

  return NextResponse.json<Invoice[]>(mockInvoices);
}
