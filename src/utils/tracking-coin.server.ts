import { Prisma } from "@prisma/client";
import { STATUS_COIN } from "./constants";
import { prisma } from "./prisma.server";
import type { TrackingCoinForm } from "./types.server";

export async function addCoin(coinData: TrackingCoinForm) {
  const newCoin = await prisma.trackingCoin.create({
    data: {
      digitalAsset: coinData.digitalAsset,
      detail: coinData.detail,
      price: coinData.price,
      quantity: coinData.quantity,
      img: coinData.img,
      status: STATUS_COIN.created,
    },
  });
  return !!newCoin;
}

export async function getCoins(
  statuses: number[],
  whereFilter?: Prisma.TrackingCoinWhereInput,
) {
  return prisma.trackingCoin.findMany({
    where: {
      status: { in: statuses },
      ...whereFilter,
    },
  });
}

export async function deleteCoin(id: string) {
  const itemDeleted = await prisma.trackingCoin.delete({
    where: {
      id: id,
    },
  });

  return !!itemDeleted;
}

export async function updateCoin(id: string, updateData: TrackingCoinForm) {
  try {
    // Find the coin by id
    const coin = await prisma.trackingCoin.findUnique({ where: { id: id } });

    // If coin not found, return an error
    if (!coin) {
      throw new Error("Tracking coin not found");
    }

    // Update coin data with newData
    const updatedCoin = await prisma.trackingCoin.update({
      where: { id: id },
      data: updateData,
    });

    return updatedCoin;
  } catch (error) {
    // Handle errors
    console.error("Error updating coin:", error);
    throw new Error("Failed to update coin");
  }
}
