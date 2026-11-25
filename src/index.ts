import { ponder } from "ponder:registry";
import { user, transfer } from "ponder:schema";

ponder.on("MockIDRX:Transfer", async ({ event, context }) => {
  await context.db.insert(transfer).values({
    id: event.transaction.hash + "-" + event.log.logIndex,
    hash: event.transaction.hash,
    from: event.args.from,
    to: event.args.to,
    timestamp: event.block.timestamp,
    amount: event.args.value,
  });

  // add user analytics
  await context.db
    .insert(user)
    .values({
      id: event.args.from,
      totalTransferCount: 1n,
      totalTransferAmount: event.args.value,
    })
    .onConflictDoUpdate((row) => ({
      totalTransferCount: (row.totalTransferCount || 0n) + 1n,
      totalTransferAmount: (row.totalTransferAmount || 0n) + event.args.value,
    }));
});